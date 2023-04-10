import './style.css'

import * as THREE from 'three';

			import Stats from 'three/addons/libs/stats.module.js';
			import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
			import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75 /* field of view out of 360 deg */,
window.innerWidth / window.innerHeight /* aspect ratio based off of the user browser window*/,
0.1, 1000 /* view frustrum, to control which objects are visible relateive to the camera itself */);

//to render out the actual graphics to the scene 
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);



const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)


// const lightHelper = new THREE.PointLightHelper(pointLight)
// // const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper/*, gridHelper*/)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

const loader = new OBJLoader();
loader.load('grid.obj', function(object) {
  scene.add(object);
});


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera


// var size = 100;
// var divisions = 100;
// var colorCenterLine = 0x444444;
// var colorGrid = 0x888888;
// var gridhelper = new THREE.GridHelper( size, divisions, colorCenterLine, colorGrid );
// scene.add( gridhelper );

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()