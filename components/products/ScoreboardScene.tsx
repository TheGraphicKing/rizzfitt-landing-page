"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

/**
 * Tournament OS hero scene: a floating scoreboard panel above a stylised court.
 * The single 3D scene this page is allowed (design system PART 9). Rendered only
 * inside `<Hero3DCanvas>` (desktop, motion-allowed); the wrapper handles the
 * mobile / reduced-motion still, the dpr cap, and the offscreen pause.
 *
 * Mouse parallax tilts the rig ±6°; the panel floats gently.
 */
const MAX_TILT = (6 * Math.PI) / 180;

export function ScoreboardScene() {
  const rig = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!rig.current) return;
    const k = Math.min(1, delta * 6);
    const ty = state.pointer.x * MAX_TILT;
    const tx = -state.pointer.y * MAX_TILT;
    rig.current.rotation.y += (ty - rig.current.rotation.y) * k;
    rig.current.rotation.x += (tx + 0.18 - rig.current.rotation.x) * k;
  });

  return (
    <group ref={rig}>
      {/* Court — tilted back, with a centre line + kitchen line in orange */}
      <group rotation={[-0.9, 0, 0]} position={[0, -1.1, 0]}>
        <RoundedBox args={[4.2, 3.0, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#1C1B1A" roughness={0.9} />
        </RoundedBox>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[4.0, 0.04, 0.04]} />
          <meshStandardMaterial color="#F16C1D" emissive="#F16C1D" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0.7, 0.08]}>
          <boxGeometry args={[4.0, 0.03, 0.03]} />
          <meshStandardMaterial color="#FF9145" emissive="#FF9145" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Scoreboard panel — floating, with an emissive orange frame */}
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.5}>
        <group position={[0, 0.7, 0.6]} rotation={[0.05, 0.15, 0]}>
          <RoundedBox args={[2.6, 1.3, 0.18]} radius={0.14} smoothness={6} castShadow>
            <meshStandardMaterial color="#211F1D" roughness={0.5} metalness={0.15} />
          </RoundedBox>
          {/* Emissive frame */}
          <mesh position={[0, 0, 0.1]}>
            <torusGeometry args={[0.001, 0.001, 8, 8]} />
            <meshBasicMaterial color="#F16C1D" />
          </mesh>
          {/* Two score blocks */}
          <mesh position={[-0.62, 0, 0.11]}>
            <boxGeometry args={[0.7, 0.7, 0.06]} />
            <meshStandardMaterial color="#F16C1D" emissive="#F16C1D" emissiveIntensity={0.35} roughness={0.4} />
          </mesh>
          <mesh position={[0.62, 0, 0.11]}>
            <boxGeometry args={[0.7, 0.7, 0.06]} />
            <meshStandardMaterial color="#262422" roughness={0.6} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
