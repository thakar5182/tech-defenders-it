"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CyberGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.position.z = (time * 0.4) % 1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group position={[0, -2.2, 0]}>
      {/* Sci-fi Ground Grid */}
      <gridHelper
        ref={gridRef}
        args={[30, 30, "#35e6c4", "#0a192f"]}
        position={[0, 0, 0]}
      >
        <lineBasicMaterial
          attach="material"
          color="#35e6c4"
          transparent
          opacity={0.07}
        />
      </gridHelper>

      {/* Soft horizon ground plate to catch atmospheric rim light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color="#05070a"
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}
