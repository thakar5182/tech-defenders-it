"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RobotFallback({
  isMobile,
}: {
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = (isMobile ? -1.0 : -1.18) + Math.sin(time * 1.5) * 0.04;
    groupRef.current.rotation.y = time * 0.2;
  });

  return (
    <group
      ref={groupRef}
      position={[isMobile ? 0 : 1.36, isMobile ? -1.0 : -1.18, isMobile ? -0.8 : 0.15]}
      scale={isMobile ? 0.72 : 1.16}
    >
      {/* Holographic Torso Silhouette */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.55, 16]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Head Silhouette */}
      <mesh position={[0, 0.88, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Chest Core */}
      <mesh position={[0, 0.52, 0.12]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Orbital Ring */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.65, 0.008, 16, 64]} />
        <meshBasicMaterial color="#0066ff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
