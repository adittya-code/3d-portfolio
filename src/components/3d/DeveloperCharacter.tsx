'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DeveloperCharacterProps {
  position?: [number, number, number];
}

export default function DeveloperCharacter({ position = [0, -1.25, 0] }: DeveloperCharacterProps) {
  const characterGroupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const rightArmRef = useRef<THREE.Group>(null!);
  const rightHandWaveRef = useRef<THREE.Group>(null!);
  const speechBubbleMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  // Generate Offscreen Canvas for "Hi 👋" Speech Bubble Texture
  const { bubbleCanvas } = useMemo(() => {
    if (typeof window === 'undefined') return { bubbleCanvas: null };
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Rounded Bubble Background
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 236, 95, 20);
      ctx.fill();
      ctx.stroke();

      // Tail Pointer
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(50, 105);
      ctx.lineTo(30, 125);
      ctx.lineTo(70, 105);
      ctx.fill();

      // Text "Hi 👋"
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Hi 👋', 128, 56);
    }
    return { bubbleCanvas: canvas };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // 14-Second Animation Loop
    // 0s - 4.5s: Relaxed Idle posture standing
    // 4.5s - 5.5s: Turns head & upper body to visitor, smiles
    // 5.5s - 9.0s: Raises right arm, waves 2-3 times, displays "Hi 👋" speech bubble
    // 9.0s - 10.5s: Lowers waving hand
    // 10.5s - 14s: Returns to idle posture
    const cycleDuration = 14.0;
    const cycleTime = time % cycleDuration;

    let targetHeadY = 0.0;
    let targetTorsoY = 0.0;
    let targetWaveWeight = 0.0;

    if (cycleTime < 4.5) {
      // Idle Pose
      targetHeadY = Math.sin(time * 0.8) * 0.08;
      targetTorsoY = 0.0;
      targetWaveWeight = 0.0;
    } else if (cycleTime >= 4.5 && cycleTime < 5.5) {
      // Turns toward visitor
      const p = (cycleTime - 4.5) / 1.0;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetHeadY = THREE.MathUtils.lerp(0.0, 0.35, smoothP);
      targetTorsoY = THREE.MathUtils.lerp(0.0, 0.12, smoothP);
      targetWaveWeight = 0.0;
    } else if (cycleTime >= 5.5 && cycleTime < 9.0) {
      // Waving & "Hi 👋" Speech Bubble active
      targetHeadY = 0.35 + Math.sin(time * 1.2) * 0.03;
      targetTorsoY = 0.12;
      targetWaveWeight = 1.0;
    } else {
      // Lowers hand & returns to idle
      const p = (cycleTime - 9.0) / 1.5;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetHeadY = THREE.MathUtils.lerp(0.35, 0.0, smoothP);
      targetTorsoY = THREE.MathUtils.lerp(0.12, 0.0, smoothP);
      targetWaveWeight = THREE.MathUtils.lerp(1.0, 0.0, smoothP);
    }

    // 1. Subtle Idle Breathing / Sway
    if (characterGroupRef.current) {
      characterGroupRef.current.position.y = position[1] + Math.sin(time * 1.8) * 0.02;
      characterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        characterGroupRef.current.rotation.y,
        targetTorsoY,
        delta * 3.2
      );
    }

    // 2. Head Rotation
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetHeadY,
        delta * 3.6
      );
      headRef.current.rotation.z = Math.sin(time * 1.2) * 0.02;
    }

    // 3. Right Arm Waving Posture
    if (rightArmRef.current) {
      const restRotX = 0.1;
      const restRotZ = -0.15;

      const waveRotX = -0.75 + Math.cos(time * 2.0) * 0.08;
      const waveRotZ = -0.45;

      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(restRotX, waveRotX, targetWaveWeight);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(restRotZ, waveRotZ, targetWaveWeight);
    }

    // 4. Waving Hand Side-to-Side Gesture
    if (rightHandWaveRef.current) {
      const wavePhaseTime = Math.max(0, cycleTime - 5.5);
      const waveAngle = Math.sin(wavePhaseTime * 3.8) * 0.42 * targetWaveWeight;
      rightHandWaveRef.current.rotation.z = waveAngle;
    }

    // 5. Speech Bubble Fade In/Out
    if (speechBubbleMatRef.current) {
      speechBubbleMatRef.current.opacity = THREE.MathUtils.lerp(
        speechBubbleMatRef.current.opacity,
        targetWaveWeight,
        delta * 6.0
      );
    }
  });

  return (
    <group position={position}>
      
      {/* ==========================================
          1. STYLIZED STANDING 3D CARTOON DEVELOPER
         ========================================== */}
      <group ref={characterGroupRef} position={[0, 0, 0]}>
        
        {/* Legs / Jeans */}
        <group position={[0, 0, 0]}>
          <mesh position={[-0.22, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.09, 1.1, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
          <mesh position={[0.22, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.09, 1.1, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
          {/* White / Cyan Sneakers */}
          <mesh position={[-0.22, 0.06, 0.06]} castShadow>
            <boxGeometry args={[0.15, 0.12, 0.32]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <mesh position={[0.22, 0.06, 0.06]} castShadow>
            <boxGeometry args={[0.15, 0.12, 0.32]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <mesh position={[-0.22, 0.02, 0.06]}>
            <boxGeometry args={[0.155, 0.03, 0.325]} />
            <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[0.22, 0.02, 0.06]}>
            <boxGeometry args={[0.155, 0.03, 0.325]} />
            <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.2} />
          </mesh>
        </group>

        {/* Torso / Dark Indigo Hoodie & White T-Shirt Collar */}
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.72, 1.05, 0.38]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.5} />
        </mesh>
        {/* T-Shirt Collar */}
        <mesh position={[0, 2.08, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.08, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Hoodie Front Pocket */}
        <mesh position={[0, 1.45, 0.19]}>
          <boxGeometry args={[0.46, 0.32, 0.03]} />
          <meshStandardMaterial color="#312e81" roughness={0.5} />
        </mesh>
        {/* Cyan Zipper Line */}
        <mesh position={[0, 1.6, 0.2]}>
          <boxGeometry args={[0.02, 0.95, 0.02]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.4} />
        </mesh>

        {/* Left Arm (Relaxed at side) */}
        <group position={[-0.42, 1.95, 0]} rotation={[0, 0, 0.15]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.085, 0.075, 0.78, 14]} />
            <meshStandardMaterial color="#1e1b4b" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.42, 0]} castShadow>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshStandardMaterial color="#f5d0a9" roughness={0.4} />
          </mesh>
        </group>

        {/* Right Arm (Waving Arm Gesture) */}
        <group ref={rightArmRef} position={[0.42, 1.95, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.085, 0.075, 0.78, 14]} />
            <meshStandardMaterial color="#1e1b4b" roughness={0.5} />
          </mesh>
          
          {/* Waving Hand Assembly */}
          <group ref={rightHandWaveRef} position={[0, -0.42, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.13, 0.16, 0.05]} />
              <meshStandardMaterial color="#f5d0a9" roughness={0.4} />
            </mesh>
            {/* Fingers */}
            <mesh position={[0.04, 0.1, 0]}>
              <boxGeometry args={[0.03, 0.08, 0.04]} />
              <meshStandardMaterial color="#f5d0a9" roughness={0.4} />
            </mesh>
          </group>
        </group>

        {/* Character Head, Hair & Glasses */}
        <group ref={headRef} position={[0, 2.42, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.16, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.16, 16]} />
            <meshStandardMaterial color="#f5d0a9" roughness={0.4} />
          </mesh>

          {/* Head Base */}
          <mesh castShadow>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#f5d0a9" roughness={0.4} />
          </mesh>

          {/* Hair Cap & Fringe */}
          <mesh position={[0, 0.08, -0.02]} castShadow>
            <sphereGeometry args={[0.31, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color="#1e1b18" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.25, -0.2]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.32, 0.14, 0.16]} />
            <meshStandardMaterial color="#1e1b18" roughness={0.8} />
          </mesh>

          {/* Eyes & Eyebrows */}
          <group position={[0, 0.04, -0.28]}>
            <mesh position={[-0.1, 0, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            <mesh position={[0.1, 0, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
          </group>

          {/* Glasses Frame & Cyan Glowing Lens */}
          <group position={[0, 0.04, -0.29]}>
            <mesh position={[-0.11, 0, 0]}>
              <boxGeometry args={[0.15, 0.1, 0.02]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0.11, 0, 0]}>
              <boxGeometry args={[0.15, 0.1, 0.02]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.02, 0.02]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[-0.11, 0, 0.005]}>
              <planeGeometry args={[0.13, 0.08]} />
              <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0.11, 0, 0.005]}>
              <planeGeometry args={[0.13, 0.08]} />
              <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
            </mesh>
          </group>

          {/* Friendly Smile Expression */}
          <mesh position={[0, -0.12, -0.28]}>
            <torusGeometry args={[0.06, 0.012, 8, 16, Math.PI]} />
            <meshBasicMaterial color="#78350f" />
          </mesh>
        </group>

        {/* ==========================================
            2. FLOATING "Hi 👋" SPEECH TEXT BUBBLE
           ========================================== */}
        <mesh position={[0.5, 3.1, 0]}>
          <planeGeometry args={[1.3, 0.65]} />
          <meshBasicMaterial
            ref={speechBubbleMatRef}
            transparent
            opacity={0}
            depthWrite={false}
          >
            {bubbleCanvas && (
              <canvasTexture
                attach="map"
                image={bubbleCanvas}
                colorSpace={THREE.SRGBColorSpace}
              />
            )}
          </meshBasicMaterial>
        </mesh>

      </group>

    </group>
  );
}
