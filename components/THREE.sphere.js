// import {TweenMax, Power2, TimelineLite} from "gsap";
import {TimelineMax} from "gsap";
import * as THREE from 'three';
// import {LOADERJS} from'./component/LOADER';
// import {PLAYERJS} from'./component/PLAYER';


let renderer, scene, camera, allTriangles;
const animations = [Back.easeIn, Back.easeOut, Bounce.easeIn, Bounce.easeOut, Linear.ease, Elastic.easeOut];

// var ww = window.innerWidth,
//     wh = window.innerHeight;
// var ww = 800,
//     wh = 800;

const ctrl = {
    opacity : 1,
    wireframe : false,
    polygons : 15,
    rotation : true,
    animation : 1,
    duration : 5,
    direction : 2,
    // render : function() {
    //     createTriangles();
    // }
}



export const ThreeInit = function () {
    var ww = window.innerWidth,
        wh = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('scene'),
        antialias: true
    });
    renderer.setSize(ww, wh);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
    camera.position.set(0, 0, 800);
    scene.add(camera);

    createTriangles();
}


const createTriangles = function() {

    if (allTriangles) {
        scene.remove(allTriangles);
    }
    allTriangles = new THREE.Object3D();
    scene.add(allTriangles);
    const geometry = new THREE.SphereGeometry(1500, 22, 14);
    for (var i = 0, j = geometry.faces.length; i < j; i++) {
        //Get one face from the sphere
        var whichTriangle = i;
        if (ctrl.direction == 1) {
            whichTriangle = (j - 1) - i;
        } else if (ctrl.direction == 2) {
            whichTriangle = i % 2 === 0 ? i : j - i;
        }
        var face = geometry.faces[whichTriangle];

        //Create a geometry for that face
        var geometry2 = new THREE.Geometry();

        //Add the vertices of the face in the geometry
        geometry2.vertices = face.vertexNormals;

        //Set a new face
        geometry2.faces.push(new THREE.Face3(0, 1, 2));

        //Create a custom material
        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: ctrl.wireframe,
            transparent: true,
            opacity: ctrl.opacity
        });

        //Create a Mesh object
        var triangle = new THREE.Mesh(geometry2, material);
        var randomColor = Math.random();
        triangle.material.color = new THREE.Color(randomColor, randomColor, randomColor);
        allTriangles.add(triangle);
        // triangle.scale
        triangle.tl = new TimelineMax({
            repeat: -1,
            repeatDelay: (j - i) / (j * 4),
            delay: i / (ctrl.polygons * 5),
            yoyo: true
        });
        triangle.tl
            .from(triangle.scale, ctrl.duration, {
                x: 1599,
                y: 1599,
                z: 1599,
                ease: animations[ctrl.animation],
            })
            .to(triangle.scale, 50, {
                x: 1499*Math.random(),
                y: 1499*Math.random(),
                z: 1499*Math.random(),
                ease: animations[ctrl.animation],
                // repeat: -1,
                // yoyo: true
            })
    }

    render();
};

var render = function() {
    requestAnimationFrame(render);

    if (ctrl.rotation) {
        allTriangles.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
};

// initGui();
// init();
