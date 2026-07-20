"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Vector3, type Group, type Mesh } from "three";

/**
 * Interactive hero scene: a playable paddle + ball.
 *
 * - The paddle tracks your cursor (projected into the play plane).
 * - The ball drifts and bounces off the invisible walls; when the paddle gets
 *   near it, it's deflected away with a bit of pace — so you can rally it around.
 * - Click anywhere on the scene to "serve" (kick the ball in a fresh direction).
 *
 * Rendered only inside `<Hero3DCanvas>` (desktop, motion-allowed); the wrapper
 * swaps to a static still on mobile / reduced motion, so this stays
 * desktop-only and never blocks first paint.
 */

const BX = 1.9; // play bounds (x)
const BY = 1.3; // play bounds (y)
const PADDLE_R = 0.62; // hit radius
const BALL_R = 0.17;
const MIN_SPEED = 1.1;
const MAX_SPEED = 2.8;

export function PaddleScene() {
  const paddle = useRef<Group>(null);
  const ball = useRef<Mesh>(null);
  const vel = useRef(new Vector3(0.9, 0.7, 0));
  const paddlePos = useRef(new Vector3(0.8, -0.2, 0));
  const { size } = useThree();

  const serve = (px: number, py: number) => {
    // Kick the ball away from the click point with fresh pace.
    const b = ball.current;
    if (!b) return;
    const dx = b.position.x - px;
    const dy = b.position.y - py;
    const len = Math.hypot(dx, dy) || 1;
    vel.current.set((dx / len) * 2.4, (dy / len) * 2.4, 0);
  };

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const k = Math.min(1, dt * 9);

    // Paddle follows the cursor, projected into the play plane.
    const targetX = state.pointer.x * BX;
    const targetY = state.pointer.y * BY;
    paddlePos.current.x += (targetX - paddlePos.current.x) * k;
    paddlePos.current.y += (targetY - paddlePos.current.y) * k;
    if (paddle.current) {
      paddle.current.position.set(paddlePos.current.x, paddlePos.current.y, 0);
      // Tilt the paddle slightly toward its travel direction.
      paddle.current.rotation.z += (-(targetX - paddlePos.current.x) * 0.6 - paddle.current.rotation.z) * k;
      paddle.current.rotation.y += (state.pointer.x * 0.4 - paddle.current.rotation.y) * k;
    }

    const b = ball.current;
    if (!b) return;
    const v = vel.current;

    // Integrate.
    b.position.x += v.x * dt;
    b.position.y += v.y * dt;

    // Walls.
    if (b.position.x > BX) { b.position.x = BX; v.x = -Math.abs(v.x); }
    if (b.position.x < -BX) { b.position.x = -BX; v.x = Math.abs(v.x); }
    if (b.position.y > BY) { b.position.y = BY; v.y = -Math.abs(v.y); }
    if (b.position.y < -BY) { b.position.y = -BY; v.y = Math.abs(v.y); }

    // Paddle deflection.
    const dx = b.position.x - paddlePos.current.x;
    const dy = b.position.y - paddlePos.current.y;
    const dist = Math.hypot(dx, dy);
    if (dist < PADDLE_R + BALL_R) {
      const nx = dist > 0.001 ? dx / dist : 0;
      const ny = dist > 0.001 ? dy / dist : 1;
      const speed = Math.min(MAX_SPEED, Math.max(MIN_SPEED + 0.6, v.length()) * 1.08);
      v.set(nx * speed, ny * speed, 0);
      b.position.x = paddlePos.current.x + nx * (PADDLE_R + BALL_R);
      b.position.y = paddlePos.current.y + ny * (PADDLE_R + BALL_R);
    }

    // Keep pace in a pleasant range.
    const s = v.length();
    if (s < MIN_SPEED) v.multiplyScalar(MIN_SPEED / (s || 1));
    if (s > MAX_SPEED) v.multiplyScalar(MAX_SPEED / s);

    // Spin the ball for life.
    b.rotation.z -= dt * 3;
    b.rotation.x += dt * 1.5;
  });

  return (
    <group>
      {/* Invisible click-catcher sized to the view */}
      <mesh
        position={[0, 0, -0.5]}
        onPointerDown={(e) => {
          const x = (e.point.x);
          const y = (e.point.y);
          serve(x, y);
        }}
      >
        <planeGeometry args={[size.width, size.height]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Paddle */}
      <group ref={paddle} position={[0.8, -0.2, 0]}>
        <RoundedBox args={[0.95, 1.15, 0.14]} radius={0.24} smoothness={5} castShadow>
          <meshStandardMaterial color="#F16C1D" roughness={0.36} metalness={0.08} />
        </RoundedBox>
        <mesh position={[0, -0.92, 0]}>
          <boxGeometry args={[0.26, 0.7, 0.14]} />
          <meshStandardMaterial color="#D75E14" roughness={0.5} />
        </mesh>
        <mesh position={[0, -1.36, 0]}>
          <boxGeometry args={[0.32, 0.36, 0.16]} />
          <meshStandardMaterial color="#121212" roughness={0.7} />
        </mesh>
      </group>

      {/* Ball */}
      <mesh ref={ball} position={[-0.8, 0.4, 0]} castShadow>
        <sphereGeometry args={[BALL_R, 32, 32]} />
        <meshStandardMaterial color="#FF9145" roughness={0.4} />
      </mesh>
    </group>
  );
}
