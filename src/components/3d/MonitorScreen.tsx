'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MonitorScreen() {
  const leftTextureRef = useRef<THREE.CanvasTexture>(null!);
  const rightTextureRef = useRef<THREE.CanvasTexture>(null!);

  const codeLines = useMemo(
    () => [
      '#include <iostream>',
      '#include <three/webgl.hpp>',
      '',
      'class PortfolioEngine {',
      'public:',
      '  void renderScene() {',
      '    Shader::bind("cyberpunk.glsl");',
      '    GPU::drawElements(GL_TRIANGLES);',
      '    std::cout << "Rendering 60FPS..." << std::endl;',
      '  }',
      '};',
      '',
      'int main() {',
      '  PortfolioEngine engine;',
      '  while (engine.isRunning()) {',
      '    engine.updatePhysics();',
      '    engine.renderScene();',
      '  }',
      '  return 0;',
      '}',
    ],
    []
  );

  const terminalLogs = useMemo(
    () => [
      '[SYSTEM] WebGL 2.0 Context Initialized',
      '[SHADER] Compiling vertex_shader.glsl ... OK',
      '[SHADER] Compiling fragment_shader.glsl ... OK',
      '[RENDER] Framebuffer 1920x1080 initialized',
      '[CAMERA] 3D Parallax Rig active',
      '[NETWORK] WebSocket telemetry stream connected',
      '[BUILD] 0 errors, 0 warnings. Build succeed.',
      '[TELEMETRY] GPU VRAM allocated: 1.4 GB',
    ],
    []
  );

  // Create 2D Canvases for dynamic 2D canvas textures
  const { leftCanvas, rightCanvas, leftCtx, rightCtx } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { leftCanvas: null, rightCanvas: null, leftCtx: null, rightCtx: null };
    }
    const lc = document.createElement('canvas');
    lc.width = 512;
    lc.height = 512;
    const lCtx = lc.getContext('2d');

    const rc = document.createElement('canvas');
    rc.width = 512;
    rc.height = 512;
    const rCtx = rc.getContext('2d');

    return { leftCanvas: lc, rightCanvas: rc, leftCtx: lCtx, rightCtx: rCtx };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // ====================================================
    // 1. LEFT SCREEN (C++ Code Editor - Always ON, Smooth Scroll & Blinking Cursor)
    // ====================================================
    if (leftCtx && leftCanvas) {
      leftCtx.fillStyle = '#050b14';
      leftCtx.fillRect(0, 0, 512, 512);

      // Window Header Bar
      leftCtx.fillStyle = '#0f172a';
      leftCtx.fillRect(0, 0, 512, 40);
      leftCtx.fillStyle = '#ef4444';
      leftCtx.beginPath(); leftCtx.arc(20, 20, 6, 0, Math.PI * 2); leftCtx.fill();
      leftCtx.fillStyle = '#eab308';
      leftCtx.beginPath(); leftCtx.arc(38, 20, 6, 0, Math.PI * 2); leftCtx.fill();
      leftCtx.fillStyle = '#22c55e';
      leftCtx.beginPath(); leftCtx.arc(56, 20, 6, 0, Math.PI * 2); leftCtx.fill();

      leftCtx.fillStyle = '#94a3b8';
      leftCtx.font = 'bold 16px monospace';
      leftCtx.fillText('main.cpp — Live Workspace', 80, 26);

      // Continuous Smooth Code Scroll Line Offset
      const scrollOffset = (time * 0.8) % codeLines.length;
      const startLineIdx = Math.floor(scrollOffset);

      let lineY = 70;
      for (let i = 0; i < 14; i++) {
        const lineIdx = (startLineIdx + i) % codeLines.length;
        const lineStr = codeLines[lineIdx];

        // Line Numbers
        leftCtx.fillStyle = '#334155';
        leftCtx.font = '14px monospace';
        leftCtx.fillText(String(lineIdx + 1).padStart(2, ' '), 20, lineY);

        // Syntax Highlighting
        leftCtx.font = '15px monospace';
        if (lineStr.startsWith('#include')) {
          leftCtx.fillStyle = '#ec4899';
        } else if (lineStr.startsWith('class') || lineStr.startsWith('public:') || lineStr.startsWith('int') || lineStr.startsWith('  while')) {
          leftCtx.fillStyle = '#38bdf8';
        } else if (lineStr.includes('"')) {
          leftCtx.fillStyle = '#4ade80';
        } else {
          leftCtx.fillStyle = '#cbd5e1';
        }
        leftCtx.fillText(lineStr, 60, lineY);

        // Blinking Cursor on active line
        if (i === 4 && Math.sin(time * 6) > 0) {
          const strWidth = leftCtx.measureText(lineStr).width;
          leftCtx.fillStyle = '#00f3ff';
          leftCtx.fillRect(62 + strWidth, lineY - 14, 9, 18);
        }

        lineY += 28;
      }

      if (leftTextureRef.current) leftTextureRef.current.needsUpdate = true;
    }

    // ====================================================
    // 2. RIGHT SCREEN (Terminal Output & WebGL Telemetry Waveform - Always ON)
    // ====================================================
    if (rightCtx && rightCanvas) {
      rightCtx.fillStyle = '#050b14';
      rightCtx.fillRect(0, 0, 512, 512);

      // Window Header Bar
      rightCtx.fillStyle = '#0f172a';
      rightCtx.fillRect(0, 0, 512, 40);
      rightCtx.fillStyle = '#8b5cf6';
      rightCtx.font = 'bold 16px monospace';
      rightCtx.fillText('Terminal — Telemetry & WebGL Logs', 20, 26);

      // Occasionally add new terminal log lines over time
      const visibleLogCount = Math.min(terminalLogs.length, 3 + Math.floor((time * 0.5) % terminalLogs.length));

      let logY = 75;
      rightCtx.font = '14px monospace';
      for (let i = 0; i < visibleLogCount; i++) {
        const logIndex = i % terminalLogs.length;
        rightCtx.fillStyle = i === visibleLogCount - 1 ? '#00f3ff' : '#a855f7';
        rightCtx.fillText(terminalLogs[logIndex], 20, logY);
        logY += 26;
      }

      // Live Telemetry Waveform Graph
      rightCtx.strokeStyle = '#00f3ff';
      rightCtx.lineWidth = 2;
      rightCtx.beginPath();
      const startY = 360;
      for (let x = 20; x < 490; x += 4) {
        const y = startY + Math.sin(x * 0.04 + time * 5) * 30 * Math.cos(time * 1.5 + x * 0.01);
        if (x === 20) rightCtx.moveTo(x, y);
        else rightCtx.lineTo(x, y);
      }
      rightCtx.stroke();

      rightCtx.fillStyle = '#94a3b8';
      rightCtx.fillText(`FPS: 60  |  VRAM: 1.4 GB  |  GPU LOAD: ${(45 + Math.sin(time * 2) * 5).toFixed(1)}%`, 20, 460);

      if (rightTextureRef.current) rightTextureRef.current.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      
      {/* 1. Dual Monitor Stand */}
      <group position={[-0.1, 0.4, -0.1]}>
        <mesh castShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.9, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh castShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.24, 0.05, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 2. LEFT MONITOR (C++ Code Editor Screen - ALWAYS ON) */}
      <group position={[-1.6, 1.35, 0]} rotation={[0, 0.19, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.45, 0.06]} />
          <meshStandardMaterial color="#0c1527" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.73, 0.035]}>
          <boxGeometry args={[2.5, 0.02, 0.015]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[2.4, 1.35]} />
          <meshBasicMaterial transparent opacity={1.0}>
            {leftCanvas && (
              <canvasTexture
                ref={leftTextureRef}
                attach="map"
                image={leftCanvas}
                colorSpace={THREE.SRGBColorSpace}
              />
            )}
          </meshBasicMaterial>
        </mesh>
      </group>

      {/* 3. RIGHT MONITOR (Terminal Logs & WebGL Waveform Screen - ALWAYS ON) */}
      <group position={[1.4, 1.35, -0.08]} rotation={[0, -0.19, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.45, 0.06]} />
          <meshStandardMaterial color="#0c1527" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.73, 0.035]}>
          <boxGeometry args={[2.5, 0.02, 0.015]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[2.4, 1.35]} />
          <meshBasicMaterial transparent opacity={1.0}>
            {rightCanvas && (
              <canvasTexture
                ref={rightTextureRef}
                attach="map"
                image={rightCanvas}
                colorSpace={THREE.SRGBColorSpace}
              />
            )}
          </meshBasicMaterial>
        </mesh>
      </group>

    </group>
  );
}
