'use client';

import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sub-component: Realistic 3D Laptop with Dynamic Code Screen
function LaptopObject() {
  const laptopGroupRef = useRef<THREE.Group>(null!);
  const screenTextureRef = useRef<THREE.CanvasTexture>(null!);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const scanlineRef = useRef<THREE.Mesh>(null!);

  // Keycap Refs for subtle typing activity
  const keyMat1 = useRef<THREE.MeshStandardMaterial>(null!);
  const keyMat2 = useRef<THREE.MeshStandardMaterial>(null!);

  const codeLines = useMemo(
    () => [
      '#include <iostream>',
      '#include <three/webgl.hpp>',
      '#include <three/camera.hpp>',
      '',
      'class PortfolioApp {',
      'public:',
      '  void renderFrame() {',
      '    Shader::bind("cyber.glsl");',
      '    Camera::updateParallax();',
      '    GPU::renderBuffer();',
      '  }',
      '};',
      '',
      'int main() {',
      '  PortfolioApp app;',
      '  while (app.active()) {',
      '    app.renderFrame();',
      '  }',
      '  return 0;',
      '}',
    ],
    []
  );

  const terminalLogs = useMemo(
    () => [
      '> initializing WebGL 2.0 context...',
      '> compiling vertex_shader.glsl ... OK',
      '> compiling fragment_shader.glsl ... OK',
      '> loading 3D camera rig & parallax...',
      '> system online — ready.',
    ],
    []
  );

  // Generate 2D Canvas for dynamic high-res Code Editor & Terminal
  const { screenCanvas, screenCtx } = useMemo(() => {
    if (typeof window === 'undefined') return { screenCanvas: null, screenCtx: null };
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    return { screenCanvas: canvas, screenCtx: ctx };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const { pointer } = state;

    // 1. Subtle Floating & Breathing Sway Motion
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.y = -0.3 + Math.sin(time * 1.5) * 0.08;
      // Mouse Parallax (Tilts slightly toward mouse without spinning)
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        laptopGroupRef.current.rotation.y,
        -0.38 + pointer.x * 0.25,
        delta * 3.0
      );
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        laptopGroupRef.current.rotation.x,
        0.14 - pointer.y * 0.18,
        delta * 3.0
      );
    }

    // 2. Screen Power-On & Scanline Sweep Timeline
    // 0.0s - 0.4s: Screen dark
    // 0.4s - 0.7s: Cyan scanline sweep
    // 0.7s+: Code scrolling & terminal logs
    if (screenMatRef.current) {
      if (time < 0.4) {
        screenMatRef.current.opacity = 0.0;
      } else {
        screenMatRef.current.opacity = Math.min(1.0, (time - 0.4) * 4.0);
      }
    }

    if (scanlineRef.current) {
      if (time >= 0.4 && time <= 0.8) {
        scanlineRef.current.visible = true;
        const progress = (time - 0.4) / 0.4;
        scanlineRef.current.position.y = 1.0 - progress * 2.0;
      } else {
        scanlineRef.current.visible = false;
      }
    }

    // 3. Dynamic Code Editor Canvas Drawing
    if (time >= 0.5 && screenCtx && screenCanvas) {
      screenCtx.fillStyle = '#050b14';
      screenCtx.fillRect(0, 0, 1024, 640);

      // Window Header Bar
      screenCtx.fillStyle = '#0f172a';
      screenCtx.fillRect(0, 0, 1024, 50);

      // Red/Yellow/Green Window Dots
      screenCtx.fillStyle = '#ef4444';
      screenCtx.beginPath(); screenCtx.arc(30, 25, 8, 0, Math.PI * 2); screenCtx.fill();
      screenCtx.fillStyle = '#eab308';
      screenCtx.beginPath(); screenCtx.arc(55, 25, 8, 0, Math.PI * 2); screenCtx.fill();
      screenCtx.fillStyle = '#22c55e';
      screenCtx.beginPath(); screenCtx.arc(80, 25, 8, 0, Math.PI * 2); screenCtx.fill();

      screenCtx.fillStyle = '#94a3b8';
      screenCtx.font = 'bold 20px monospace';
      screenCtx.fillText('main.cpp — PortfolioEngine WebGL', 120, 32);

      // Continuous Code Scroll Calculation
      const scrollOffset = (time * 0.8) % codeLines.length;
      const startLineIdx = Math.floor(scrollOffset);

      let lineY = 95;
      for (let i = 0; i < 12; i++) {
        const lineIdx = (startLineIdx + i) % codeLines.length;
        const lineStr = codeLines[lineIdx];

        // Line Numbers
        screenCtx.fillStyle = '#334155';
        screenCtx.font = '20px monospace';
        screenCtx.fillText(String(lineIdx + 1).padStart(2, ' '), 30, lineY);

        // Syntax Highlighting
        screenCtx.font = '21px monospace';
        if (lineStr.startsWith('#include')) {
          screenCtx.fillStyle = '#ec4899';
        } else if (lineStr.startsWith('class') || lineStr.startsWith('public:') || lineStr.startsWith('int') || lineStr.startsWith('  while')) {
          screenCtx.fillStyle = '#38bdf8';
        } else if (lineStr.includes('"')) {
          screenCtx.fillStyle = '#4ade80';
        } else {
          screenCtx.fillStyle = '#cbd5e1';
        }
        screenCtx.fillText(lineStr, 85, lineY);

        // Blinking Cursor
        if (i === 4 && Math.sin(time * 6) > 0) {
          const strWidth = screenCtx.measureText(lineStr).width;
          screenCtx.fillStyle = '#00f3ff';
          screenCtx.fillRect(88 + strWidth, lineY - 18, 12, 24);
        }

        lineY += 34;
      }

      // Bottom Terminal Panel
      screenCtx.fillStyle = '#090d1a';
      screenCtx.fillRect(0, 480, 1024, 160);
      screenCtx.fillStyle = '#1e293b';
      screenCtx.fillRect(0, 480, 1024, 28);
      screenCtx.fillStyle = '#a855f7';
      screenCtx.font = 'bold 16px monospace';
      screenCtx.fillText('TERMINAL OUTPUT', 30, 500);

      const visibleLogs = Math.min(terminalLogs.length, Math.floor((time * 0.6) % terminalLogs.length) + 1);
      let termY = 530;
      screenCtx.font = '17px monospace';
      for (let i = 0; i < visibleLogs; i++) {
        screenCtx.fillStyle = i === visibleLogs - 1 ? '#00f3ff' : '#94a3b8';
        screenCtx.fillText(terminalLogs[i], 30, termY);
        termY += 24;
      }

      if (screenTextureRef.current) screenTextureRef.current.needsUpdate = true;
    }

    // 4. Keyboard Keycap Subtle Glow Activity
    if (time >= 0.7) {
      const press1 = Math.sin(time * 12.0) > 0.5;
      if (keyMat1.current) keyMat1.current.emissiveIntensity = press1 ? 2.0 : 0.8;

      const press2 = Math.cos(time * 14.0) > 0.5;
      if (keyMat2.current) keyMat2.current.emissiveIntensity = press2 ? 2.0 : 0.8;
    }
  });

  return (
    <group ref={laptopGroupRef} position={[1.8, -0.3, 0]}>
      
      {/* ==========================================
          1. LAPTOP BASE CHASSIS (KEYBOARD & TRACKPAD)
         ========================================== */}
      <group position={[0, 0, 0]}>
        {/* Main Base Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.12, 2.3]} />
          <meshStandardMaterial color="#0c1527" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Front Edge Beveled Cyan Glow Trim */}
        <mesh position={[0, 0.01, 1.15]}>
          <boxGeometry args={[3.4, 0.015, 0.02]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.4} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.062, 0.65]} receiveShadow>
          <boxGeometry args={[1.0, 0.005, 0.7]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Keyboard Keycaps Recess */}
        <mesh position={[0, 0.062, -0.35]}>
          <boxGeometry args={[3.0, 0.005, 1.15]} />
          <meshStandardMaterial color="#050b14" roughness={0.8} />
        </mesh>

        {/* WASD & Functional Keycaps Matrix */}
        <mesh position={[-1.1, 0.08, -0.4]}>
          <boxGeometry args={[0.18, 0.02, 0.18]} />
          <meshStandardMaterial ref={keyMat1} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.9, 0.08, -0.4]}>
          <boxGeometry args={[0.18, 0.02, 0.18]} />
          <meshStandardMaterial ref={keyMat2} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 0.075, -0.35]}>
          <boxGeometry args={[2.9, 0.01, 1.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Keyboard Cyan Underglow Strip */}
        <mesh position={[0, 0.063, 0.23]}>
          <boxGeometry args={[2.95, 0.005, 0.015]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.6} />
        </mesh>
      </group>

      {/* ==========================================
          2. LAPTOP DISPLAY SCREEN LID (ANGLED AT ~105°)
         ========================================== */}
      <group position={[0, 0.06, -1.1]} rotation={[-1.72, 0, 0]}>
        {/* Screen Outer Lid Shell */}
        <mesh castShadow receiveShadow position={[0, 1.05, 0]}>
          <boxGeometry args={[3.4, 2.1, 0.06]} />
          <meshStandardMaterial color="#0c1527" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Screen Bezel Trim */}
        <mesh position={[0, 1.05, 0.032]}>
          <boxGeometry args={[3.32, 2.02, 0.005]} />
          <meshStandardMaterial color="#050b14" roughness={0.5} />
        </mesh>

        {/* Dynamic Display Canvas Screen */}
        <mesh position={[0, 1.05, 0.036]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshBasicMaterial ref={screenMatRef} transparent opacity={0}>
            {screenCanvas && (
              <canvasTexture
                ref={screenTextureRef}
                attach="map"
                image={screenCanvas}
                colorSpace={THREE.SRGBColorSpace}
              />
            )}
          </meshBasicMaterial>
        </mesh>

        {/* Cyan Scanline Power-On Sweep */}
        <mesh ref={scanlineRef} position={[0, 1.05, 0.038]} visible={false}>
          <planeGeometry args={[3.2, 0.05]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.9} />
        </mesh>

        {/* Screen Back Emblem Light */}
        <mesh position={[0, 1.05, -0.032]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.5} />
        </mesh>
      </group>

    </group>
  );
}

// Background Refined Floating Particles (120 Glowing Particles)
function LaptopParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f3ff');
    const purple = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 12 + 1;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      const c = cyan.clone().lerp(purple, Math.random());
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const { pointer } = state;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.025 + pointer.x * 0.03;
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.02 + pointer.y * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// MAIN 3D WORKSTATION SCENE: REALISTIC MODERN LAPTOP SCENE
export default function WorkstationScene() {
  return (
    <Suspense fallback={null}>
      {/* 1. Deep Space Ambient Fog & Studio Lighting */}
      <fog attach="fog" args={['#030712', 8, 26]} />

      <ambientLight intensity={1.6} color="#ffffff" />
      <directionalLight position={[4, 7, 5]} intensity={3.6} color="#ffffff" castShadow />
      <pointLight position={[-4, 3, 3]} intensity={5.0} color="#00f3ff" distance={14} />
      <pointLight position={[4, -2, 2]} intensity={4.5} color="#a855f7" distance={14} />

      {/* Screen Overhead Glow Spotlight */}
      <spotLight
        position={[1.8, 4.0, 2.5]}
        angle={0.6}
        penumbra={0.8}
        intensity={4.5}
        color="#00f3ff"
        distance={10}
      />

      {/* 2. REALISTIC MODERN 3D LAPTOP WITH DYNAMIC CODE SCREEN */}
      <LaptopObject />

      {/* 3. REFINED BACKGROUND PARTICLES */}
      <LaptopParticles />
    </Suspense>
  );
}
