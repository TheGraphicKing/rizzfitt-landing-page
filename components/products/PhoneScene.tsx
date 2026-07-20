"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

/**
 * Connect teaser scene: a floating phone, mouse-reactive (±6° parallax). The one
 * 3D scene on the Connect page; rendered only inside `<Hero3DCanvas>` (desktop,
 * motion-allowed) with the wrapper handling the mobile / reduced-motion still.
 */
const MAX_TILT = (6 * Math.PI) / 180;

export function PhoneScene() {
  const rig = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!rig.current) return;
    const k = Math.min(1, delta * 6);
    rig.current.rotation.y += (state.pointer.x * MAX_TILT - rig.current.rotation.y) * k;
    rig.current.rotation.x += (-state.pointer.y * MAX_TILT - rig.current.rotation.x) * k;
  });
  return (
    <group ref={rig}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <group rotation={[0.1, -0.3, 0.05]}>
          {/* Body */}
          <RoundedBox args={[1.5, 3, 0.18]} radius={0.18} smoothness={6} castShadow>
            <meshStandardMaterial color="#1C1B1A" roughness={0.4} metalness={0.2} />
          </RoundedBox>
          {/* Screen */}
          <RoundedBox args={[1.3, 2.7, 0.04]} radius={0.12} smoothness={5} position={[0, 0, 0.1]}>
            <meshStandardMaterial color="#211F1D" roughness={0.3} />
          </RoundedBox>
          {/* Accent card on screen */}
          <mesh position={[0, 0.55, 0.13]}>
            <boxGeometry args={[1.0, 0.7, 0.02]} />
            <meshStandardMaterial color="#F16C1D" emissive="#F16C1D" emissiveIntensity={0.35} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.35, 0.13]}>
            <boxGeometry args={[1.0, 0.4, 0.02]} />
            <meshStandardMaterial color="#262422" roughness={0.6} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
