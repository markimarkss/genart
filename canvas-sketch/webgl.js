global.THREE = require('three');

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  animate: true,
  dimensions: [1920, 1080],
  fps: 24,
  duration: 16,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1);

  // Setup a camera, we will update its settings on resize
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  // Get a palette for our scene
  const palette = random.pick(palettes);

  // Randomize mesh attributes
  const randomizeMesh = (mesh) => {
    // Choose a random point in a 3D volume between -1..1
    const point = new THREE.Vector3(
      random.value() * 2 - 1,
      random.value() * 2 - 1,
      random.value() * 2 - 1
    );
    mesh.position.copy(point);
    mesh.originalPosition = mesh.position.clone();

    // Choose a color for the mesh material
    mesh.material.color.set(random.pick(palette));

    // Randomly scale each axis
    mesh.scale.set(
      random.gaussian(),
      random.gaussian(),
      random.gaussian()
    );

    // Do more random scaling on each axis
    if (random.chance(0.5)) mesh.scale.x *= random.gaussian();
    if (random.chance(0.5)) mesh.scale.y *= random.gaussian();
    if (random.chance(0.5)) mesh.scale.z *= random.gaussian();

    // Further scale each object
    mesh.scale.multiplyScalar(random.gaussian() * 0.25);
  };

  // A group that will hold all of our cubes
  const container = new THREE.Group();

  // Re-use the same Geometry across all our cubes
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // The # of cubes to create
  const chunks = 50;

  // Create each cube and return a THREE.Mesh
  const meshes = Array.from(new Array(chunks)).map(() => {
    // Basic "unlit" material with no depth
    const material = new THREE.MeshStandardMaterial({
      // Avoid popping
      depthTest: false,
      color: random.pick(palette)
    });

    // Create the mesh
    const mesh = new THREE.Mesh(geometry, material);

    // Randomize it
    randomizeMesh(mesh);

    return mesh;
  });

  // Add meshes to the group
  meshes.forEach(m => container.add(m));

  // Then add the group to the scene
  scene.add(container);
  // add light into scene
  const clens = new THREE.DirectionalLight('blue', .75);
  clens.position.set(0, 4, 4);
  scene.add(clens);

  const clensorange = new THREE.DirectionalLight('orange', .75);
  clensorange.position.set(1, -4, -1);
  scene.add(clensorange);

  const amlight = new THREE.AmbientLight('yellow', 1);
  amlight.position.set(4, -2, 1);
  scene.add(amlight);

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(0, 0, 4);
  scene.add(light);
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      // Setup an isometric perspective
      const aspect = viewportWidth / viewportHeight;
      const zoom = 1.5;
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      camera.near = -100;
      camera.far = 100;
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update camera properties
      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ time, deltaTime, width, height }) {
      // Animate each mesh with noise
      scene.rotation.y = (time * Math.PI * -.25) / 2;


      // Draw scene with our camera
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);