'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleAtmosphere() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate 120 refined, tiny glowing particles spread in 3D volume
  const { positions, colors } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f3ff');
    const purple = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
      // Position spread
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;

      // Color interpolation (Cyan <-> Purple)
      const mixedColor = cyan.clone().lerp(purple, Math.random());
      col[i * 3 + 0] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const { pointer } = state;

    if (pointsRef.current) {
      // Slow, subtle depth drift
      pointsRef.current.rotation.y = time * 0.02 + pointer.x * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.015) * 0.03 + pointer.y * 0.03;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
