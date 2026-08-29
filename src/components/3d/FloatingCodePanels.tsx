'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingCodePanels() {
  const panel1Ref = useRef<THREE.Group>(null!);
  const panel2Ref = useRef<THREE.Group>(null!);

  // Generate 2D Canvas Textures for C++ and TS Code Panels (Reduced size, high clarity)
  const [cppTexture, tsTexture] = useMemo(() => {
    if (typeof window === 'undefined') return [null, null];

    // 1. C++ Panel Texture
    const canvas1 = document.createElement('canvas');
    canvas1.width = 512;
    canvas1.height = 280;
    const ctx1 = canvas1.getContext('2d');
    if (ctx1) {
      ctx1.fillStyle = '#070d1b';
      ctx1.fillRect(0, 0, 512, 280);
      ctx1.strokeStyle = '#00f3ff';
      ctx1.lineWidth = 6;
      ctx1.strokeRect(3, 3, 506, 274);

      ctx1.fillStyle = '#00f3ff';
      ctx1.font = 'bold 20px monospace';
      ctx1.fillText('// C++ Low-Level Engine', 20, 40);

      ctx1.fillStyle = '#ec4899';
      ctx1.font = '16px monospace';
      ctx1.fillText('#include <iostream>', 20, 80);
      ctx1.fillText('#include <memory>', 20, 105);

      ctx1.fillStyle = '#3b82f6';
      ctx1.fillText('template <typename T>', 20, 145);
      ctx1.fillStyle = '#f8fafc';
      ctx1.fillText('class SystemEngine {', 20, 170);
      ctx1.fillText('  std::unique_ptr<T> core;', 20, 195);
      ctx1.fillText('  bool isRunning = true;', 20, 220);
      ctx1.fillText('};', 20, 245);
    }
    const tex1 = new THREE.CanvasTexture(canvas1);

    // 2. TypeScript Panel Texture
    const canvas2 = document.createElement('canvas');
    canvas2.width = 512;
    canvas2.height = 280;
    const ctx2 = canvas2.getContext('2d');
    if (ctx2) {
      ctx2.fillStyle = '#0c1527';
      ctx2.fillRect(0, 0, 512, 280);
      ctx2.strokeStyle = '#8b5cf6';
      ctx2.lineWidth = 6;
      ctx2.strokeRect(3, 3, 506, 274);

      ctx2.fillStyle = '#8b5cf6';
      ctx2.font = 'bold 20px monospace';
      ctx2.fillText('// React Three Fiber Core', 20, 40);

      ctx2.fillStyle = '#3b82f6';
      ctx2.font = '16px monospace';
      ctx2.fillText('interface Workstation3D {', 20, 85);
      ctx2.fillStyle = '#00f3ff';
      ctx2.fillText('  renderer: "React Three Fiber";', 20, 115);
      ctx2.fillText('  fps: 60;', 20, 145);
      ctx2.fillText('  status: "Production Verified";', 20, 175);
      ctx2.fillStyle = '#3b82f6';
      ctx2.fillText('}', 20, 205);
    }
    const tex2 = new THREE.CanvasTexture(canvas2);

    return [tex1, tex2];
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Left Panel Floating Motion (Positioned behind/above left monitor)
    if (panel1Ref.current) {
      panel1Ref.current.position.y = 2.2 + Math.sin(time * 1.3) * 0.12;
      panel1Ref.current.rotation.y = Math.sin(time * 0.7) * 0.08 - 0.25;
      panel1Ref.current.rotation.z = Math.cos(time * 0.9) * 0.03;
    }

    // Right Panel Floating Motion (Positioned behind/above right monitor)
    if (panel2Ref.current) {
      panel2Ref.current.position.y = 1.9 + Math.cos(time * 1.5) * 0.12;
      panel2Ref.current.rotation.y = Math.cos(time * 0.6) * 0.08 + 0.25;
      panel2Ref.current.rotation.z = Math.sin(time * 0.8) * 0.03;
    }
  });

  return (
    <group>
      {/* Left Glass Panel (C++) - Compact size, positioned wide & behind left monitor */}
      <group ref={panel1Ref} position={[-3.4, 2.2, -0.6]} rotation={[0, -0.25, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.0, 0.03]} />
          <meshStandardMaterial
            color="#070d1b"
            emissive="#00f3ff"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.76, 0.96]} />
          {cppTexture && <meshBasicMaterial map={cppTexture} transparent opacity={0.9} />}
        </mesh>
      </group>

      {/* Right Glass Panel (TypeScript) - Compact size, positioned wide & behind right monitor */}
      <group ref={panel2Ref} position={[3.4, 1.9, -0.5]} rotation={[0, 0.25, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.0, 0.03]} />
          <meshStandardMaterial
            color="#0c1527"
            emissive="#8b5cf6"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.76, 0.96]} />
          {tsTexture && <meshBasicMaterial map={tsTexture} transparent opacity={0.9} />}
        </mesh>
      </group>
    </group>
  );
}
