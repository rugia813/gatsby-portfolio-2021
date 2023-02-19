import React, { useEffect, useRef } from "react"
import * as THREE from 'three';

let camera, scene, renderer;
let geometry, material, mesh;

export default function ProjectImage(props) {
	const container = useRef(null)
	useEffect(() => {
		init()
		animate()
		return () => {
			// removeListeners()
		}
	}, [container, props.image])

	function init() {
		renderer = new THREE.WebGLRenderer({ alpha: true });

		if (renderer.capabilities.isWebGL2 === false && renderer.extensions.has('ANGLE_instanced_arrays') === false) {
			return (
				<div>notSupported</div>
			);
		}

		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
		camera.position.z = 2.9;
		// camera.position.y = 100;
		// camera.position.x = 80;

		scene = new THREE.Scene();
        scene.background = new THREE.Color('gray')

		geometry = new THREE.BoxGeometry(3, 2, 1, 4, 3);

        const texture = new THREE.TextureLoader().load( props.image, e => console.log(e), e => console.log(e) );
		texture.magFilter = THREE.LinearFilter
		texture.minFilter = THREE.LinearFilter

		material = new THREE.MeshBasicMaterial({
            map: texture,
            // wireframe: true,
        })

		mesh = new THREE.Mesh(geometry, material);
		// mesh.scale.set(500, 500, 500);
		scene.add(mesh);
        camera.lookAt(mesh.position)

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
		container.current.replaceChildren(renderer.domElement);

		window.addEventListener('resize', resize);

		// addListeners()

		return true;

	}

	function resize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);

	}

	function animate() {
		requestAnimationFrame(animate);

		render();
	}

	function render() {

		renderer.render(scene, camera);

	}

	return (
		<div ref={container}>
		</div>
	)
}