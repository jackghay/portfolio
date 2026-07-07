import * as THREE from 'three';

let scene, camera, renderer, mainGroup, starField, orbs = [], particles = [], connectionLines, clickBurst = [];
let mouseX = 0, mouseY = 0, targetRotX = 0, targetRotY = 0, scrollSpeed = 1;
let animationId, clock, burstParticles;

function getColor(variable, fallback) {
  try {
    const val = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    return val ? new THREE.Color(val) : new THREE.Color(fallback);
  } catch { return new THREE.Color(fallback); }
}

export function initThreeHero() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  if (prefersReduced || isMobile) { canvas.style.display = 'none'; return; }

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 35;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch { canvas.style.display = 'none'; return; }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  mainGroup = new THREE.Group();
  scene.add(mainGroup);

  createCentralCore();
  createOrbitalRings();
  createStarField();
  createConnectionWeb();
  createFloatingGeometries();

  // Mouse tracking
  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('click', onClickBurst, { passive: true });

  // Scroll speed boost
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    scrollSpeed = 3;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { scrollSpeed = 1; }, 400);
  }, { passive: true });

  // Theme reactivity
  document.addEventListener('themechange', updateColors);

  animate();
  window.addEventListener('resize', onResize);
}

function createCentralCore() {
  const accent = getColor('--accent', '#00d4ff');

  // Outer wireframe icosahedron
  const outGeo = new THREE.IcosahedronGeometry(3.5, 1);
  const outMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const outer = new THREE.Mesh(outGeo, outMat);
  outer.userData = { rotSpeed: 0.003, pulse: true, phase: 0 };
  mainGroup.add(outer);
  orbs.push(outer);

  // Mid mesh icosahedron
  const midGeo = new THREE.IcosahedronGeometry(2.8, 0);
  const midMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const mid = new THREE.Mesh(midGeo, midMat);
  mid.userData = { rotSpeed: -0.005, pulse: true, phase: 1.5 };
  mainGroup.add(mid);
  orbs.push(mid);

  // Inner glow octahedron
  const inGeo = new THREE.OctahedronGeometry(1.8, 0);
  const inMat = new THREE.MeshBasicMaterial({
    color: getColor('--accent-alt', '#7c3aed'),
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  const inner = new THREE.Mesh(inGeo, inMat);
  inner.userData = { rotSpeed: 0.008, pulse: true, phase: 3 };
  mainGroup.add(inner);
  orbs.push(inner);

  // Core glow sprite
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  const ctx = glowCanvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
  gradient.addColorStop(0.3, 'rgba(0, 212, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const glowMat = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, blending: THREE.AdditiveBlending });
  const glowSprite = new THREE.Sprite(glowMat);
  glowSprite.scale.set(20, 20, 1);
  mainGroup.add(glowSprite);
}

function createOrbitalRings() {
  const accent = getColor('--accent', '#00d4ff');
  const accentAlt = getColor('--accent-alt', '#7c3aed');
  const configs = [
    { count: 800, radius: 10, tilt: 0, color: accent, size: 0.04, opacity: 0.5 },
    { count: 400, radius: 14, tilt: 0.8, color: accentAlt, size: 0.06, opacity: 0.35 },
    { count: 300, radius: 18, tilt: 1.5, color: accent, size: 0.03, opacity: 0.3 },
    { count: 200, radius: 7, tilt: 0.4, color: getColor('--accent-warm', '#f59e0b'), size: 0.05, opacity: 0.4 },
  ];

  configs.forEach((cfg, ringIndex) => {
    const positions = new Float32Array(cfg.count * 3);
    const sizes = new Float32Array(cfg.count);
    for (let i = 0; i < cfg.count; i++) {
      const angle = (i / cfg.count) * Math.PI * 2;
      const r = cfg.radius + (Math.random() - 0.5) * 1.5;
      const tilt = cfg.tilt;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r * 0.3 * Math.sin(tilt);
      positions[i * 3 + 2] = Math.sin(angle) * r * Math.cos(tilt);
      sizes[i] = cfg.size * (0.5 + Math.random() * 0.5);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    const mat = new THREE.PointsMaterial({
      color: cfg.color,
      size: cfg.size,
      transparent: true,
      opacity: cfg.opacity,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    points.userData = { ringIndex, speed: 0.001 + ringIndex * 0.0005, tilt: cfg.tilt };
    mainGroup.add(points);
    particles.push(points);
  });
}

function createStarField() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 80 + Math.random() * 120;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const brightness = 0.3 + Math.random() * 0.7;
    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness;
    colors[i * 3 + 2] = brightness + Math.random() * 0.2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.15,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    sizeAttenuation: true,
  });
  starField = new THREE.Points(geo, mat);
  scene.add(starField);
}

function createConnectionWeb() {
  // Create lines between nearby orbital particles
  // We'll compute this dynamically per frame for ~80 selected particles
  const count = 80;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 8 + Math.random() * 10;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create lines manually
  const linePositions = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 4) {
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
  }

  if (linePositions.length > 0) {
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: getColor('--accent', '#00d4ff'),
      transparent: true,
      opacity: 0.06,
    });
    connectionLines = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(connectionLines);
  }
}

function createFloatingGeometries() {
  const geometries = [
    new THREE.TetrahedronGeometry(0.6, 0),
    new THREE.OctahedronGeometry(0.5, 0),
    new THREE.IcosahedronGeometry(0.4, 0),
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
  ];

  for (let i = 0; i < 20; i++) {
    const geo = geometries[i % geometries.length];
    const mat = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? getColor('--accent', '#00d4ff') : i % 3 === 1 ? getColor('--accent-alt', '#7c3aed') : getColor('--accent-warm', '#f59e0b'),
      wireframe: true,
      transparent: true,
      opacity: 0.1 + Math.random() * 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 5 + Math.random() * 12;
    mesh.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.5,
      r * Math.cos(phi)
    );
    mesh.scale.setScalar(0.5 + Math.random() * 2);
    mesh.userData = {
      rotSpeed: (0.005 + Math.random() * 0.015) * (Math.random() > 0.5 ? 1 : -1),
      orbitSpeed: 0.001 + Math.random() * 0.003,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitRadius: r,
      floatPhase: Math.random() * Math.PI * 2,
    };
    mainGroup.add(mesh);
    orbs.push(mesh);
  }
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function onClickBurst(e) {
  const burstCount = 60;
  const positions = new Float32Array(burstCount * 3);
  const velocities = [];
  const colors = new Float32Array(burstCount * 3);
  const accent = getColor('--accent', '#00d4ff');
  const accentAlt = getColor('--accent-alt', '#7c3aed');

  for (let i = 0; i < burstCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = 0.3 + Math.random() * 0.7;
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
    velocities.push({
      x: Math.sin(phi) * Math.cos(theta) * speed,
      y: Math.sin(phi) * Math.sin(theta) * speed,
      z: Math.cos(phi) * speed,
    });
    const c = i % 2 === 0 ? accent : accentAlt;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const burst = new THREE.Points(geo, mat);
  burst.userData = { velocities, life: 1.0 };
  mainGroup.add(burst);
  clickBurst.push(burst);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  // Rotate main group
  targetRotX += (mouseY * 0.1 - targetRotX) * 0.02;
  targetRotY += (mouseX * 0.1 - targetRotY) * 0.02;
  mainGroup.rotation.x += targetRotX * 0.005 * scrollSpeed;
  mainGroup.rotation.y += 0.002 * scrollSpeed;
  mainGroup.rotation.z += targetRotY * 0.003 * scrollSpeed;

  // Animate central orbs (pulse + spin)
  orbs.forEach(obj => {
    const data = obj.userData || {};
    if (data.rotSpeed) {
      obj.rotation.x += data.rotSpeed * scrollSpeed;
      obj.rotation.y += data.rotSpeed * 1.3 * scrollSpeed;
      obj.rotation.z += data.rotSpeed * 0.7 * scrollSpeed;
    }
    if (data.pulse) {
      const pulse = 1 + Math.sin(time * 0.8 + (data.phase || 0)) * 0.08;
      obj.scale.setScalar(pulse);
      obj.material.opacity = (obj.material.userData?.baseOpacity ?? obj.material.opacity);
      const base = obj.material.userData?.baseOpacity ?? 0.2;
      obj.material.opacity = base + Math.sin(time + (data.phase || 0)) * 0.05;
    }
  });

  // Rotate orbital rings
  particles.forEach((p, i) => {
    p.rotation.y += (p.userData.speed || 0.001) * scrollSpeed;
  });

  // Animate floating geometries
  orbs.forEach(obj => {
    const data = obj.userData;
    if (data && data.orbitAngle !== undefined) {
      data.orbitAngle += data.orbitSpeed * scrollSpeed;
      const r = data.orbitRadius;
      const float = Math.sin(time + data.floatPhase) * 0.5;
      obj.position.x = Math.sin(data.orbitAngle) * r;
      obj.position.z = Math.cos(data.orbitAngle) * r * Math.cos(data.floatPhase * 0.5);
      obj.position.y = Math.sin(data.orbitAngle * 0.5) * r * 0.3 + float;
    }
  });

  // Star field slow rotation
  if (starField) {
    starField.rotation.y += 0.0001;
    starField.rotation.x += 0.00005;
  }

  // Click burst animation
  for (let i = clickBurst.length - 1; i >= 0; i--) {
    const burst = clickBurst[i];
    burst.userData.life -= delta * 1.5;
    if (burst.userData.life <= 0) {
      mainGroup.remove(burst);
      burst.geometry.dispose();
      burst.material.dispose();
      clickBurst.splice(i, 1);
      continue;
    }
    const pos = burst.geometry.attributes.position;
    const vel = burst.userData.velocities;
    for (let j = 0; j < pos.count; j++) {
      pos.array[j * 3] += vel[j].x * delta * 8;
      pos.array[j * 3 + 1] += vel[j].y * delta * 8;
      pos.array[j * 3 + 2] += vel[j].z * delta * 8;
    }
    pos.needsUpdate = true;
    burst.material.opacity = burst.userData.life;
    burst.material.size = 0.2 * (1 - burst.userData.life * 0.5);
  }

  // Camera parallax
  if (camera) {
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  }

  renderer?.render(scene, camera);
}

function updateColors() {
  const accent = getColor('--accent', '#00d4ff');
  const accentAlt = getColor('--accent-alt', '#7c3aed');
  const warm = getColor('--accent-warm', '#f59e0b');

  // Update central core colors
  mainGroup.children.forEach(child => {
    if (child.isMesh && child.material) {
      const index = orbs.indexOf(child);
      if (index === 0) child.material.color.set(accent);
      else if (index === 1) child.material.color.set(accent);
      else if (index === 2) child.material.color.set(accentAlt);
    }
    if (child.isPoints && child.material && child.material.color) {
      const isWarm = Math.random() > 0.7;
      child.material.color.set(isWarm ? warm : accent);
    }
  });

  // Update connection lines
  if (connectionLines) {
    connectionLines.material.color.set(accent);
  }
}

function onResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function cleanupThree() {
  if (animationId) cancelAnimationFrame(animationId);
  renderer?.dispose();
  window.removeEventListener('resize', onResize);
}
