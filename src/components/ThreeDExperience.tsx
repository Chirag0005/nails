import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye } from 'lucide-react';

interface FinishOption {
  id: string;
  name: string;
  color: number;
  metalness: number;
  roughness: number;
  transmission: number;
  thickness: number;
  ior: number;
  clearcoat: number;
  clearcoatRoughness: number;
  sheen: number;
  sheenColor: number;
  attenuationColor: number;
  attenuationDistance: number;
  gemColor: number;
  gemTransmission: number;
  gemRoughness: number;
  description: string;
}

const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'rose-quartz',
    name: 'Glazed Rose Quartz',
    color: 0xF6D2D8,
    metalness: 0.04,
    roughness: 0.02,
    transmission: 0.85,
    thickness: 2.4,
    ior: 1.54,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    sheen: 0.7,
    sheenColor: 0xFDE3EA,
    attenuationColor: 0xEB7990,
    attenuationDistance: 1.4,
    gemColor: 0xFFFFFF,
    gemTransmission: 0.95,
    gemRoughness: 0.01,
    description: 'Translucent blush jelly gel with high optical transmission & glass luster.'
  },
  {
    id: 'burgundy-noir',
    name: 'Burgundy Haute Lacquer',
    color: 0x380612,
    metalness: 0.12,
    roughness: 0.01,
    transmission: 0.0,
    thickness: 0.5,
    ior: 1.52,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    sheen: 1.0,
    sheenColor: 0x941B3B,
    attenuationColor: 0x380612,
    attenuationDistance: 0.5,
    gemColor: 0xE6CA85,
    gemTransmission: 0.85,
    gemRoughness: 0.02,
    description: 'Vampy deep red with mirror-like dark optical reflections & crimson sheen.'
  },
  {
    id: 'champagne-chrome',
    name: 'Liquid Champagne Chrome',
    color: 0xD8B575,
    metalness: 0.96,
    roughness: 0.08,
    transmission: 0.0,
    thickness: 0.2,
    ior: 2.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    sheen: 0.9,
    sheenColor: 0xFFECC4,
    attenuationColor: 0xD8B575,
    attenuationDistance: 0.2,
    gemColor: 0x1A1014,
    gemTransmission: 0.1,
    gemRoughness: 0.03,
    description: 'Poured liquid gold metallic mirror sheen reflecting ambient studio lights.'
  },
  {
    id: 'opal-pearl',
    name: 'Opal Pearl Glaze',
    color: 0xF7F2E8,
    metalness: 0.28,
    roughness: 0.05,
    transmission: 0.45,
    thickness: 1.8,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    sheen: 1.0,
    sheenColor: 0xF2C6D8,
    attenuationColor: 0xF5E6CE,
    attenuationDistance: 1.5,
    gemColor: 0xFFFFFF,
    gemTransmission: 0.7,
    gemRoughness: 0.02,
    description: 'Luminous multi-tonal white with soft champagne and rose prismatic scatter.'
  }
];

interface ThreeDExperienceProps {
  onOpenBooking: () => void;
}

export const ThreeDExperience: React.FC<ThreeDExperienceProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISH_OPTIONS[0]);
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  // Three.js object references for dynamic updates
  const nailMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const gemMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const petalMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const sculptureGroupRef = useRef<THREE.Group | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: slightly tilted down for luxury perspective
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.8);

    // 3. WebGL Renderer with High-Precision Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Main Sculpture Group
    const rootSculpture = new THREE.Group();
    // Tilt whole sculpture at an artful 20-degree editorial angle
    rootSculpture.rotation.x = 0.22;
    rootSculpture.rotation.z = -0.15;
    sculptureGroupRef.current = rootSculpture;
    scene.add(rootSculpture);

    // ----------------------------------------------------
    // 5. ANATOMICAL LUXURY NAIL GEOMETRY CREATION
    // Constructing a genuine sculpted almond-stiletto nail with:
    // - Natural C-curve (transverse arch)
    // - Smooth apex arch (highest at upper 35%)
    // - Cuticle bed contour
    // - Tapered slender almond tip
    // - Double-sided solid volume with beveled edges
    // ----------------------------------------------------
    const uSegments = 40; // Transverse (width)
    const vSegments = 60; // Longitudinal (length)
    const nailPositions: number[] = [];
    const nailIndices: number[] = [];

    // Helper to evaluate nail surface point (u in [-1, 1], v in [0, 1])
    const evalNailSurface = (u: number, v: number, thicknessOffset: number) => {
      // v goes from 0 (cuticle base) to 1 (almond tip)
      const length = 4.2;
      const y = (v - 0.42) * length;

      // Width profile:
      // Cuticle base: width starts rounded at ~0.8
      // Mid-plate / Apex (v ~ 0.35): expands to max width ~1.1
      // Free edge toward tip (v > 0.45): tapers smoothly to almond tip ~0.15
      let halfWidth = 0.85;
      if (v < 0.35) {
        halfWidth = 0.72 + 0.38 * Math.sin((v / 0.35) * (Math.PI / 2));
      } else {
        const t = (v - 0.35) / 0.65;
        // Smooth cubic taper to delicate tip
        halfWidth = 1.1 * Math.cos(t * (Math.PI / 2) * 0.92) + 0.08 * (1 - t);
      }

      // X coordinate across transverse arch
      const x = u * halfWidth;

      // C-Curve (transverse arch depth): highest at center (u = 0), curves down at lateral side walls
      const cCurveDepth = 0.42 * (1.0 - (1 - v * 0.4) * 0.15);
      const zTransverse = Math.cos((u * Math.PI) / 2) * cCurveDepth;

      // Apex arch (longitudinal curve):
      // Highest point at v = 0.35, gentle slope down to cuticle, elegant arch down to free edge tip
      let zLongitudinal = 0;
      if (v < 0.35) {
        zLongitudinal = 0.35 * Math.sin((v / 0.35) * (Math.PI / 2));
      } else {
        const t = (v - 0.35) / 0.65;
        zLongitudinal = 0.35 * Math.cos(t * (Math.PI / 2) * 0.85);
      }

      // Natural forward downward curve toward tip
      const tipDroop = v > 0.5 ? Math.pow(v - 0.5, 2) * 0.4 : 0;

      const z = zTransverse + zLongitudinal - tipDroop + thicknessOffset;
      return new THREE.Vector3(x, y, z);
    };

    // Build front (top) face grid
    for (let j = 0; j <= vSegments; j++) {
      const v = j / vSegments;
      for (let i = 0; i <= uSegments; i++) {
        const u = (i / uSegments) * 2 - 1; // from -1 to 1
        const p = evalNailSurface(u, v, 0.06);
        nailPositions.push(p.x, p.y, p.z);
      }
    }

    // Build back (underside) face grid
    const frontVertexCount = (uSegments + 1) * (vSegments + 1);
    for (let j = 0; j <= vSegments; j++) {
      const v = j / vSegments;
      for (let i = 0; i <= uSegments; i++) {
        const u = (i / uSegments) * 2 - 1;
        const p = evalNailSurface(u, v, -0.05); // slight internal offset
        nailPositions.push(p.x, p.y, p.z);
      }
    }

    // Indices for front surface
    for (let j = 0; j < vSegments; j++) {
      for (let i = 0; i < uSegments; i++) {
        const a = j * (uSegments + 1) + i;
        const b = a + 1;
        const c = a + (uSegments + 1);
        const d = c + 1;
        nailIndices.push(a, b, c);
        nailIndices.push(b, d, c);
      }
    }

    // Indices for back surface (reversed winding)
    for (let j = 0; j < vSegments; j++) {
      for (let i = 0; i < uSegments; i++) {
        const a = frontVertexCount + j * (uSegments + 1) + i;
        const b = a + 1;
        const c = a + (uSegments + 1);
        const d = c + 1;
        nailIndices.push(a, c, b);
        nailIndices.push(b, c, d);
      }
    }

    // Stitch lateral edges (left edge u = 0, right edge u = uSegments)
    for (let j = 0; j < vSegments; j++) {
      // Left edge (i = 0)
      const topA = j * (uSegments + 1);
      const topB = (j + 1) * (uSegments + 1);
      const botA = frontVertexCount + topA;
      const botB = frontVertexCount + topB;
      nailIndices.push(topA, botA, topB);
      nailIndices.push(topB, botA, botB);

      // Right edge (i = uSegments)
      const rTopA = j * (uSegments + 1) + uSegments;
      const rTopB = (j + 1) * (uSegments + 1) + uSegments;
      const rBotA = frontVertexCount + rTopA;
      const rBotB = frontVertexCount + rTopB;
      nailIndices.push(rTopA, rTopB, rBotA);
      nailIndices.push(rTopB, rBotB, rBotA);
    }

    const nailGeometry = new THREE.BufferGeometry();
    nailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nailPositions, 3));
    nailGeometry.setIndex(nailIndices);
    nailGeometry.computeVertexNormals();

    // Primary Nail Physical Material
    const nailPhysicalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedFinish.color),
      metalness: selectedFinish.metalness,
      roughness: selectedFinish.roughness,
      transmission: selectedFinish.transmission,
      thickness: selectedFinish.thickness,
      ior: selectedFinish.ior,
      clearcoat: selectedFinish.clearcoat,
      clearcoatRoughness: selectedFinish.clearcoatRoughness,
      sheen: selectedFinish.sheen,
      sheenColor: new THREE.Color(selectedFinish.sheenColor),
      attenuationColor: new THREE.Color(selectedFinish.attenuationColor),
      attenuationDistance: selectedFinish.attenuationDistance,
      specularColor: new THREE.Color(0xFFFFFF),
      reflectivity: 0.95,
      side: THREE.DoubleSide
    });
    nailMaterialRef.current = nailPhysicalMat;

    const nailMesh = new THREE.Mesh(nailGeometry, nailPhysicalMat);
    rootSculpture.add(nailMesh);

    // ----------------------------------------------------
    // 6. HAUTE ARTISTRY EMBELLISHMENTS
    // A. 24K Brushed Champagne Gold Cuticle Filigree Arch
    // B. Bezel-set Solitaire Brilliant-Cut Diamond / Crystal
    // C. Micro Freshwater Pearls
    // D. 3D Sculpted Translucent Petal Relief Accents
    // ----------------------------------------------------

    // A. Cuticle Crescent Filigree Arch
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.92,
      roughness: 0.18
    });

    const cuticleCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.68, -1.65, 0.18),
      new THREE.Vector3(-0.35, -1.82, 0.42),
      new THREE.Vector3(0.35, -1.82, 0.42),
      new THREE.Vector3(0.68, -1.65, 0.18)
    );
    const archGeo = new THREE.TubeGeometry(cuticleCurve, 32, 0.035, 12, false);
    const archMesh = new THREE.Mesh(archGeo, goldMat);
    rootSculpture.add(archMesh);

    // Micro gold caviar beads along the cuticle arch
    const caviarCount = 14;
    const caviarGeo = new THREE.SphereGeometry(0.04, 12, 12);
    for (let i = 0; i < caviarCount; i++) {
      const t = i / (caviarCount - 1);
      const pt = cuticleCurve.getPoint(t);
      const caviarMesh = new THREE.Mesh(caviarGeo, goldMat);
      caviarMesh.position.copy(pt);
      rootSculpture.add(caviarMesh);
    }

    // B. Brilliant-Cut Solitaire Crystal Gemstone at Apex (v ~ 0.35)
    // Multidimensional faceted gem
    const gemGeo = new THREE.OctahedronGeometry(0.24, 1);
    gemGeo.scale(1.2, 1.2, 0.7);

    const gemMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedFinish.gemColor),
      transmission: selectedFinish.gemTransmission,
      roughness: selectedFinish.gemRoughness,
      metalness: selectedFinish.id === 'champagne-chrome' ? 0.8 : 0.05,
      ior: 2.4, // Diamond dispersion index
      thickness: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 1.0
    });
    gemMaterialRef.current = gemMat;

    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, -0.25, 0.82);
    gemMesh.rotation.z = Math.PI / 4;
    rootSculpture.add(gemMesh);

    // Champagne gold 4-prong bezel claws holding the gemstone
    const prongGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.28, 8);
    const prongPositions = [
      { x: -0.22, y: -0.05, z: 0.75, rx: 0.2, ry: 0, rz: 0.3 },
      { x: 0.22, y: -0.05, z: 0.75, rx: 0.2, ry: 0, rz: -0.3 },
      { x: -0.22, y: -0.45, z: 0.75, rx: -0.2, ry: 0, rz: 0.3 },
      { x: 0.22, y: -0.45, z: 0.75, rx: -0.2, ry: 0, rz: -0.3 }
    ];
    prongPositions.forEach(p => {
      const prong = new THREE.Mesh(prongGeo, goldMat);
      prong.position.set(p.x, p.y, p.z);
      prong.rotation.set(p.rx, p.ry, p.rz);
      rootSculpture.add(prong);
    });

    // C. Micro Freshwater Pearls flanking the gemstone
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xFDFBF7,
      roughness: 0.08,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xF5D6E2)
    });
    const pearlGeo = new THREE.SphereGeometry(0.09, 20, 20);
    pearlGeo.scale(1, 1, 0.8);

    const leftPearl = new THREE.Mesh(pearlGeo, pearlMat);
    leftPearl.position.set(-0.35, -0.25, 0.68);
    rootSculpture.add(leftPearl);

    const rightPearl = new THREE.Mesh(pearlGeo, pearlMat);
    rightPearl.position.set(0.35, -0.25, 0.68);
    rootSculpture.add(rightPearl);

    // D. 3D Sculpted Organic Petal Relief Accents (layering over nail plate)
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.quadraticCurveTo(0.25, 0.35, 0, 0.65);
    petalShape.quadraticCurveTo(-0.25, 0.35, 0, 0);

    const petalGeo = new THREE.ExtrudeGeometry(petalShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });

    const petalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedFinish.color),
      transmission: 0.75,
      roughness: 0.08,
      thickness: 0.8,
      clearcoat: 0.9,
      sheen: 0.5,
      sheenColor: new THREE.Color(0xFDF0F4)
    });
    petalMaterialRef.current = petalMat;

    // Petal 1
    const petal1 = new THREE.Mesh(petalGeo, petalMat);
    petal1.position.set(0.12, 0.25, 0.65);
    petal1.rotation.set(0.2, -0.3, 0.5);
    petal1.scale.set(0.7, 0.7, 0.7);
    rootSculpture.add(petal1);

    // Petal 2
    const petal2 = new THREE.Mesh(petalGeo, petalMat);
    petal2.position.set(-0.15, 0.35, 0.62);
    petal2.rotation.set(0.1, 0.35, -0.6);
    petal2.scale.set(0.65, 0.65, 0.65);
    rootSculpture.add(petal2);

    // ----------------------------------------------------
    // 7. ARCHITECTURAL EXHIBITION PEDESTAL & ORBITAL RINGS
    // Elegant tilted brushed gold pedestal rings framing the sculpture
    // ----------------------------------------------------
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.03, 16, 120);
    const ringMesh1 = new THREE.Mesh(ringGeo1, goldMat);
    ringMesh1.rotation.x = Math.PI / 2.2;
    ringMesh1.rotation.y = 0.25;
    ringMesh1.position.set(0, -1.4, 0);
    rootSculpture.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.018, 16, 120);
    const ringMesh2 = new THREE.Mesh(ringGeo2, goldMat);
    ringMesh2.rotation.x = Math.PI / 2.5;
    ringMesh2.rotation.y = -0.3;
    ringMesh2.position.set(0, -1.6, 0);
    rootSculpture.add(ringMesh2);

    // Floating Stardust Champagne Particles
    const particleCount = 50;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6.0;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xDFBA73,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootSculpture.add(particles);

    // ----------------------------------------------------
    // 8. STUDIO LIGHTING RIG
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xFFF9F5, 1.4);
    scene.add(ambientLight);

    // Key softbox light
    const keyLight = new THREE.DirectionalLight(0xFFF6EA, 2.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Rim light from behind for silhouette glow
    const rimLight = new THREE.DirectionalLight(0xF4C5CB, 2.5);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Front high-specular fill light for crisp reflections
    const frontGlint = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    frontGlint.position.set(0, 2, 8);
    scene.add(frontGlint);

    // Warm champagne uplight
    const fillLight = new THREE.PointLight(0xC5A46D, 2.2, 12);
    fillLight.position.set(1, -3.5, 4);
    scene.add(fillLight);

    // 9. Standard Mouse Tracking (no custom cursor)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x * 0.45;
      mousePos.current.targetY = y * 0.35;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 10. Animation Loop with Smooth Damping
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth lerp mouse coordinates
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      if (rootSculpture) {
        // Idle floating levitation
        rootSculpture.position.y = Math.sin(time * 1.1) * 0.12;

        if (isRotatingRef.current) {
          rootSculpture.rotation.y += delta * 0.42;
        }

        // Natural pointer tilt
        rootSculpture.rotation.x = 0.22 - mousePos.current.y * 0.6;
        rootSculpture.rotation.z = -0.15 + mousePos.current.x * 0.5;

        // Subtle ring oscillation
        ringMesh2.rotation.z = Math.sin(time * 0.6) * 0.2;

        // Particle drift
        particles.rotation.y = time * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 540;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      nailGeometry.dispose();
      archGeo.dispose();
      caviarGeo.dispose();
      gemGeo.dispose();
      prongGeo.dispose();
      pearlGeo.dispose();
      petalGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
      nailPhysicalMat.dispose();
      gemMat.dispose();
      goldMat.dispose();
      pearlMat.dispose();
      petalMat.dispose();
    };
  }, []);

  // Update physical materials immediately when selected finish changes
  useEffect(() => {
    if (nailMaterialRef.current) {
      nailMaterialRef.current.color.setHex(selectedFinish.color);
      nailMaterialRef.current.metalness = selectedFinish.metalness;
      nailMaterialRef.current.roughness = selectedFinish.roughness;
      nailMaterialRef.current.transmission = selectedFinish.transmission;
      nailMaterialRef.current.thickness = selectedFinish.thickness;
      nailMaterialRef.current.ior = selectedFinish.ior;
      nailMaterialRef.current.clearcoat = selectedFinish.clearcoat;
      nailMaterialRef.current.clearcoatRoughness = selectedFinish.clearcoatRoughness;
      nailMaterialRef.current.sheen = selectedFinish.sheen;
      nailMaterialRef.current.sheenColor.setHex(selectedFinish.sheenColor);
      nailMaterialRef.current.attenuationColor.setHex(selectedFinish.attenuationColor);
      nailMaterialRef.current.attenuationDistance = selectedFinish.attenuationDistance;
      nailMaterialRef.current.needsUpdate = true;
    }

    if (gemMaterialRef.current) {
      gemMaterialRef.current.color.setHex(selectedFinish.gemColor);
      gemMaterialRef.current.transmission = selectedFinish.gemTransmission;
      gemMaterialRef.current.roughness = selectedFinish.gemRoughness;
      gemMaterialRef.current.metalness = selectedFinish.id === 'champagne-chrome' ? 0.85 : 0.05;
      gemMaterialRef.current.needsUpdate = true;
    }

    if (petalMaterialRef.current) {
      petalMaterialRef.current.color.setHex(selectedFinish.color);
      petalMaterialRef.current.transmission = selectedFinish.transmission > 0.3 ? 0.75 : 0.05;
      petalMaterialRef.current.metalness = selectedFinish.metalness * 0.6;
      petalMaterialRef.current.needsUpdate = true;
    }
  }, [selectedFinish]);

  return (
    <section id="experience" style={{
      backgroundColor: 'var(--color-espresso)',
      color: 'var(--color-ivory)',
      position: 'relative',
      padding: 'var(--section-padding) 0',
      overflow: 'hidden'
    }}>
      {/* Background ambient glow circles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(81, 27, 43, 0.45) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197, 164, 109, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Editorial Storytelling */}
          <div style={{ zIndex: 2 }}>
            <span className="section-label light">
              <Sparkles size={14} style={{ color: 'var(--color-champagne)' }} />
              Haute 3D Sculpture
            </span>

            <h2 className="display-2" style={{ color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>
              Art You <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-blush)' }}>Can Wear.</span>
            </h2>

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(250, 246, 240, 0.8)',
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '480px'
            }}>
              Every curve, apex, and light reflection is sculpted as an individual piece of wearable contemporary art. Interact with the sculptural centerpiece to explore our signature custom pigment finishes, anatomical C-curve, and fine gemstone embellishments.
            </p>

            {/* Interactive Finish Selectors */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                marginBottom: '1rem',
                fontWeight: 600
              }}>
                Select Atelier Finish
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem'
              }}>
                {FINISH_OPTIONS.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected
                          ? '1px solid var(--color-champagne)'
                          : '1px solid rgba(250, 246, 240, 0.15)',
                        backgroundColor: isSelected
                          ? 'rgba(197, 164, 109, 0.18)'
                          : 'rgba(255, 255, 255, 0.04)',
                        color: isSelected ? 'var(--color-ivory)' : 'rgba(250, 246, 240, 0.65)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{finish.name}</span>
                        <div style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: `#${finish.color.toString(16).padStart(6, '0')}`,
                          border: '1.5px solid rgba(255, 255, 255, 0.6)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }} />
                      </div>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'rgba(250, 246, 240, 0.45)',
                        lineHeight: 1.3
                      }}>
                        {finish.id === 'rose-quartz' ? 'Glass Translucency & Soft Glow' :
                         finish.id === 'burgundy-noir' ? 'Vampy Deep Mirror Lacquer' :
                         finish.id === 'champagne-chrome' ? 'Molten Gold Metallic Mirror' : 'Luminous Opal Pearlescent'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA & Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-gold"
                onClick={onOpenBooking}
              >
                Experience In Atelier
              </button>

              <button
                onClick={() => setIsRotating(!isRotating)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(250, 246, 240, 0.2)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.75rem 1.25rem',
                  color: 'rgba(250, 246, 240, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                <RotateCw size={14} style={{
                  transform: isRotating ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.4s ease'
                }} />
                {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
              </button>
            </div>
          </div>

          {/* Right Column: Three.js Interactive Canvas */}
          <div style={{
            position: 'relative',
            height: '560px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(250, 246, 240, 0.12)',
            background: 'radial-gradient(circle at 50% 40%, rgba(59, 18, 30, 0.5) 0%, rgba(26, 16, 20, 0.95) 100%)',
            boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.6), 0 20px 50px rgba(0,0,0,0.4)',
            overflow: 'hidden'
          }}>
            <div
              ref={mountRef}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'grab'
              }}
            />

            {/* Interactive hint floating badge */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(26, 16, 20, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.55rem 1.35rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(250, 246, 240, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              fontSize: '0.75rem',
              color: 'rgba(250, 246, 240, 0.85)',
              pointerEvents: 'none',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
            }}>
              <Eye size={13} style={{ color: 'var(--color-champagne)' }} />
              Move pointer to rotate sculpture &amp; inspect light reflections
            </div>

            {/* Currently Active Finish badge */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(197, 164, 109, 0.22)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--color-champagne)',
              fontSize: '0.75rem',
              color: 'var(--color-champagne-light)',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}>
              {selectedFinish.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
