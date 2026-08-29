'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HologramItemProps {
  label: string;
  basePosition: [number, number, number];
  color: string;
}

function HologramItem({ label, basePosition, color }: HologramItemProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const { pointer } = state;

    if (groupRef.current) {
      // 1. Mouse Proximity Attraction Calculation
      const mouseVec = new THREE.Vector2(pointer.x * 2.5, pointer.y * 2.0);
      const symbolPos2D = new THREE.Vector2(basePosition[0], basePosition[1]);
      const dist = mouseVec.distanceTo(symbolPos2D);

      const isMouseClose = dist < 2.2;
      const mouseAttractWeight = isMouseClose ? (2.2 - dist) / 2.2 : 0;

      // Position Lerp (Gentle drift + mouse attraction)
      const targetX = basePosition[0] + pointer.x * 0.35 * mouseAttractWeight;
      const targetY = basePosition[1] + Math.sin(time * 1.4 + basePosition[0]) * 0.14 + pointer.y * 0.25 * mouseAttractWeight;
      const targetZ = basePosition[2] + mouseAttractWeight * 0.35;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 3.5);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 3.5);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 3.5);

      // Rotation Lerp toward mouse
      const targetRotX = Math.sin(time * 0.8) * 0.12 + pointer.y * 0.25 * mouseAttractWeight;
      const targetRotY = time * 0.35 + pointer.x * 0.35 * mouseAttractWeight;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3.5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3.5);

      // Emissive Glow Boost on Mouse Proximity
      if (matRef.current) {
        const baseGlow = 1.2 + Math.sin(time * 1.8 + basePosition[0]) * 0.3;
        matRef.current.emissiveIntensity = baseGlow + mouseAttractWeight * 1.6;
      }
    }
  });

  return (
    <group ref={groupRef} position={basePosition}>
      {/* Glass / Neon Hologram Orb (Rendered from moment 0) */}
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <pointLight color={color} intensity={1.4} distance={2} />
    </group>
  );
}

export default function FloatingSymbols() {
  const holograms = [
    { label: 'C++', basePosition: [-3.2, 2.2, -0.4] as [number, number, number], color: '#00f3ff' },
    { label: 'React', basePosition: [3.4, 2.4, -0.2] as [number, number, number], color: '#00f3ff' },
    { label: 'TS', basePosition: [-3.6, 1.0, 0.2] as [number, number, number], color: '#38bdf8' },
    { label: 'WebGL', basePosition: [3.6, 1.1, 0.3] as [number, number, number], color: '#a855f7' },
    { label: '</>', basePosition: [-2.6, 3.1, -0.6] as [number, number, number], color: '#ec4899' },
    { label: '{ }', basePosition: [2.8, 3.2, -0.5] as [number, number, number], color: '#a855f7' },
  ];

  return (
    <group position={[0, 0, 0]}>
      {holograms.map((item, idx) => (
        <HologramItem
          key={idx}
          label={item.label}
          basePosition={item.basePosition}
          color={item.color}
        />
      ))}
    </group>
  );
}
