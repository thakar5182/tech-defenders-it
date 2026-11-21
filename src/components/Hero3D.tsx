"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Group, MathUtils } from "three";

function NetworkShield() {
  const groupRef = useRef<Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow base rotation
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z += delta * 0.1;
      
      // Subtle mouse interaction
      const targetX = mouse.y * 0.5;
      
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={2}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#35e6c4" wireframe transparent opacity={0.15} />
      </mesh>
      
      <mesh scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#35e6c4" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Nodes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * Math.PI / 6),
            Math.cos(i * Math.PI / 6) * (i % 2 === 0 ? 1 : 0.5),
            Math.sin(i * Math.PI / 3)
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#35e6c4" />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <NetworkShield />
      </Canvas>
    </div>
  );
}

