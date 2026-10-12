export const DRONE_MODEL_URL = '/drone/drone.glb';
export const DRONE_ENV_URL = '/drone/drone-env.jpg';
export const CAP_PARTICLE_TERRAIN_URL = '/capabilities/terrain-morph.glb';
export const SOFTWARE_TERRAIN_URL = '/software/NewTerreain_006.glb';

export const TOTAL_FRAMES = 1038;
export const ANIMATION_END_FRAME = 350;
export const ANIM_SCROLL_SPEED = 0.8;
export const FPS = 30;

export const REVEAL_START_FRAME = 184;
export const REVEAL_FRAMES = 196;
export const REVEAL_DURATION_MS = 1100;

export const CAP_SCAN_START_FRAME = 424;
export const CAP_SCAN_END_FRAME = 564;
export const CAP_SCAN_DURATION_S = 4.7;
export const CAP_SCAN_BLEND_S = 0.45;

export const CAP_INTERP_FRAME = 612;

export const CAP_COMPACTNESS_BACK_FRAME = 730;
export const CAP_COMPACTNESS_END_FRAME = 739;
export const CAP_COMPACTNESS_DURATION_S = 2;
export const CAP_COMPACTNESS_BLEND_S = 0.2;
export const CAP_COMPACTNESS_BACK_BLEND_S = 0.35;

export const CAP_CONNECTION_START_FRAME = 740;
export const CAP_CONNECTION_END_FRAME = 794;
export const CAP_CONNECTION_DURATION_S = 1.5;
export const CAP_CONNECTION_BLEND_S = 0.35;
export const CAP_CONNECTION_LOWER_FRACTION = 0.22;

export const CAP_FOLD_START_FRAME = 760;
export const CAP_FOLD_END_FRAME = 769;

export const CAPABILITIES_END_FRAME = 795;
export const CAPABILITIES_CAMERA = 'capabilit';

export const LANDING_START_FRAME = 855;
export const LANDING_END_FRAME = 995;
export const LANDING_DURATION_S = 4;
export const LANDING_DRONE_RAISE_FRACTION = 0.02;
export const LANDING_DRONE_SECTION_FRACTION = 0.82;
export const LANDING_PLAY_VISIBLE_FRACTION = 0.3;

export const DRONE_ROOT_NODE = 'Master_PSR';
export const DRONE_BODY_NODE = 'Body';
export const DRONE_BODY_MATERIAL = 'BODY';
export const LENS_MATERIAL_NAMES = ['DarkGlass', 'Glass Matte'];
export const GIMBAL_NODES = ['Camera_leftRight', 'Camera__UPDOWN'];

export const MOTOR_CORNERS = {
  FL: ['FL_Motor_1', 'FL_Motor'],
  FR: ['FR_Motor_1', 'FR_Motor'],
  RL: ['RL_Motor_1', 'RL_Motor'],
  RR: ['RR_Motor_1', 'RR_Motor'],
};

export const MOTOR_FLIP_DEG = { FL: 180, FR: 180, RL: 180, RR: 0 };
export const SPINNING_CW = ['FR_Motor_1', 'FR_Motor', 'RL_Motor'];
export const SPINNING_CCW = ['FL_Motor_1', 'RR_Motor_1'];

export const PROPELLER_SPEED = 75.4;
export const BLADE_GHOST_COUNT = 15;
export const BLADE_GHOST_HUB_COUNT = 5;
export const BLADE_GHOST_SHUTTER_S = 1 / 24;
export const BLADE_GHOST_HUB_ALPHA = 0.2833333333333333;
export const BLADE_GHOST_INK = 0.5;
export const BLADE_GHOST_FADE_SPEED = 4;
export const BLADE_GHOST_EPSILON = 0.004;

export const FLOAT_AMPLITUDE = 1;
export const FLOAT_FREQUENCY = 0.3;
export const FLOAT_DELAY = 0;
export const FLOAT_BLEND_SPEED = 2;

export const FLIGHT_FOLLOW_LERP = 0.03;
export const FLIGHT_FOLLOW_PITCH_DEG = 4;
export const FLIGHT_FOLLOW_ROLL_DEG = 3.5;
export const FLIGHT_FOLLOW_YAW_DEG = 2.5;
export const FLIGHT_FOLLOW_YIELD_DEG = 8;
export const FLIGHT_FOLLOW_SHIFT_X_FRACTION = 0.06;
export const FLIGHT_FOLLOW_SHIFT_Y_FRACTION = 0.04;

export const LANDED_TILT_LERP = 0.04;
export const LANDED_TILT_PITCH_DEG = 8;
export const LANDED_TILT_PITCH_BIAS_DEG = 5;
export const LANDED_TILT_ROLL_DEG = 7;
export const LANDED_TILT_YAW_DEG = 5;
export const LANDED_TILT_DRIFT_TAU_S = 0.4;
export const LANDED_TILT_DRIFT_TAU_BLEND_S = 0.15;
export const LANDED_TILT_DRIFT_EDGE_START = 0.75;
export const LANDED_TILT_DRIFT_EDGE_TAU_S = 5;
export const LANDED_TILT_SHIFT_X_FRACTION = 0.15;
export const LANDED_TILT_SHIFT_Y_FRACTION = 0.1;
export const LANDED_TILT_SHIFT_MOBILE_SCALE = 0.5;

export const CAP_CAMERA_FOV_SCALE = 0.65;
export const CAP_DRONE_SHIFT_FRACTION = 0;
export const CAP_DRONE_LOWER_FRACTION = 0.34;
export const CAP_FLOAT_FRACTION = 0.018;
export const CAP_FLOAT_FREQUENCY = 0.28;
export const CAP_FLOAT_BLEND_SPEED = 1.6;
export const CAP_TRANSITION_S = 0.45;
export const CAP_LERP_FACTOR = 0.6;
export const CAP_LOWER_SHIFT_TAU_S = 0.4;
export const CAP_MIN_PHASE_S = [0, 1, 0];
export const CAP_SEGMENT_HYSTERESIS = 0.005;

export const CAP_PARTICLE_TEX_SIZE = 320;
export const CAP_PARTICLE_OPACITY = 0.54;
export const CAP_PARTICLE_SIZE_FRACTION = 0.0024;
export const CAP_PARTICLE_MAX_SIZE_PX = 14;
export const CAP_PARTICLE_SPEED = 0.12;
export const CAP_PARTICLE_FADE_IN_S = 1.05;
export const CAP_PARTICLE_FADE_OUT_S = 0.45;
export const CAP_PARTICLE_MORPH_S = 1.6;
export const CAP_PARTICLE_MORPH_PULSE = 1.2;
export const CAP_PARTICLE_GLOW = 0;
export const CAP_PARTICLE_GLOW_FALLOFF = 3.4;
export const CAP_PARTICLE_EDGE_SOFTNESS = 0.35;
export const CAP_PARTICLE_COLOR_CORE = '#8F979B';
export const CAP_PARTICLE_COLOR_DEEP = '#8F979B';
export const CAP_PARTICLE_STAGGER = 0.35;
export const CAP_PARTICLE_COLLAPSE_S = 0.85;
export const CAP_PARTICLE_COLLAPSE_SCALE = 0.02;
export const CAP_PARTICLE_REVEAL_DELAY_S = 0;
export const CAP_PARTICLE_SECTION_CUT = true;

export const CAP_PARTICLE_SHAPE_TERRAIN = {
  scale: 2.15,
  swirl: 0.01,
  noiseScale: 0.9,
  depth: 1.55,
  lift: -0.1,
  anchorTau: Infinity,
};

export const CAP_PARTICLE_SHAPE_SPHERE = {
  scale: 0.5,
  swirl: 0.44,
  noiseScale: 0.4,
  depth: 1.45,
  lift: 0.03,
  anchorTau: 1.5,
};

export const CAP_LASER_PITCH_DEG = 30;
export const CAP_LASER_YAW_DEG = 0;
export const CAP_LASER_IDLE_LEAD_S = 1.8;

export const GEAR_LOCK_LIFT_VH = -0.03;
export const GEAR_PARK_CLEAR_VH = 0.25;
export const GEAR_REVEAL_ENTER_D = 1.23;
export const GEAR_REVEAL_DEADLINE_D = 0.72;
export const GEAR_REVEAL_DURATION_S = 0.32;
export const GEAR_REVEAL_EASE = [0.33, 1, 0.68, 1];
export const GEAR_REVEAL_RAISE_VH = 0.1;
export const GEAR_REVEAL_SHIFT_VW = 118;

export const LOCK_OFFSET_VH = 0.8;
export const LOCK_RISE_VH = 0.1;
export const LOCK_YAW_EASE = [0.85, 0, 0.15, 1];
export const LOCK_YAW_LERP = 0.12;
export const LOCK_YAW_EPSILON_DEG = 0.01;
export const LOCK_YAW_STAT_DEG = [-10, 26, 48];

export const MOBILE_BREAKPOINT = 1024;
export const CAP_DESKTOP_BREAKPOINT = 1200;
export const DRONE_SCALE_MOBILE = 1.15;
export const LERP_FACTOR = 0.03;
export const MOBILE_LERP_FACTOR = 0.2;
export const RAW_SCROLL_LERP_FACTOR = 0.15;
export const RAW_SCROLL_STEP_PX = 140;
export const SCROLL_RANGE_VH = 3.5;
export const CANVAS_MOBILE_WIDTH_VW = 140;
export const CANVAS_MSAA_MOBILE = true;
export const CANVAS_RELOAD_DEBOUNCE_MS = 300;

export const ENV_ROTATION_RANGE = 0.15 * Math.PI;

export const capBlendEase = (e: number) => e * e * (3 - 2 * e);
export const capPlayEase = (e: number) => e + (capBlendEase(e) - e) * 0.5;
export const particleFadeEase = (e: number) => (e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2);
export const particleMorphEase = (e: number) => {
  const t = Math.min(Math.max(e, 0), 1);
  return t * t * t * (t * (6 * t - 15) + 10);
};
export const revealEase = (e: number) => 1 - Math.pow(1 - e, 3);
