"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group, Mesh } from "three";

/**
 * The actual WebGL canvas. Imported only via `next/dynamic({ ssr: false })`
 * from `Hero3DCanvas`, so three.js never ships in the initial/first-paint
 * bundle and never runs on the server.
 *
 * Performance guards baked in:
 *  - `dpr={[1, 1.75]}` caps pixel ratio on retina screens (design system 9.3).
 *  - An IntersectionObserver toggles `frameloop` to `"never"` when the canvas
 *    scrolls offscreen, so the render loop pauses and stops burning GPU.
 */

interface CanvasSceneProps {
  /** R3F scene nodes. When omitted, a branded demo object renders. */
  children?: ReactNode;
  className?: string;
}

/** Gentle, pointer-reactive default object: the orange "K-runner" energy as a
 *  floating rounded blade + ball. Used when no scene children are supplied. */
function DemoObject() {
  const group = useRef<Group>(null);
  const ball = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
      // Subtle parallax toward the pointer.
      const px = state.pointer.x * 0.3;
      const py = state.pointer.y * 0.2;
      group.current.rotation.x += (py - group.current.rotation.x) * 0.05;
      group.current.position.x += (px - group.current.position.x) * 0.05;
    }
    if (ball.current) {
      ball.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.25 + 0.6;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh rotation={[0.3, 0.4, 0.2]} castShadow>
          <boxGeometry args={[1.4, 1.4, 0.18]} />
          <meshStandardMaterial color="#F16C1D" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh ref={ball} position={[0.9, 0.6, 0.4]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#FF9145" roughness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function CanvasScene({ children, className }: CanvasSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause the render loop when the canvas leaves the viewport.
  useEffect(() => {
    const el = wrapper.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        {children ?? <DemoObject />}
      </Canvas>
    </div>
  );
}
