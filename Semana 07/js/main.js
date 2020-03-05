//Cargar THREE
const THREE = require('three');

const clock = new THREE.Clock();
const scene = new THREE.Scene();

//Preparar Elementos
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0, 0, 0));
document.body.appendChild(renderer.domElement);
//Geometrias
const geometry = new THREE.BoxGeometry();
const geometry2 = new THREE.SphereGeometry();
// const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(1,1,1) });
const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 0, 0) });
const material2 = new THREE.MeshPhongMaterial({
color: new THREE.Color(1, 0, 1)
});
const cube = new THREE.Mesh(geometry, material);
const sphere = new THREE.Mesh(geometry2, material2);

cube.position.x -= 10;
scene.add(cube);
scene.add(sphere);

camera.position.z = 10;
//Luces
const ambiental = new THREE.AmbientLight(
new THREE.Color(0, 0, 1), // Color
1.0 // Intensity
);

scene.add(ambiental);

const directional = new THREE.DirectionalLight(
new THREE.Color(1, 0, 0), // Color
1.0 // Intensity
);
directional.castShadow = true;
scene.add(directional);

const spot = new THREE.SpotLight(
new THREE.Color(1, 1, 1)
);
spot.position.set( 10, 0, 10 );

scene.add(spot);
var move = 1;

const animate = function () {
requestAnimationFrame(animate);



if(sphere.position.x > 7.5){
    move*= -1;
}

if(sphere.position.x < -7.5){
    move*= -1;
}



sphere.position.x += 1*move;
cube.rotation.x += .1;
cube.position.y += .05*THREE.MathUtils.DEG2RAD * 40;
cube.position.x += .05*THREE.MathUtils.DEG2RAD * 40;

sphere.rotation.y -= 1*clock.getDelta();


renderer.render(scene, camera);
};

animate();