"use client";
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CyberParticlesProps {
  count?: number;
  mouse: { x: number; y: number };
}

export function CyberParticles({ count = 900, mouse }: CyberParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    const cyan = new THREE.Color("#35e6c4");
    const blue = new THREE.Color("#0066ff");
    const white = new THREE.Color("#ffffff");
    const darkBlue = new THREE.Color("#102a43");

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical volume around center
      const radius = 2.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 2;

      // Color distribution
      const randColor = Math.random();
      let chosenColor = cyan;
      if (randColor < 0.45) chosenColor = cyan;
      else if (randColor < 0.75) chosenColor = blue;
      else if (randColor < 0.9) chosenColor = white;
      else chosenColor = darkBlue;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      scl[i] = 0.5 + Math.random() * 1.5;
    }

    return [pos, col, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Gentle volumetric rotation
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -mouse.y * 0.1,
      0.03
    );
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      mouse.x * 0.1,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
