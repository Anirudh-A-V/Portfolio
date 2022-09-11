import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight, pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(gridHelper, lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addstar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: '#FFFFF' });
	const star = new THREE.Mesh(geometry, material);

	const [x , y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);

	scene.add(star);
}

Array(200).fill().forEach(addstar);


// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Avatar

const avatarTexture = new THREE.TextureLoader().load('avatar.svg');
const avatar = new THREE.Mesh(
	new THREE.BoxGeometry(10, 10, 10),
	new THREE.MeshBasicMaterial({ map: avatarTexture })
);

scene.add(avatar);


function cameramover() {
	const t = document.body.getBoundingClientRect().top;
	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
}

avatar.position.set(window.innerWidth / 70, window.innerHeight / 70, 0);
// avatar.position.z = 3;
document.body.onscroll = cameramover;

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	
	avatar.rotation.x += 0.001;
	avatar.rotation.y += 0.005;
	avatar.rotation.z += 0.001;

	controls.update();
	renderer.render(scene, camera);
}

animate();


