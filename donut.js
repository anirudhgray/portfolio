import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  PointLight
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#donut-scene');

// create a Scene
const scene = new Scene();

// Set the background color
scene.background = new Color('white');

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new BoxBufferGeometry(3, 3, 3);

// create a default (white) Basic material
const material = new MeshStandardMaterial({color:"red"});

// create a Mesh containing the geometry and material
const cube = new Mesh(geometry, material);

cube.rotation.x = 2

// add the mesh to the scene
scene.add(cube);

const light = new PointLight()
light.position.set(5,0,8)
scene.add(light)

// create the renderer
const renderer = new WebGLRenderer();

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;
controls.enablePan = false;

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);

const tick = () => {

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();