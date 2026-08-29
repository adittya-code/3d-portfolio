'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig() {
  useFrame((state, delta) => {
    const { pointer } = state;

    // Smooth Mouse Parallax Tracking
    const mouseX = pointer.x * 0.35;
    const mouseY = pointer.y * 0.22;

    // Smooth Scroll Transformation (Laptop moves subtly closer on scroll)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollProgress = Math.min(scrollY / 700, 1.0);

    const targetX = 1.8 + mouseX + scrollProgress * 0.3;
    const targetY = 1.8 + mouseY + scrollProgress * 0.15;
    const targetZ = 7.8 - scrollProgress * 0.7;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 3.0);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 3.0);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 3.0);

    state.camera.lookAt(1.2 + scrollProgress * 0.2, 0, 0);
  });

  return null;
}
