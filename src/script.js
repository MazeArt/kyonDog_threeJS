import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from "three/examples/jsm/libs/stats.module.js";

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;
camera.position.y = 0.3;
camera.position.x = 1;

const renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background

document.body.appendChild(renderer.domElement);

// Add orbit controls to the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 2, 1).normalize();
scene.add(directionalLight);


// MODEL LOAD
let mixer;

const loader = new GLTFLoader();
loader.load("./KyonConAnimaciones2.gltf", function (gltf) {
  scene.add(gltf.scene);
  mixer = new THREE.AnimationMixer(gltf.scene);

// size & position
  gltf.scene.position.y = -1;
  gltf.scene.scale.set(1.3,1.3,1.3);

  //animation
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
  renderer.render(scene,camera);
});

function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(0.01);
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();