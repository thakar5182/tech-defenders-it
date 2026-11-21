"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RobotCharacter } from "./RobotCharacter";
import { RobotFallback } from "./RobotFallback";
import { CyberParticles } from "./CyberParticles";
import { CyberGrid } from "./CyberGrid";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface CyberSceneProps {
  chapter: number;
}

// Procedural Studio Chrome & Cobalt Environment Map (PMREM)
function StudioEnvironment({ isDark }: { isDark: boolean }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(isDark ? 0x050d24 : 0xe0f2fe);

    const boxMatWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const boxMatCyan = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
    });
    const boxMatSky = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const boxMatRoyal = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0066ff : 0x0369a1,
    });

    // Top White Softbox
    const topStrip = new THREE.Mesh(new THREE.PlaneGeometry(24, 10), boxMatWhite);
    topStrip.position.set(0, 9, 5);
    topStrip.rotation.x = Math.PI / 2.6;
    envScene.add(topStrip);

    // Front Sky Blue Softbox
    const frontGlow = new THREE.Mesh(new THREE.PlaneGeometry(22, 16), boxMatSky);
    frontGlow.position.set(0, 1, 12);
    frontGlow.rotation.y = Math.PI;
    envScene.add(frontGlow);

    // Left Electric Cyan Reflector Panel
    const leftCyanPanel = new THREE.Mesh(new THREE.PlaneGeometry(14, 16), boxMatCyan);
    leftCyanPanel.position.set(-10, 2, 5);
    leftCyanPanel.rotation.y = Math.PI / 3;
    envScene.add(leftCyanPanel);

    // Right White Specular Strip
    const rightBrightPanel = new THREE.Mesh(new THREE.PlaneGeometry(14, 16), boxMatWhite);
    rightBrightPanel.position.set(11, -1, 6);
    rightBrightPanel.rotation.y = -Math.PI / 2.8;
    envScene.add(rightBrightPanel);

    // Bottom Royal Blue Fill Panel
    const bottomBluePanel = new THREE.Mesh(new THREE.PlaneGeometry(22, 10), boxMatRoyal);
    bottomBluePanel.position.set(0, -9, 4);
    bottomBluePanel.rotation.x = -Math.PI / 2.4;
    envScene.add(bottomBluePanel);

    const envRT = pmremGenerator.fromScene(envScene, 0.03);
    scene.environment = envRT.texture;

    pmremGenerator.dispose();
    return () => {
      envRT.dispose();
    };
  }, [gl, scene, isDark]);

  return null;
}

function CameraRig({
  chapter,
  mouse,
  isMobile,
  isTablet,
}: {
  chapter: number;
  mouse: { x: number; y: number };
  isMobile: boolean;
  isTablet: boolean;
}) {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Desktop camera targets for 8 chapters
  const desktopPositions = [
    new THREE.Vector3(0, 0, 4.3), // 00 Home
    new THREE.Vector3(0.04, -0.04, 4.25), // 01 Technology
    new THREE.Vector3(0.06, 0.04, 4.2), // 02 Services
    new THREE.Vector3(0.04, 0.0, 4.25), // 03 Solutions
    new THREE.Vector3(0.04, 0.06, 4.25), // 04 Process
    new THREE.Vector3(0.04, -0.04, 4.3), // 05 About
    new THREE.Vector3(0.06, 0.04, 4.25), // 06 Projects
    new THREE.Vector3(0.04, 0.04, 4.2), // 07 Contact
  ];

  // Tablet camera targets
  const tabletPositions = [
    new THREE.Vector3(0, 0, 4.45),
    new THREE.Vector3(0.02, 0.0, 4.4),
    new THREE.Vector3(0.02, 0.02, 4.35),
    new THREE.Vector3(0.02, 0.0, 4.4),
    new THREE.Vector3(0.02, 0.02, 4.4),
    new THREE.Vector3(0.02, 0.0, 4.45),
    new THREE.Vector3(0.02, 0.02, 4.4),
    new THREE.Vector3(0.02, 0.02, 4.35),
  ];

  // Mobile camera targets
  const mobilePositions = [
    new THREE.Vector3(0, 0, 4.75),
    new THREE.Vector3(0, 0.04, 4.7),
    new THREE.Vector3(0, 0.04, 4.7),
    new THREE.Vector3(0, 0.04, 4.7),
    new THREE.Vector3(0, 0.04, 4.7),
    new THREE.Vector3(0, 0.04, 4.75),
    new THREE.Vector3(0, 0.04, 4.7),
    new THREE.Vector3(0, 0.04, 4.7),
  ];

  useFrame((state) => {
    const list = isMobile ? mobilePositions : isTablet ? tabletPositions : desktopPositions;
    const targetPos = list[Math.min(chapter, list.length - 1)];

    const cx = targetPos.x + (isMobile ? 0 : mouse.x * (isTablet ? 0.07 : 0.12));
    const cy = targetPos.y + (isMobile ? 0 : mouse.y * (isTablet ? 0.05 : 0.08));
    const cz = targetPos.z;

    state.camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.05);

    const tx = isMobile ? 0 : mouse.x * 0.05;
    const ty = isMobile ? 0 : mouse.y * 0.05;
    cameraTarget.current.lerp(new THREE.Vector3(tx, ty, 0), 0.05);
    state.camera.lookAt(cameraTarget.current);
  });

  return null;
}

export default function CyberScene({ chapter }: CyberSceneProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const checkDimensions = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    checkDimensions();
    window.addEventListener("resize", checkDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("resize", checkDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500">
      {/* Volumetric Radial Aura framing the 3D AI Robot */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark
            ? "bg-[radial-gradient(circle_at_68%_48%,rgba(0,140,255,0.18)_0%,rgba(0,212,255,0.06)_34%,transparent_72%)]"
            : "bg-[radial-gradient(circle_at_68%_48%,rgba(0,102,255,0.1)_0%,rgba(56,189,248,0.06)_38%,transparent_75%)]"
        }`}
      />

      <Canvas
        camera={{
          position: [0, 0, isMobile ? 4.75 : isTablet ? 4.45 : 4.3],
          fov: isMobile ? 52 : isTablet ? 46 : 44,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
            : 1
        }
      >
        <color attach="background" args={[isDark ? "#030508" : "#f8fafc"]} />
        <fog attach="fog" args={[isDark ? "#030508" : "#f8fafc", 4, 12]} />

        {/* Studio Chrome Environment Map */}
        <StudioEnvironment isDark={isDark} />

        {/* Studio Metallic Lighting with Theme Support */}
        <ambientLight intensity={isDark ? 1.4 : 1.7} color={isDark ? "#e0f2fe" : "#ffffff"} />

        {/* Key Directional Light */}
        <directionalLight
          position={[5, 8, 12]}
          intensity={isDark ? 2.9 : 3.2}
          color="#ffffff"
        />

        {/* Front Sky Fill Light */}
        <directionalLight
          position={[-4, -2, 11]}
          intensity={isDark ? 1.85 : 1.5}
          color={isDark ? "#7dd3fc" : "#0284c7"}
        />

        {/* High-Energy Electric Cyan Specular Point Light */}
        <pointLight
          position={[5, 6, 9]}
          intensity={isDark ? 4.2 : 3.5}
          color={isDark ? "#00f0ff" : "#0284c7"}
          distance={48}
        />

        {/* Deep Royal Blue Fill Point Light */}
        <pointLight
          position={[-7, -5, 8]}
          intensity={isDark ? 3.8 : 2.5}
          color="#0066ff"
          distance={48}
        />

        {/* Back Metallic Rim Light */}
        <directionalLight
          position={[0, 6, -10]}
          intensity={isDark ? 2.0 : 1.6}
          color={isDark ? "#bae6fd" : "#cbd5e1"}
        />

        <Suspense fallback={<RobotFallback isMobile={isMobile} />}>
          <CameraRig
            chapter={chapter}
            mouse={mouse}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          {/* Real 3D AI Robot Character with Responsive Choreography */}
          <RobotCharacter
            chapter={chapter}
            mouse={mouse}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <CyberParticles
            count={isMobile ? 140 : isTablet ? 260 : 500}
            mouse={mouse}
          />
          <CyberGrid />
        </Suspense>
      </Canvas>

      {/* Atmospheric Vignette & Cyber Scanline Overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" />
    </div>
  );
}
