import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import {
  DRONE_MODEL_URL,
  DRONE_ENV_URL,
  PROPELLER_SPEED,
  REVEAL_START_FRAME,
  ANIMATION_END_FRAME,
  FPS,
} from '../engine/constants';

export const DroneOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.8);
    camera.lookAt(0, 0, 0);

    // Environment Lighting
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(DRONE_ENV_URL, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Model and Animation state
    let droneScene: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let action: THREE.AnimationAction | null = null;
    let gltfCamera: THREE.Camera | null = null;

    // Propeller nodes for dynamic blur rotation
    const propellerNodes: THREE.Object3D[] = [];
    const gimbalNodes: { lr?: THREE.Object3D; ud?: THREE.Object3D } = {};

    // Setup Loaders with Draco and Meshopt
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    gltfLoader.load(
      DRONE_MODEL_URL,
      (gltf) => {
        droneScene = gltf.scene;
        scene.add(droneScene);

        // Apply clean rebranded textures to remove baked original logo on fuselage
        const bodyTextureLoader = new THREE.TextureLoader();
        bodyTextureLoader.load('/drone/body_baseColor.webp?v=2', (tex) => {
          tex.flipY = false;
          tex.colorSpace = THREE.SRGBColorSpace;
          droneScene?.traverse((node) => {
            if (node instanceof THREE.Mesh && node.material) {
              const mats = Array.isArray(node.material) ? node.material : [node.material];
              mats.forEach((m) => {
                if (m.name === 'BODY') {
                  m.map = tex;
                  m.needsUpdate = true;
                }
              });
            }
          });
        });

        bodyTextureLoader.load('/drone/body_normal.webp?v=2', (normTex) => {
          normTex.flipY = false;
          droneScene?.traverse((node) => {
            if (node instanceof THREE.Mesh && node.material) {
              const mats = Array.isArray(node.material) ? node.material : [node.material];
              mats.forEach((m) => {
                if (m.name === 'BODY') {
                  m.normalMap = normTex;
                  m.needsUpdate = true;
                }
              });
            }
          });
        });

        // Find camera in GLTF if available
        if (gltf.cameras && gltf.cameras.length > 0) {
          gltfCamera = gltf.cameras[0];
        }

        // Cache propeller motors and gimbal
        droneScene.traverse((node) => {
          const name = node.name;
          if (
            name.includes('Motor') ||
            name.includes('Propeller')
          ) {
            propellerNodes.push(node);
          }
          if (name === 'Camera_leftRight') gimbalNodes.lr = node;
          if (name === 'Camera__UPDOWN') gimbalNodes.ud = node;
        });

        // Setup Animation clip
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(droneScene);
          action = mixer.clipAction(gltf.animations[0]);
          action.play();
          action.paused = true; // manual scrub via scroll
          action.time = REVEAL_START_FRAME / FPS;
          mixer.update(0);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading drone model:', error);
      }
    );

    // Mouse tracking for gimbal look
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial frame state: starts at REVEAL_START_FRAME (184, unfolded hero hover)
    let currentFrame = REVEAL_START_FRAME;
    let targetFrame = REVEAL_START_FRAME;
    let isHidden = false;

    let targetPos = { x: 0, y: 0.12, z: 0 };
    let currentPos = { x: 0, y: 0.12, z: 0 };
    let targetRot = { x: 0, y: 0, z: 0 };
    let currentRot = { x: 0, y: 0, z: 0 };

    const handleScroll = () => {
      const introSec = document.getElementById('intro-section');
      const gearSec = document.getElementById('gear');
      const solutionsSec = document.getElementById('solutions');
      const capSec = document.getElementById('capabilities-section');
      const softwareSec = document.getElementById('software');
      const landingSec = document.getElementById('landing-section');

      const vh = window.innerHeight;

      if (softwareSec && softwareSec.getBoundingClientRect().top < vh * 0.75 && softwareSec.getBoundingClientRect().bottom > vh * 0.25) {
        // In Software section: hide drone overlay to show 3D topography
        isHidden = true;
      } else {
        isHidden = false;
      }

      if (landingSec && landingSec.getBoundingClientRect().top < vh * 0.7) {
        // Landing pad touchdown
        targetPos = { x: 0, y: -0.65, z: 0.2 };
        targetRot = { x: 0.1, y: 0, z: 0 };
        targetFrame = 950;
      } else if (capSec && capSec.getBoundingClientRect().top < vh * 0.6) {
        // Capabilities: folding sequence
        targetPos = { x: 0, y: 0, z: 0.1 };
        targetRot = { x: 0.05, y: 0.2, z: 0 };
        targetFrame = 765;
      } else if (solutionsSec && solutionsSec.getBoundingClientRect().top < vh * 0.5) {
        // Solutions section: fly upward/right to clear the video player
        targetPos = { x: 1.1, y: 0.3, z: -0.5 };
        targetRot = { x: -0.1, y: -0.3, z: 0.08 };
        targetFrame = 350;
      } else if (gearSec && gearSec.getBoundingClientRect().top < vh * 0.6) {
        // Gear section: centered in radar dome
        targetPos = { x: 0, y: -0.05, z: 0.15 };
        targetRot = { x: 0.05, y: 0, z: 0 };
        targetFrame = 350;
      } else if (introSec && introSec.getBoundingClientRect().top < vh * 0.7) {
        // Intro kinetic text: shift drone to right side
        targetPos = { x: 0.95, y: 0.05, z: -0.1 };
        targetRot = { x: 0.05, y: -0.35, z: 0.05 };
        targetFrame = 260;
      } else {
        // Hero section: centered hover
        targetPos = { x: 0, y: 0.12, z: 0 };
        targetRot = { x: 0, y: 0, z: 0 };
        targetFrame = 184;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Render loop
    let clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Frame lerp for buttery smooth camera movements
      currentFrame += (targetFrame - currentFrame) * 0.08;

      // Position and Rotation lerps for flight dynamics
      currentPos.x += (targetPos.x - currentPos.x) * 0.05;
      currentPos.y += (targetPos.y - currentPos.y) * 0.05;
      currentPos.z += (targetPos.z - currentPos.z) * 0.05;

      currentRot.x += (targetRot.x - currentRot.x) * 0.05;
      currentRot.y += (targetRot.y - currentRot.y) * 0.05;
      currentRot.z += (targetRot.z - currentRot.z) * 0.05;

      if (droneScene) {
        // Propeller rotation
        const isLanding = currentFrame > 940;
        if (!isLanding) {
          propellerNodes.forEach((node) => {
            node.rotation.z += PROPELLER_SPEED * delta;
          });
        }

        // Flight coordinates + floating hover physics
        droneScene.position.x = currentPos.x;
        droneScene.position.y = currentPos.y + Math.sin(time * 1.8) * 0.03;
        droneScene.position.z = currentPos.z;

        droneScene.rotation.x = currentRot.x;
        droneScene.rotation.y = currentRot.y;
        droneScene.rotation.z = currentRot.z + Math.cos(time * 1.5) * 0.015;

        // Gimbal subtle response
        if (gimbalNodes.lr) gimbalNodes.lr.rotation.y = mouse.x * 0.25;
        if (gimbalNodes.ud) gimbalNodes.ud.rotation.x = -mouse.y * 0.25;

        // Scrubber
        if (mixer && action) {
          action.time = Math.min(Math.max(currentFrame / FPS, 0), action.getClip().duration);
          mixer.update(0);
        }

        // Visibility toggle
        droneScene.visible = !isHidden;
      }

      // Sync camera if GLTF camera has matrix
      if (gltfCamera && droneScene) {
        camera.position.copy(gltfCamera.position);
        camera.quaternion.copy(gltfCamera.quaternion);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="drone-overlay-clip fixed inset-0 pointer-events-none z-10 overflow-hidden"
    >
      <div className="drone-overlay-shift size-full">
        <canvas ref={canvasRef} className="drone-overlay-canvas size-full block" />
      </div>
    </div>
  );
};
