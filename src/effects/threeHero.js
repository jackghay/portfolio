import * as THREE from 'three';

let scene, camera, renderer, particles, group;
let mouseX = 0, mouseY = 0;
let animationId;

export function initThreeHero() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const isMobile = window.innerWidth < 768;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || isMobile) {
    canvas.style.display = 'none';
    return;
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const rendererOptions = {
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  };

  try {
    renderer = new THREE.WebGLRenderer(rendererOptions);
  } catch {
    canvas.style.display = 'none';
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  group = new THREE.Group();
  scene.add(group);

  const geo = new THREE.IcosahedronGeometry(2, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });

  for (let i = 0; i < 8; i++) {
    const mesh = new THREE.Mesh(geo, wireMat);
    const rad = 5 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;
    mesh.position.set(
      Math.sin(theta) * Math.cos(phi) * rad,
      Math.sin(theta) * Math.sin(phi) * rad,
      Math.cos(theta) * rad * 0.5
    );
    mesh.scale.setScalar(0.5 + Math.random() * 1.5);
    mesh.userData = { rotSpeed: 0.002 + Math.random() * 0.005 };
    group.add(mesh);
  }

  const particleCount = 600;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 60;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x7c3aed,
    size: 0.06,
    transparent: true,
    opacity: 0.4,
  });
  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  animate();
  window.addEventListener('resize', onResize);
}

function animate() {
  animationId = requestAnimationFrame(animate);

  if (group) {
    group.rotation.x += 0.002;
    group.rotation.y += 0.003;
    group.children.forEach(child => {
      if (child.userData?.rotSpeed) {
        child.rotation.x += child.userData.rotSpeed;
        child.rotation.y += child.userData.rotSpeed * 1.3;
      }
    });
  }

  if (particles) {
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
  }

  if (camera) {
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  }

  renderer?.render(scene, camera);
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
