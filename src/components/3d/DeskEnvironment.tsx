'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DeskEnvironment() {
  const fan1Ref = useRef<THREE.Group>(null!);
  const fan2Ref = useRef<THREE.Group>(null!);
  const fan1MatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const fan2MatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const gpuGlowRef = useRef<THREE.MeshStandardMaterial>(null!);
  const underglowMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const underglowLightRef = useRef<THREE.PointLight>(null!);

  // Keycap Refs for realistic random typing activity
  const keyRef1 = useRef<THREE.Mesh>(null!);
  const keyRef2 = useRef<THREE.Mesh>(null!);
  const keyRef3 = useRef<THREE.Mesh>(null!);

  const keyMat1 = useRef<THREE.MeshStandardMaterial>(null!);
  const keyMat2 = useRef<THREE.MeshStandardMaterial>(null!);
  const keyMat3 = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // 1. PC Fans Rotate Continuously at Different Speeds from Page Load
    if (fan1Ref.current) fan1Ref.current.rotation.z += delta * 8.5;
    if (fan2Ref.current) fan2Ref.current.rotation.z += delta * 7.2;

    // 2. PC RGB Lighting Slowly Flowing Between Cyan and Purple
    const hue = 0.5 + Math.sin(time * 0.5) * 0.15; // Cyan (0.5) <-> Purple (0.65)
    const flowColor = new THREE.Color().setHSL(hue, 1.0, 0.5);

    if (fan1MatRef.current) {
      fan1MatRef.current.color = flowColor;
      fan1MatRef.current.emissive = flowColor;
      fan1MatRef.current.emissiveIntensity = 1.2 + Math.sin(time * 2.0) * 0.3;
    }
    if (fan2MatRef.current) {
      fan2MatRef.current.color = flowColor;
      fan2MatRef.current.emissive = flowColor;
      fan2MatRef.current.emissiveIntensity = 1.2 + Math.cos(time * 2.0) * 0.3;
    }
    if (gpuGlowRef.current) {
      gpuGlowRef.current.color = flowColor;
      gpuGlowRef.current.emissive = flowColor;
      gpuGlowRef.current.emissiveIntensity = 1.4 + Math.sin(time * 3.0) * 0.4;
    }

    // 3. Soft Light Traveling Along Desk Edge (Cyan -> Purple -> Cyan)
    if (underglowMatRef.current) {
      underglowMatRef.current.color = flowColor;
      underglowMatRef.current.emissive = flowColor;
      underglowMatRef.current.emissiveIntensity = 1.6 + Math.sin(time * 1.8) * 0.4;
    }
    if (underglowLightRef.current) {
      underglowLightRef.current.color = flowColor;
      underglowLightRef.current.intensity = 2.5 + Math.sin(time * 1.8) * 0.6;
    }

    // 4. Keyboard Keys Press Individually in Realistic Random Typing Pattern
    const press1 = Math.sin(time * 11.0) > 0.4;
    if (keyRef1.current) keyRef1.current.position.y = press1 ? 0.04 : 0.05;
    if (keyMat1.current) keyMat1.current.emissiveIntensity = press1 ? 2.2 : 0.8;

    const press2 = Math.cos(time * 13.0) > 0.5;
    if (keyRef2.current) keyRef2.current.position.y = press2 ? 0.04 : 0.05;
    if (keyMat2.current) keyMat2.current.emissiveIntensity = press2 ? 2.2 : 0.8;

    const press3 = Math.sin(time * 15.0) > 0.6;
    if (keyRef3.current) keyRef3.current.position.y = press3 ? 0.04 : 0.05;
    if (keyMat3.current) keyMat3.current.emissiveIntensity = press3 ? 2.2 : 0.8;
  });

  return (
    <group position={[0, -0.4, 0]}>
      
      {/* 1. FUTURISTIC DESK (SHORT COMPACT LEGS) */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[5.6, 0.08, 2.3]} />
          <meshStandardMaterial color="#0c1527" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Soft RGB Light Strip Along Front Edge */}
        <mesh position={[0, 0.01, 1.15]}>
          <boxGeometry args={[5.6, 0.015, 0.025]} />
          <meshStandardMaterial ref={underglowMatRef} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.6} />
        </mesh>
        <pointLight ref={underglowLightRef} position={[0, -0.2, 0]} color="#00f3ff" intensity={2.5} distance={4} />

        {/* Shorter Compact Desk Legs */}
        <group position={[-2.5, -0.38, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.7, 1.8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
        <group position={[2.5, -0.38, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.7, 1.8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* 2. WORKSTATION PERIPHERALS & ACCESSORIES */}
      <mesh position={[-0.2, 0.045, 0.45]} receiveShadow>
        <boxGeometry args={[2.8, 0.01, 1.0]} />
        <meshStandardMaterial color="#050b14" roughness={0.8} />
      </mesh>

      {/* 75% Mechanical RGB Keyboard */}
      <group position={[-0.4, 0.08, 0.45]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.045, 0.45]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[1.34, 0.02, 0.38]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>

        {/* Animated Keycaps */}
        <mesh ref={keyRef1} position={[-0.44, 0.05, 0.05]}>
          <boxGeometry args={[0.065, 0.02, 0.065]} />
          <meshStandardMaterial ref={keyMat1} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.0} />
        </mesh>
        <mesh ref={keyRef2} position={[-0.36, 0.05, 0.05]}>
          <boxGeometry args={[0.065, 0.02, 0.065]} />
          <meshStandardMaterial ref={keyMat2} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.0} />
        </mesh>
        <mesh ref={keyRef3} position={[0.1, 0.05, -0.04]}>
          <boxGeometry args={[0.065, 0.02, 0.065]} />
          <meshStandardMaterial ref={keyMat3} color="#a855f7" emissive="#a855f7" emissiveIntensity={1.0} />
        </mesh>

        {/* Keyboard Underglow Strip */}
        <mesh position={[0, 0.01, 0.22]}>
          <boxGeometry args={[1.42, 0.01, 0.012]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.4} />
        </mesh>
      </group>

      {/* Ergonomic Gaming Mouse */}
      <group position={[0.75, 0.09, 0.45]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.065, 0.36]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.035, -0.08]}>
          <boxGeometry args={[0.03, 0.02, 0.07]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* Studio Headphones on Metallic Stand */}
      <group position={[-2.1, 0.05, 0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.025, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.85, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.84, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.16, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#334155" roughness={0.3} />
        </mesh>
      </group>

      {/* Coffee Mug */}
      <group position={[-1.4, 0.1, 0.65]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.075, 0.18, 24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Small Ceramic Desk Plant */}
      <group position={[1.3, 0.1, 0.65]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.065, 0.16, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.13, 0]} castShadow>
          <sphereGeometry args={[0.08, 14, 14]} />
          <meshStandardMaterial color="#10b981" roughness={0.6} />
        </mesh>
      </group>

      {/* Detailed RGB PC Desktop Tower */}
      <group position={[2.0, 0.8, 0.1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.75, 1.45, 1.25]} />
          <meshStandardMaterial color="#0c1527" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Tempered Glass Side Window */}
        <mesh position={[-0.38, 0, 0]}>
          <boxGeometry args={[0.015, 1.35, 1.15]} />
          <meshPhysicalMaterial
            color="#00f3ff"
            transparent
            opacity={0.3}
            transmission={0.9}
            roughness={0.05}
            clearcoat={1.0}
          />
        </mesh>
        {/* Front Panel Intake RGB Fan 1 (Spins at 8.5) */}
        <group ref={fan1Ref} position={[-0.18, 0.35, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.03, 18]} />
            <meshStandardMaterial ref={fan1MatRef} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.2} wireframe />
          </mesh>
        </group>
        {/* Front Panel Intake RGB Fan 2 (Spins at 7.2) */}
        <group ref={fan2Ref} position={[-0.18, -0.25, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.03, 18]} />
            <meshStandardMaterial ref={fan2MatRef} color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} wireframe />
          </mesh>
        </group>
        {/* GPU Graphics Card with HSL Color-Flow Emblem */}
        <group position={[-0.1, -0.1, -0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.09, 0.7]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[-0.14, 0, 0]}>
            <boxGeometry args={[0.015, 0.045, 0.5]} />
            <meshStandardMaterial ref={gpuGlowRef} color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.4} />
          </mesh>
        </group>
      </group>

    </group>
  );
}
