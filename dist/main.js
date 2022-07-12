import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';
import { FlakesTexture } from './js/FlakesTexture.js';
import { RGBELoader } from './js/RGBELoader.js';

let scene, camera, renderer, controls, pointlight;
const container = document.body;
const tooltip = document.querySelector('.tooltip');
const openBtn = document.querySelector('.openMenu');
const closeBtn = document.querySelector('.closeMenu');
let spriteActive = false;

class Scene {
constructor (image, camera){
    this.image = image;
    this.points = [];
    this.sprites = [];
    this.scene = null;
    this.camera = camera;
}

createScene (scene){
    this.scene = scene;
    let ballGeo = new THREE.SphereGeometry(100,32,32);
    const texture =  new THREE.TextureLoader().load(this.image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    });
    this.sphere = new THREE.Mesh(ballGeo,material);
    this.scene.add(this.sphere);
    this.points.forEach(this.addTooltip.bind(this));
    this.points.forEach(this.openTooltop.bind(this));
    this.points.forEach(this.closeTooltop.bind(this));
    
}

createPlane(scene){
    this.scene = scene;
    let plane = new THREE.PlaneGeometry( 1, 1 );
    const texture =  new THREE.TextureLoader().load('img/hinh1.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = 1;
    let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(plane,material);
    // this.scene.add(this.plane);
    this.points.forEach(this.addTooltip.bind(this));
}

createBox(scene){
    this.scene = scene;
    let cube = new THREE.BoxGeometry( 300, 300, 300);
    // const texture =  new THREE.TextureLoader().load('img/hinh1.jpg');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.repeat.x = 1;
    let cubeMaterials = [
    new THREE.MeshBasicMaterial({
        map:  new THREE.TextureLoader().load('textures/saigon.jpg'),
        side:  THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('textures/hanoi.jpg'),
        side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('textures/hoian.jpg'),
        side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('textures/danang.jpg'),
        side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('textures/hue.jpg'),
        side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('textures/dalat.jpg'),
        side: THREE.DoubleSide,
    })
    ]
    let face = new THREE.MeshFaceMaterial(cubeMaterials);
    this.cube = new THREE.Mesh(cube,face);
    // this.scene.add(this.cube);
    this.points.forEach(this.addTooltip.bind(this));
}

addPoint (point){
    this.points.push(point);
}

addTooltip(point,scene) {
    let spriteMap = new THREE.TextureLoader().load( './textures/hanoi.jpg' );
    let spriteMaterial = new THREE.SpriteMaterial( { 
    map: spriteMap,
    // visible: false
    } );
    let sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(0,0,0);
    sprite.position.copy(point.position.clone().normalize().multiplyScalar(5));
    sprite.scale.multiplyScalar(2)
    this.scene.add(sprite);
    this.sprites.push(sprite);
}

openTooltop(){
    openBtn.onclick = () =>{
    console.log('open')
    this.sprites.forEach((sprite) => {
        sprite.scale.set(0,0,0)
        TweenLite.to(sprite.scale, 1, {
        x:4,
        y:4,
        z:4
        })
    })
    }
}

closeTooltop(){
    closeBtn.onclick = () => {
    console.log('close')
    this.sprites.forEach((sprite) => {
    TweenLite.to(sprite.scale, 1, {
    x:0,
    y:0,
    z:0
    })
    })
    }
}

destroy(){
    
}

appear(){
    
}
}

function init() {
scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000);
camera.position.set(-1,0,1);
controls = new OrbitControls(camera, renderer.domElement);

// controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableDamping = true;
controls.enableZoom = false;

let envmaploader = new THREE.PMREMGenerator(renderer);

let s = new Scene('./textures/northcliff.jpg', camera)
// let cube = new Scene(camera)
s.addPoint({
    position: new THREE.Vector3 (120,7,-93.49929162862449),
    name: 'ulatr',
    // scene: cube
})
s.createScene(scene);
// s.addTooltip(scene);
s.appear();

function onResize() {
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
}

const rayCaster = new THREE.Raycaster();

function onclick(e) {
    // let mouse = new THREE.Vector2(( e.clientX / window.innerWidth ) * 2 - 1,- ( e.clientY / window.innerHeight ) * 2 + 1);
    // rayCaster.setFromCamera(mouse,camera);
    // let intersects = rayCaster.intersectObjects( scene.children );
    // intersects.forEach(function (intersect) {
    //   if (intersect.object.type === 'Sprite') {
    //     intersect.object.onclick();
    //     this.sprite.spriteMaterial =  new THREE.SpriteMaterial({visible: true});
    //   }
    // })
    if (e.target.tagName === 'IMG') {
    closeBtn.classList.toggle('noActive');
    openBtn.classList.toggle('noActive')
    }
}

// function onMouseMove(e) {
//   let mouse = new THREE.Vector2(( e.clientX / window.innerWidth ) * 2 - 1,- ( e.clientY / window.innerHeight ) * 2 + 1);
//   rayCaster.setFromCamera(mouse,camera);
//   let foundSprite = false;
//   let intersects = rayCaster.intersectObjects( scene.children );
//   intersects.forEach(function (intersect) {
//     if (intersect.object.type === 'Sprite') {
//       let p = intersect.object.position.clone().project(camera);
//       tooltip.style.top = (window.innerHeight /2) + 'px';
//       tooltip.style.left = (window.innerWidth /2) + 'px';
//       tooltip.classList.add('active');
//       tooltip.innerHTML = intersect.object.name;
//       spriteActive = intersect.object;
//       foundSprite = true;
//     }
//   })
//   if (foundSprite === false && spriteActive) {
//     tooltip.classList.remove('active');
//     spriteActive = false;    
//   }
// }

window.addEventListener('resize',onResize)
container.addEventListener('click', onclick)
// container.addEventListener('mousemove', onMouseMove)
animate();
}

function animate() {
controls.update();
renderer.render(scene, camera);
requestAnimationFrame(animate);
}
init();