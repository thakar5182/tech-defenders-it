"use client";
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CyberShieldProps {
  chapter: number;
  mouse: { x: number; y: number };
  isMobile: boolean;
}

export function CyberShield({ chapter, mouse, isMobile }: CyberShieldProps) {
  const rootRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const scanLaserRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);

  // Procedural sci-fi shield geometry with sleek proportions
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Top-left shoulder
    shape.moveTo(-1.0, 1.15);
    // Top slight dip to center
    shape.quadraticCurveTo(0, 1.28, 1.0, 1.15);
    // Top-right shoulder down to side curve
    shape.quadraticCurveTo(1.18, 0.35, 1.05, -0.25);
    // Tapering down to bottom apex
    shape.quadraticCurveTo(0.75, -1.1, 0, -1.5);
    // Bottom apex back up left
    shape.quadraticCurveTo(-0.75, -1.1, -1.05, -0.25);
    shape.quadraticCurveTo(-1.18, 0.35, -1.0, 1.15);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Recessed inner core plate
  const innerCoreGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.7, 0.85);
    shape.quadraticCurveTo(0, 0.95, 0.7, 0.85);
    shape.quadraticCurveTo(0.85, 0.25, 0.75, -0.2);
    shape.quadraticCurveTo(0.5, -0.8, 0, -1.1);
    shape.quadraticCurveTo(-0.5, -0.8, -0.75, -0.2);
    shape.quadraticCurveTo(-0.85, 0.25, -0.7, 0.85);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Thin outer gimbal ring
  const ringGeo = useMemo(() => {
    return new THREE.TorusGeometry(1.9, 0.012, 16, 90);
  }, []);

  const innerRingGeo = useMemo(() => {
    return new THREE.TorusGeometry(1.55, 0.008, 16, 70);
  }, []);

  // Target transforms per chapter:
  // On desktop: keep the shield positioned gracefully on the RIGHT half (x: ~1.3 to 1.5)
  // so the text on the left half has maximum breathing room and ZERO overlap!
  const chapterTransforms = useMemo(() => {
    if (isMobile) {
      return [
        { pos: [0, 0.1, -0.8], rot: [0.05, 0, 0], scale: 0.75 },
        { pos: [0, 0.2, -0.9], rot: [0.1, 0.15, 0], scale: 0.7 },
        { pos: [0, 0.1, -0.9], rot: [-0.05, -0.15, 0], scale: 0.7 },
        { pos: [0, 0.2, -1.0], rot: [0.15, 0, 0], scale: 0.65 },
        { pos: [0, 0.1, -0.9], rot: [0.05, 0.15, 0], scale: 0.7 },
        { pos: [0, 0.2, -0.9], rot: [-0.05, -0.15, 0], scale: 0.7 },
      ];
    }
    return [
      // 00 Hero: Elegantly anchored to the right side of the screen
      { pos: [1.38, 0.05, 0], rot: [0.05, -0.28, 0.02], scale: 1.02 },
      // 01 Mission: Angled towards viewer on the right
      { pos: [1.35, -0.05, -0.1], rot: [0.1, -0.32, 0], scale: 0.98 },
      // 02 Services: Framed slightly higher
      { pos: [1.4, 0.1, -0.15], rot: [-0.08, -0.38, 0.04], scale: 0.95 },
      // 03 Approach: Elevated angle
      { pos: [1.35, 0.15, -0.2], rot: [0.18, -0.25, 0], scale: 0.92 },
      // 04 Tech & Trust: Deep side anchor
      { pos: [1.38, -0.05, -0.2], rot: [0.05, -0.28, -0.02], scale: 0.95 },
      // 05 Contact: Subtle presence
      { pos: [1.4, 0.05, -0.15], rot: [-0.05, -0.3, 0.02], scale: 0.96 },
    ];
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    const time = state.clock.getElapsedTime();
    const target = chapterTransforms[Math.min(chapter, chapterTransforms.length - 1)];

    // Target position lerp
    const tx = target.pos[0] + (isMobile ? 0 : mouse.x * 0.25);
    const ty = target.pos[1] + (isMobile ? 0 : mouse.y * 0.18) + Math.sin(time * 1.1) * 0.05;
    const tz = target.pos[2];

    rootRef.current.position.x = THREE.MathUtils.lerp(rootRef.current.position.x, tx, 0.06);
    rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, ty, 0.06);
    rootRef.current.position.z = THREE.MathUtils.lerp(rootRef.current.position.z, tz, 0.06);

    // Target rotation lerp with gentle mouse parallax
    const rx = target.rot[0] - (isMobile ? 0 : mouse.y * 0.2);
    const ry = target.rot[1] + (isMobile ? 0 : mouse.x * 0.25) + Math.sin(time * 0.5) * 0.03;
    const rz = target.rot[2];

    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, rx, 0.06);
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, ry, 0.06);
    rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, rz, 0.06);

    // Scale lerp
    const currentScale = rootRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, target.scale, 0.06);
    rootRef.current.scale.set(newScale, newScale, newScale);

    // Gimbal rings rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.18;
      outerRingRef.current.rotation.x = Math.sin(time * 0.35) * 0.12;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.24;
      innerRingRef.current.rotation.y = Math.cos(time * 0.45) * 0.15;
    }

    // Laser scan line sweeping smoothly
    if (scanLaserRef.current) {
      const scanY = Math.sin(time * 1.8) * 1.35;
      scanLaserRef.current.position.y = scanY;
      const mat = scanLaserRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.25 + Math.sin(time * 3.5) * 0.15;
      }
    }

    // Core emblem energy pulse
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2.8) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={rootRef}>
      {/* Primary Metallic Titanium Shield */}
      <mesh geometry={shieldGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0b121e"
          metalness={0.92}
          roughness={0.22}
          clearcoat={0.85}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>

      {/* Outer Cyan Wireframe Accent */}
      <mesh geometry={shieldGeometry} scale={1.004}>
        <meshBasicMaterial
          color="#35e6c4"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* Recessed Obsidian Inner Core */}
      <mesh geometry={innerCoreGeometry} position={[0, 0, 0.08]}>
        <meshStandardMaterial
          color="#05080f"
          metalness={0.95}
          roughness={0.35}
        />
      </mesh>

      {/* Cyber Circuit Pattern Overlay */}
      <mesh geometry={innerCoreGeometry} position={[0, 0, 0.085]} scale={0.98}>
        <meshBasicMaterial
          color="#0066ff"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Central Security Core Insignia */}
      <group ref={coreRef} position={[0, -0.05, 0.18]}>
        <mesh>
          <octahedronGeometry args={[0.32, 0]} />
          <meshBasicMaterial
            color="#35e6c4"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh scale={0.65}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color="#0066ff"
            emissive="#0055ff"
            emissiveIntensity={1.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#35e6c4" intensity={2.0} distance={3.2} decay={2} />
      </group>

      {/* Outer Gimbal Ring */}
      <group ref={outerRingRef}>
        <mesh geometry={ringGeo}>
          <meshBasicMaterial color="#35e6c4" transparent opacity={0.2} />
        </mesh>

        {/* Orbiting telemetry nodes */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx / 8) * Math.PI * 2;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, 0]}
            >
              <sphereGeometry args={[0.022, 10, 10]} />
              <meshBasicMaterial
                color={idx % 2 === 0 ? "#35e6c4" : "#0066ff"}
                transparent
                opacity={0.85}
              />
            </mesh>
          );
        })}
      </group>

      {/* Inner Gimbal Ring */}
      <group ref={innerRingRef}>
        <mesh geometry={innerRingGeo}>
          <meshBasicMaterial color="#0066ff" transparent opacity={0.28} />
        </mesh>
      </group>

      {/* Sleek Thin Laser Scanning Bar */}
      <mesh ref={scanLaserRef} position={[0, 0, 0.19]}>
        <planeGeometry args={[2.2, 0.018]} />
        <meshBasicMaterial
          color="#35e6c4"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mouse Follow Specular Light */}
      <pointLight
        position={[mouse.x * 2, mouse.y * 2, 1.8]}
        color="#35e6c4"
        intensity={1.5}
        distance={4.0}
        decay={2}
      />
    </group>
  );
}
