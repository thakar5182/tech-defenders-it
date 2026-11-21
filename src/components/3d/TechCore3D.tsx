"use client";
import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechCore3DProps {
  chapter: number;
  mouse: { x: number; y: number };
  isMobile: boolean;
}

// Generate metallic multi-stop gradient textures matching the official TD emblem
function createMetallicGradientTexture(stops: [number, string][]) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 512, 512, 0);
  stops.forEach(([offset, color]) => grad.addColorStop(offset, color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

// Normalize Planar UVs on ExtrudeGeometry so gradient sweeps cleanly across emblem face
function applyPlanarLogoUVs(geo: THREE.BufferGeometry) {
  const pos = geo.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    uvs[i * 2] = THREE.MathUtils.clamp((x + 2.7) / 5.4, 0, 1);
    uvs[i * 2 + 1] = THREE.MathUtils.clamp((y + 2.7) / 5.4, 0, 1);
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
}

// Build dual-tone tapered crescent arcs (Outer Silver-Chrome + Inner Royal-Blue Bevel)
function createTaperedCrescentArc(
  startDeg: number,
  endDeg: number,
  outerR: number,
  innerR: number,
  zPos: number,
  silverMat: THREE.Material,
  blueMat: THREE.Material
) {
  const startRad = THREE.MathUtils.degToRad(startDeg);
  const endRad = THREE.MathUtils.degToRad(endDeg);
  const steps = 48;

  // Outer Silver-Chrome Crescent Shape
  const outerShape = new THREE.Shape();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = THREE.MathUtils.lerp(startRad, endRad, t);
    const taper = Math.sin(t * Math.PI);
    const r = THREE.MathUtils.lerp(innerR, outerR, 0.25 + 0.75 * taper);
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) outerShape.moveTo(x, y);
    else outerShape.lineTo(x, y);
  }
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const angle = THREE.MathUtils.lerp(startRad, endRad, t);
    const x = Math.cos(angle) * innerR;
    const y = Math.sin(angle) * innerR;
    outerShape.lineTo(x, y);
  }
  outerShape.closePath();

  // Inner Royal-Blue Bevel Shape
  const innerShape = new THREE.Shape();
  const midR = innerR - 0.075;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = THREE.MathUtils.lerp(startRad, endRad, t);
    const x = Math.cos(angle) * (innerR + 0.01);
    const y = Math.sin(angle) * (innerR + 0.01);
    if (i === 0) innerShape.moveTo(x, y);
    else innerShape.lineTo(x, y);
  }
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const angle = THREE.MathUtils.lerp(startRad, endRad, t);
    const taper = Math.sin(t * Math.PI);
    const r = THREE.MathUtils.lerp(innerR, midR, taper);
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    innerShape.lineTo(x, y);
  }
  innerShape.closePath();

  const arcExtrude = {
    depth: 0.24,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  };

  const outerGeo = new THREE.ExtrudeGeometry(outerShape, arcExtrude);
  outerGeo.computeVertexNormals();
  const outerMesh = new THREE.Mesh(outerGeo, silverMat);
  outerMesh.position.z = zPos - arcExtrude.depth / 2;

  const innerGeo = new THREE.ExtrudeGeometry(innerShape, {
    ...arcExtrude,
    depth: 0.28,
  });
  innerGeo.computeVertexNormals();
  const innerMesh = new THREE.Mesh(innerGeo, blueMat);
  innerMesh.position.z = zPos + 0.02 - 0.28 / 2;

  const arcGroup = new THREE.Group();
  arcGroup.add(outerMesh, innerMesh);
  return arcGroup;
}

export function TechCore3D({ chapter, mouse, isMobile }: TechCore3DProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const arcsGroupRef = useRef<THREE.Group>(null);
  const letterTGroupRef = useRef<THREE.Group>(null);
  const letterDGroupRef = useRef<THREE.Group>(null);
  const slashBladeGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scrollProgress = useRef(0);

  // 1. Textures & Materials Matching Brand UI/UX
  const tdFaceGradientTex = useMemo(() => {
    return createMetallicGradientTexture([
      [0.0, "#0038b8"],
      [0.35, "#0066ff"],
      [0.68, "#00aaff"],
      [0.88, "#38e8ff"],
      [1.0, "#0055ee"],
    ]);
  }, []);

  const slashGradientTex = useMemo(() => {
    return createMetallicGradientTexture([
      [0.0, "#0055ff"],
      [0.35, "#0099ff"],
      [0.68, "#00e5ff"],
      [0.88, "#99f6ff"],
      [1.0, "#00d8ff"],
    ]);
  }, []);

  const cobaltChromeMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: tdFaceGradientTex || undefined,
      color: 0xffffff,
      emissive: new THREE.Color(0x0044cc),
      emissiveIntensity: 0.42,
      metalness: 0.75,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });
  }, [tdFaceGradientTex]);

  const electricBladeMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: slashGradientTex || undefined,
      color: 0xffffff,
      emissive: new THREE.Color(0x0099ff),
      emissiveIntensity: 0.55,
      metalness: 0.7,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
    });
  }, [slashGradientTex]);

  const silverChromeMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      emissive: new THREE.Color(0x334155),
      emissiveIntensity: 0.25,
      metalness: 0.88,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
  }, []);

  const innerArcBlueMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x0077ff,
      emissive: new THREE.Color(0x0044dd),
      emissiveIntensity: 0.52,
      metalness: 0.78,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
  }, []);

  const edgeHighlightMat = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.5,
    });
  }, []);

  // 2. Procedural Geometries: Slanted 'T', Lightning Slash, and 'D' Bowl
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.065,
      bevelThickness: 0.065,
    }),
    []
  );

  const { geoT, geoSlash, geoD, geoEdgesT, geoEdgesSlash, geoEdgesD } = useMemo(() => {
    // --- Slanted 'T' ---
    const shapeT = new THREE.Shape();
    shapeT.moveTo(-2.45, 0.42);
    shapeT.lineTo(-1.82, 1.05);
    shapeT.lineTo(0.42, 1.05);
    shapeT.lineTo(0.05, 0.42);
    shapeT.lineTo(-0.78, 0.42);
    shapeT.lineTo(-1.38, -1.55);
    shapeT.lineTo(-1.86, -1.12);
    shapeT.lineTo(-1.42, 0.42);
    shapeT.closePath();

    const gT = new THREE.ExtrudeGeometry(shapeT, extrudeSettings);
    applyPlanarLogoUVs(gT);
    gT.computeVertexNormals();
    const eT = new THREE.EdgesGeometry(gT, 32);

    // --- Diagonal Lightning Blade ---
    const shapeSlash = new THREE.Shape();
    shapeSlash.moveTo(-2.08, -2.55);
    shapeSlash.lineTo(-0.55, -0.82);
    shapeSlash.lineTo(0.06, -0.35);
    shapeSlash.lineTo(-0.52, -1.18);
    shapeSlash.lineTo(-1.12, -1.72);
    shapeSlash.lineTo(1.96, 2.38);
    shapeSlash.lineTo(0.28, 0.62);
    shapeSlash.lineTo(-0.58, -0.25);
    shapeSlash.lineTo(0.18, -0.18);
    shapeSlash.closePath();

    const gSlash = new THREE.ExtrudeGeometry(shapeSlash, {
      ...extrudeSettings,
      depth: 0.48,
      bevelSize: 0.055,
      bevelThickness: 0.055,
    });
    applyPlanarLogoUVs(gSlash);
    gSlash.computeVertexNormals();
    const eSlash = new THREE.EdgesGeometry(gSlash, 32);

    // --- Sweeping 'D' Bowl ---
    const shapeD = new THREE.Shape();
    shapeD.moveTo(0.22, 0.48);
    shapeD.bezierCurveTo(1.25, 0.88, 2.25, 0.35, 2.22, -0.58);
    shapeD.bezierCurveTo(2.18, -1.52, 1.15, -2.02, -0.58, -1.75);
    shapeD.lineTo(-0.88, -1.32);
    shapeD.bezierCurveTo(0.68, -1.45, 1.56, -1.08, 1.58, -0.45);
    shapeD.bezierCurveTo(1.60, 0.14, 0.92, 0.38, 0.04, 0.16);
    shapeD.closePath();

    const gD = new THREE.ExtrudeGeometry(shapeD, extrudeSettings);
    applyPlanarLogoUVs(gD);
    gD.computeVertexNormals();
    const eD = new THREE.EdgesGeometry(gD, 32);

    return {
      geoT: gT,
      geoSlash: gSlash,
      geoD: gD,
      geoEdgesT: eT,
      geoEdgesSlash: eSlash,
      geoEdgesD: eD,
    };
  }, [extrudeSettings]);

  // 3. Four Dual-Tone Orbital Crescent Arcs Matching Emblem
  const arcs = useMemo(() => {
    return [
      createTaperedCrescentArc(52, 134, 2.52, 2.28, -0.08, silverChromeMat, innerArcBlueMat),
      createTaperedCrescentArc(-46, 36, 2.52, 2.28, -0.08, silverChromeMat, innerArcBlueMat),
      createTaperedCrescentArc(234, 306, 2.5, 2.26, -0.08, silverChromeMat, innerArcBlueMat),
      createTaperedCrescentArc(152, 218, 2.5, 2.26, -0.08, silverChromeMat, innerArcBlueMat),
    ];
  }, [silverChromeMat, innerArcBlueMat]);

  // 4. Surrounding Micro-Particle Swarm
  const particleGeo = useMemo(() => {
    const count = 100;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.8 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const particleMat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0x00d8ff,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
    });
  }, []);

  // 5. Scroll-Driven Choreography & Dynamic Exploded View Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const targetProgress = Math.min(Math.max(chapter / 7, 0), 1);
    scrollProgress.current = THREE.MathUtils.lerp(
      scrollProgress.current,
      targetProgress,
      0.06
    );

    const sp = scrollProgress.current;

    // Exploded Z-layer factor driven by chapter scroll transition
    const explodeFactor = Math.sin(sp * Math.PI);

    // Apply exploded layer Z-depth separation
    if (arcsGroupRef.current) {
      arcsGroupRef.current.position.z = -0.55 * explodeFactor;
      // Counter-rotation of outer crescent arcs during scroll
      arcsGroupRef.current.rotation.z = sp * Math.PI * 0.45;
    }
    if (letterDGroupRef.current) {
      letterDGroupRef.current.position.z = -0.15 * explodeFactor;
    }
    if (letterTGroupRef.current) {
      letterTGroupRef.current.position.z = 0.25 * explodeFactor;
    }
    if (slashBladeGroupRef.current) {
      slashBladeGroupRef.current.position.z = 0.72 * explodeFactor;
    }

    if (masterGroupRef.current) {
      // Rotation choreography: 360-degree rotation across chapters + idle float + mouse parallax
      const idleYaw = Math.sin(time * 0.65) * 0.16;
      const idlePitch = Math.cos(time * 0.5) * 0.08;
      const mouseYaw = (isMobile ? 0 : mouse.x) * 0.24;
      const mousePitch = (isMobile ? 0 : -mouse.y) * 0.18;

      masterGroupRef.current.rotation.y = sp * Math.PI * 2 + idleYaw + mouseYaw;
      masterGroupRef.current.rotation.x =
        Math.sin(sp * Math.PI) * 0.24 + idlePitch + mousePitch;
      masterGroupRef.current.position.y =
        (isMobile ? 0.12 : 0.02) + Math.sin(time * 1.1) * 0.06;

      // Spatial placement:
      // Desktop: Anchored elegantly on the right half (x: ~1.36) leaving left 55% open for UI
      // Mobile: Centered gracefully behind typography
      const targetX = isMobile ? 0 : 1.36;
      const targetZ = isMobile ? -0.7 : 0.0;
      const targetScale = isMobile ? 0.3 : 0.42;

      masterGroupRef.current.position.x = THREE.MathUtils.lerp(
        masterGroupRef.current.position.x,
        targetX,
        0.08
      );
      masterGroupRef.current.position.z = THREE.MathUtils.lerp(
        masterGroupRef.current.position.z,
        targetZ,
        0.08
      );
      masterGroupRef.current.scale.setScalar(targetScale);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05 + sp * 0.8;
      particlesRef.current.rotation.x = time * 0.025;
    }
  });

  return (
    <group ref={masterGroupRef}>
      {/* 4 Outer Dual-Tone Crescent Arcs */}
      <group ref={arcsGroupRef}>
        {arcs.map((arc, i) => (
          <primitive key={i} object={arc} />
        ))}
      </group>

      {/* Sweeping 'D' Bowl */}
      <group ref={letterDGroupRef}>
        <mesh
          geometry={geoD}
          material={cobaltChromeMat}
          position={[0, 0, -0.02 - extrudeSettings.depth / 2]}
          castShadow
          receiveShadow
        />
        <lineSegments
          geometry={geoEdgesD}
          material={edgeHighlightMat}
          position={[0, 0, -0.02 - extrudeSettings.depth / 2]}
        />
      </group>

      {/* Bold Slanted 'T' */}
      <group ref={letterTGroupRef}>
        <mesh
          geometry={geoT}
          material={cobaltChromeMat}
          position={[0, 0, 0.04 - extrudeSettings.depth / 2]}
          castShadow
          receiveShadow
        />
        <lineSegments
          geometry={geoEdgesT}
          material={edgeHighlightMat}
          position={[0, 0, 0.04 - extrudeSettings.depth / 2]}
        />
      </group>

      {/* Razor-Sharp Diagonal Lightning Slash Blade */}
      <group ref={slashBladeGroupRef}>
        <mesh
          geometry={geoSlash}
          material={electricBladeMat}
          position={[0, 0, 0.12 - 0.48 / 2]}
          castShadow
          receiveShadow
        />
        <lineSegments
          geometry={geoEdgesSlash}
          material={edgeHighlightMat}
          position={[0, 0, 0.12 - 0.48 / 2]}
        />
      </group>

      {/* Surrounding Ambient Energy Micro-Particles */}
      <points ref={particlesRef} geometry={particleGeo} material={particleMat} />

      {/* Specular Chasing Point Lights on Emblem */}
      <pointLight position={[0, 0, 2.2]} color="#00e5ff" intensity={2.2} distance={7} decay={2} />
      <pointLight
        position={[mouse.x * 2.2, mouse.y * 2.2, 2.8]}
        color="#38bdf8"
        intensity={1.8}
        distance={6}
        decay={2}
      />
    </group>
  );
}
