"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

interface RobotCharacterProps {
  chapter: number;
  mouse: { x: number; y: number };
  isMobile: boolean;
  isTablet?: boolean;
}

export function RobotCharacter({
  chapter,
  mouse,
  isMobile,
  isTablet = false,
}: RobotCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const holoPanelsRef = useRef<THREE.Group>(null);
  const haloRingsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scrollProgress = useRef(0);

  // Scroll detection state for Running Animation
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentActionRef = useRef<string>("idle");

  // Load 3D humanoid robot model
  const gltf = useGLTF("/robot.glb");

  // Clone scene so multiple mounts remain pure & reactive
  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(gltf.scene);
  }, [gltf.scene]);

  // Direct THREE.AnimationMixer on clonedScene
  const mixer = useMemo(() => new THREE.AnimationMixer(clonedScene), [clonedScene]);

  // Pre-bind all animation actions ('idle', 'run', 'agree', 'walk', etc.)
  const actions = useMemo(() => {
    const map: Record<string, THREE.AnimationAction> = {};
    if (gltf.animations) {
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip, clonedScene);
        action.setLoop(THREE.LoopRepeat, Infinity);
        map[clip.name] = action;
      });
    }
    return map;
  }, [mixer, gltf.animations, clonedScene]);

  // References to specific robot bones for procedural gestures & tracking
  const bonesRef = useRef<{
    head: THREE.Object3D | null;
    neck: THREE.Object3D | null;
    spine: THREE.Object3D | null;
    spine2: THREE.Object3D | null;
    leftArm: THREE.Object3D | null;
    rightArm: THREE.Object3D | null;
  }>({
    head: null,
    neck: null,
    spine: null,
    spine2: null,
    leftArm: null,
    rightArm: null,
  });

  // Apply premium metallic silver armor & graphite mechanical joints
  useEffect(() => {
    if (!clonedScene) return;

    const armorMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f1f5f9"),
      emissive: new THREE.Color("#07192f"),
      emissiveIntensity: 0.3,
      metalness: 0.88,
      roughness: 0.15,
      clearcoat: 0.98,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
    });

    const jointsMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#111827"),
      metalness: 0.95,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
    });

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = child as THREE.SkinnedMesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const matName = (mesh.material as THREE.Material)?.name || "";
        if (matName.includes("Joint") || matName.includes("joint")) {
          mesh.material = jointsMat;
        } else {
          mesh.material = armorMat;
        }
      }
    });

    // Cache bone references with correct bone names
    const headBone =
      clonedScene.getObjectByName("mixamorigHead") ||
      clonedScene.getObjectByName("mixamorig:Head") ||
      null;
    const neckBone =
      clonedScene.getObjectByName("mixamorigNeck") ||
      clonedScene.getObjectByName("mixamorig:Neck") ||
      null;
    const spineBone =
      clonedScene.getObjectByName("mixamorigSpine") ||
      clonedScene.getObjectByName("mixamorig:Spine") ||
      null;
    const spine2Bone =
      clonedScene.getObjectByName("mixamorigSpine2") ||
      clonedScene.getObjectByName("mixamorig:Spine2") ||
      null;
    const leftArmBone =
      clonedScene.getObjectByName("mixamorigLeftArm") ||
      clonedScene.getObjectByName("mixamorig:LeftArm") ||
      null;
    const rightArmBone =
      clonedScene.getObjectByName("mixamorigRightArm") ||
      clonedScene.getObjectByName("mixamorig:RightArm") ||
      null;

    bonesRef.current = {
      head: headBone,
      neck: neckBone,
      spine: spineBone,
      spine2: spine2Bone,
      leftArm: leftArmBone,
      rightArm: rightArmBone,
    };

    // Ensure arms are down at sides
    if (leftArmBone) {
      leftArmBone.rotation.set(0.075, -0.27, -1.125);
    }
    if (rightArmBone) {
      rightArmBone.rotation.set(-0.081, 0.056, 1.159);
    }
  }, [clonedScene]);

  // Initial animation: Start in breathing idle stance with arms down
  useEffect(() => {
    if (!actions["idle"]) return;

    actions["idle"].reset().fadeIn(0.2).play();
    currentActionRef.current = "idle";

    return () => {
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  // User Scroll & Wheel Listener to trigger RUNNING animation on scroll
  useEffect(() => {
    const triggerRun = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    window.addEventListener("wheel", triggerRun, { passive: true });
    window.addEventListener("touchmove", triggerRun, { passive: true });
    window.addEventListener("scroll", triggerRun, { passive: true });
    window.addEventListener("td-scroll-active", triggerRun);
    window.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"].includes(e.code)) {
        triggerRun();
      }
    });

    return () => {
      window.removeEventListener("wheel", triggerRun);
      window.removeEventListener("touchmove", triggerRun);
      window.removeEventListener("scroll", triggerRun);
      window.removeEventListener("td-scroll-active", triggerRun);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Also trigger running when chapter prop updates
  const prevChapterRef = useRef(chapter);
  useEffect(() => {
    if (chapter !== prevChapterRef.current) {
      prevChapterRef.current = chapter;
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1400);
    }
  }, [chapter]);

  // Orbiting Holographic Service Panels (shown in full body mode)
  const holoPlates = useMemo(() => {
    return [
      { label: "AI & AUTOMATION", color: "#00e5ff", angle: 0 },
      { label: "CUSTOM SOFTWARE", color: "#38bdf8", angle: (Math.PI * 2) / 3 },
      { label: "CLOUD & DEFENSE", color: "#0066ff", angle: (Math.PI * 4) / 3 },
    ];
  }, []);

  // Micro-Particles Swarm (adaptive count based on device)
  const particleCount = isMobile ? 120 : isTablet ? 200 : 350;
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [particleCount]);

  const particleMat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0x00d8ff,
      size: isMobile ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.65,
    });
  }, [isMobile]);

  // Scroll Choreography, Run Animation & Mouse Parallax
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. UPDATE THE ANIMATION MIXER DIRECTLY EVERY FRAME
    mixer.update(delta);

    // Smooth lerp scroll progress from 0 (HOME) to 1 (CONTACT)
    const targetProgress = Math.min(Math.max(chapter / 7, 0), 1);
    scrollProgress.current = THREE.MathUtils.lerp(
      scrollProgress.current,
      targetProgress,
      0.06
    );
    const sp = scrollProgress.current;

    // Crossfade between IDLE and RUN animations based on scroll activity:
    const isRunning = isScrollingRef.current;
    const targetActionName = isRunning && actions["run"] ? "run" : "idle";

    if (actions && targetActionName !== currentActionRef.current) {
      const fromAction = actions[currentActionRef.current];
      const toAction = actions[targetActionName];

      if (toAction) {
        toAction.reset().fadeIn(0.18).play();
        if (targetActionName === "run") {
          toAction.timeScale = 1.45; // Energetic sprint
        } else {
          toAction.timeScale = 1.0;
        }
      }
      if (fromAction) {
        fromAction.fadeOut(0.22);
      }
      currentActionRef.current = targetActionName;
    }

    // =========================================================================
    // RESPONSIVE 3-STAGE CHOREOGRAPHY ACROSS ALL BREAKPOINTS
    // =========================================================================
    const pullBackT = THREE.MathUtils.smoothstep(sp, 0.0, 0.14);

    if (groupRef.current) {
      // Responsive Stage 1 (Face Close-Up)
      const faceScale = isMobile ? 1.72 : isTablet ? 1.95 : 2.15;
      const faceY = isMobile ? -2.48 : isTablet ? -2.8 : -3.08;
      const faceX = isMobile ? 0 : isTablet ? 0.28 : 0.35;
      const faceZ = isMobile ? -0.1 : isTablet ? 0.05 : 0.18;

      // Responsive Stage 2 (Full Body Head-to-Toe)
      const bodyScale = isMobile ? 0.98 : isTablet ? 1.12 : 1.22;
      const bodyY = isMobile ? -0.92 : isTablet ? -0.98 : -1.05;
      const bodyX = isMobile ? 0 : isTablet ? 0.35 : 0.42;
      const bodyZ = isMobile ? -0.2 : isTablet ? -0.05 : 0.05;

      // Smoothly interpolate between Face Mode and Full Body Mode:
      const targetScale = THREE.MathUtils.lerp(faceScale, bodyScale, pullBackT);
      const targetY = THREE.MathUtils.lerp(faceY, bodyY, pullBackT);
      const targetX = THREE.MathUtils.lerp(faceX, bodyX, pullBackT);
      const targetZ = THREE.MathUtils.lerp(faceZ, bodyZ, pullBackT);

      // Rotations:
      let targetRotY = THREE.MathUtils.lerp(-0.12, -0.16, pullBackT);
      let targetRotX = isRunning ? 0.28 : 0.02;

      if (chapter === 2) {
        targetRotY = 0.14; // glance towards services directory
      } else if (chapter === 7) {
        targetRotY = 0.0; // facing viewer in contact chapter
      }

      // Dynamic stride bounce when running, calm breathing when idle
      const strideBounce = isRunning
        ? Math.sin(time * 11.0) * 0.045
        : Math.sin(time * 1.2) * 0.02;
      const strideSway = isRunning ? Math.cos(time * 5.5) * 0.03 : 0;

      const mouseYaw = (isMobile ? 0 : mouse.x) * (isTablet ? 0.08 : 0.14);
      const mousePitch = (isMobile ? 0 : -mouse.y) * (isTablet ? 0.06 : 0.1);

      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX + strideSway,
        0.08
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY + strideBounce,
        0.08
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetZ,
        0.08
      );

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY + mouseYaw,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX + mousePitch,
        0.08
      );

      groupRef.current.scale.setScalar(targetScale);
    }

    // Procedural Head Cursor Tracking (looking at user in real time):
    if (bonesRef.current.head && !isMobile) {
      const sensitivityY = pullBackT < 0.5 ? 0.35 : 0.22;
      const sensitivityX = pullBackT < 0.5 ? 0.22 : 0.14;

      const headTargetY = mouse.x * sensitivityY + (chapter === 2 ? 0.15 : 0);
      const headTargetX = -mouse.y * sensitivityX;

      bonesRef.current.head.rotation.y += (headTargetY - bonesRef.current.head.rotation.y) * 0.12;
      bonesRef.current.head.rotation.x += (headTargetX - bonesRef.current.head.rotation.x) * 0.12;
    }

    // Holographic service plates orbit in full body mode:
    if (holoPanelsRef.current) {
      holoPanelsRef.current.rotation.y = time * 0.16;
      const holoScale = chapter === 2 || chapter === 3 ? (isMobile ? 0.8 : 1.05) : 0.72;
      holoPanelsRef.current.scale.lerp(
        new THREE.Vector3(holoScale, holoScale, holoScale),
        0.08
      );
    }

    // Halo Rings rotation:
    if (haloRingsRef.current) {
      haloRingsRef.current.rotation.z = -time * 0.12;
      haloRingsRef.current.rotation.y = Math.cos(time * 0.4) * 0.18;
    }

    // Micro-particles stream faster when running to create velocity sensation:
    if (particlesRef.current) {
      const pSpeed = isRunning ? 2.8 : 0.06;
      particlesRef.current.rotation.y += delta * pSpeed;
    }
  });

  const isPullBackActive = chapter > 0;

  return (
    <group ref={groupRef}>
      {/* 3D Humanoid Robot Skinned Mesh */}
      <primitive object={clonedScene} />

      {/* Orbiting Holographic Service Panels (shown in Full Body Mode) */}
      <group
        ref={holoPanelsRef}
        position={[0, 1.15, 0]}
        visible={isPullBackActive}
      >
        {holoPlates.map((plate, idx) => {
          const radius = 1.35;
          const x = Math.cos(plate.angle) * radius;
          const z = Math.sin(plate.angle) * radius;
          return (
            <group
              key={idx}
              position={[x, idx === 1 ? 0.15 : idx === 2 ? -0.15 : 0, z]}
              rotation={[0, -plate.angle + Math.PI / 2, 0]}
            >
              {/* Glassmorphic Panel Plate */}
              <mesh>
                <boxGeometry args={[0.38, 0.22, 0.012]} />
                <meshPhysicalMaterial
                  color="#060f22"
                  metalness={0.75}
                  roughness={0.2}
                  transparent
                  opacity={0.8}
                  clearcoat={1.0}
                />
              </mesh>
              {/* Glowing Wire Border */}
              <mesh scale={1.04}>
                <boxGeometry args={[0.38, 0.22, 0.012]} />
                <meshBasicMaterial
                  color={plate.color}
                  wireframe
                  transparent
                  opacity={0.7}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Outer Holographic Energy Ring Halo centered around chest */}
      <group
        ref={haloRingsRef}
        position={[0, 1.15, -0.15]}
        visible={isPullBackActive}
      >
        <mesh>
          <torusGeometry args={[1.5, 0.008, 16, 80]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.65, 0.006, 16, 80]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Micro-particle Constellation */}
      <points
        ref={particlesRef}
        position={[0, 1.15, 0]}
        geometry={particleGeo}
        material={particleMat}
      />

      {/* Dedicated Face & Body Lighting */}
      <pointLight
        position={[0, 1.52, 0.75]}
        color="#00f0ff"
        intensity={3.8}
        distance={5}
        decay={2}
      />
      <pointLight
        position={[mouse.x * 1.5, mouse.y * 1.5 + 1.48, 1.1]}
        color="#ffffff"
        intensity={2.6}
        distance={5}
        decay={2}
      />
      <pointLight
        position={[0, 1.15, 0.35]}
        color="#00e5ff"
        intensity={2.8}
        distance={4}
        decay={2}
      />
      <directionalLight
        position={[0, 2.5, -2.0]}
        color="#7dd3fc"
        intensity={2.2}
      />
    </group>
  );
}

useGLTF.preload("/robot.glb");
