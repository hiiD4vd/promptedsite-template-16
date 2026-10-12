import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

interface MarkerPoint {
  id: string;
  title: string;
  description: string;
  risk: 'low' | 'moderate' | 'high';
  confidence: number;
  area: number;
  note: string;
  x: number; // percentage in container
  y: number;
}

export const SoftwareSection: React.FC = () => {
  const points: MarkerPoint[] = [
    {
      id: '01',
      title: 'Structural Fault Zone',
      description: 'Surface deformation detected across a 42 m² sector. Confidence threshold exceeded at 87%.',
      risk: 'moderate',
      confidence: 87,
      area: 42,
      note: 'Caution advised',
      x: 28,
      y: 35,
    },
    {
      id: '02',
      title: 'Sediment Drift',
      description: 'Gradual displacement of loose material along drainage channel. Within expected seasonal range.',
      risk: 'low',
      confidence: 64,
      area: 126,
      note: 'Monitoring only',
      x: 68,
      y: 55,
    },
    {
      id: '03',
      title: 'Erosion Scarp',
      description: 'Exposed cut face retreating along the upper ridge. Material loss tracked at 3 cm per week.',
      risk: 'moderate',
      confidence: 71,
      area: 64,
      note: 'Re-survey in 14 days',
      x: 48,
      y: 72,
    },
  ];

  const [activePoint, setActivePoint] = useState<MarkerPoint | null>(points[0]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#D8E0E3');

    const camera = new THREE.PerspectiveCamera(29.5, width / height, 0.1, 100);
    camera.position.set(3.96, 2.85, -1.8);
    camera.lookAt(-0.1, 1.2, -1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Texture matcap
    const textureLoader = new THREE.TextureLoader();
    const matcap = textureLoader.load('/software/PXGwhite.jpg');

    // Loaders with Draco and Meshopt
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    let terrainMesh: THREE.Object3D | null = null;
    gltfLoader.load(
      '/software/NewTerreain_006.glb',
      (gltf) => {
        terrainMesh = gltf.scene;
        terrainMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshMatcapMaterial({
              matcap: matcap,
              color: new THREE.Color('#f8f8f8'),
            });
          }
        });
        scene.add(terrainMesh);
      },
      undefined,
      (err) => {
        console.warn('Failed to load terrain glb, fallback procedural terrain', err);
      }
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (terrainMesh) {
        terrainMesh.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="software" className="relative min-h-screen bg-white px-4 md:px-6 dsk:px-8 py-24 md:py-36 border-t border-ink/15">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between pb-12 border-b border-ink/15 gap-6">
        <div className="flex items-center gap-4">
          <h2 id="software-title" className="font-sans text-5xl md:text-7xl font-light text-ink tracking-tight">
            Software
          </h2>
          <span className="flex size-7 items-center justify-center rounded-full border border-ink/20 font-mono text-xs text-ink/70">
            6
          </span>
        </div>

        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ink/60 uppercase tracking-widest">
            <span className="size-1.5 bg-ink" />
            <span>PLATFORM INTEGRATION</span>
          </div>
          <p className="font-sans text-lg md:text-xl font-light text-ink leading-relaxed">
            Our processing pipeline integrates directly with cloud telemetry for automated point cloud generation, quality reporting, and georeferenced output — from raw flight data to deliverable in under 20 minutes.
          </p>
        </div>
      </div>

      {/* 3D Topography Canvas & Pin Inspection Container */}
      <div className="relative mt-12 w-full h-[520px] md:h-[640px] rounded-2xl overflow-hidden border border-ink/15 shadow-inner bg-[#D8E0E3]">
        {/* Three.js Topography Canvas Container */}
        <div ref={canvasContainerRef} className="absolute inset-0 size-full" />

        {/* Overlay Point Cloud Pins */}
        {points.map((pt) => {
          const isSelected = activePoint?.id === pt.id;
          return (
            <div
              key={pt.id}
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              onClick={() => setActivePoint(pt)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              <div
                className={`flex size-8 items-center justify-center rounded-full font-mono text-xs transition-all duration-300 ${
                  isSelected
                    ? 'bg-ink text-white ring-4 ring-ink/20 scale-125 shadow-lg'
                    : 'bg-white/90 text-ink border border-ink/30 hover:scale-110 shadow-md'
                }`}
              >
                {pt.id}
              </div>
            </div>
          );
        })}

        {/* Selected Defect Detail Card */}
        {activePoint && (
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-white/90 backdrop-blur-md p-6 rounded-xl border border-ink/20 shadow-xl z-30 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">
                [ DEFECT ID: {activePoint.id} ]
              </span>
              <span
                className={`font-mono text-[11px] uppercase px-2 py-0.5 rounded font-medium ${
                  activePoint.risk === 'low'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {activePoint.risk} risk
              </span>
            </div>

            <h4 className="font-sans text-xl font-medium text-ink mb-2">
              {activePoint.title}
            </h4>

            <p className="font-sans text-sm text-ink/70 font-light mb-4 leading-relaxed">
              {activePoint.description}
            </p>

            <div className="grid grid-cols-3 gap-2 border-t border-ink/10 pt-3">
              <div>
                <div className="font-mono text-[10px] text-ink/50 uppercase">Confidence</div>
                <div className="font-sans text-sm font-semibold text-ink">{activePoint.confidence}%</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-ink/50 uppercase">Area</div>
                <div className="font-sans text-sm font-semibold text-ink">{activePoint.area} m²</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-ink/50 uppercase">Action</div>
                <div className="font-sans text-sm font-semibold text-ink">{activePoint.note}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
