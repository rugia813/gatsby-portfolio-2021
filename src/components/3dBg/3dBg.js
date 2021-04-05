import styled from "@emotion/styled"
import React, { useEffect, useRef } from "react"
import * as THREE from 'three';
import * as Stats from 'stats.js';
import TouchTexture from './TouchTexture.js';
import Control from "./InteractiveControls.js";
import vert from "./shaders/vert.js";
import frag from "./shaders/frag.js";
import circle from "/static/imgs/circle.png";

const CanvasContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	/* border: red solid thick;
	width: 100%; */
`

let stats;
let camera, scene, renderer;
let geometry, material, mesh;
let touch, hitArea;
let control
let debug = false
let timeOrigin, lastframeTime = 0
let active = true

export default function Bg3d(props) {
	const container = useRef(null)
	useEffect(() => {
		timeOrigin = performance.now()
		lastframeTime = 0
		init()
		animate()
		return () => {
			removeListeners()
		}
	}, [container])
	useEffect(() => {
		camera.position.z = props.scale
		resize()
	}, [props.scale])

	function init() {
		active = true

		renderer = new THREE.WebGLRenderer({ alpha: true });

		if (renderer.capabilities.isWebGL2 === false && renderer.extensions.has('ANGLE_instanced_arrays') === false) {

			// document.getElementById('notSupported').style.display = '';
			return (
				<div>notSupported</div>
			);

		}

		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
		camera.position.z = props.scale;
		camera.position.y = 100;
		// camera.position.x = 80;

		scene = new THREE.Scene();

		const circleGeometry = new THREE.CircleGeometry(.6, 12);

		geometry = new THREE.InstancedBufferGeometry();
		geometry.index = circleGeometry.index;
		geometry.attributes = circleGeometry.attributes;

		const ico = new THREE.IcosahedronGeometry(1.1, 14)

		const sg = new THREE.TorusKnotGeometry(
			1,
			10.8,
			600,
			20,
			5,
			8
		)
		sg.scale(.09, .09, .09)
		const pos = sg.attributes.position
		const icoPos = ico.attributes.position
		const uv = sg.attributes.uv
		console.log('sg: ', sg);

		const particleCount = pos.count;
		const icoCount = icoPos.count;

		const translateArray = new Float32Array(particleCount * 3);
		const icoArray = new Float32Array(icoCount * 3);
		const anglesArray = new Float32Array(particleCount);

		for (let i = 0, i3 = 0, l = icoCount;i < l;i++, i3 += 3) {

			icoArray[i3 + 0] = icoPos.array[i3 + 0];
			icoArray[i3 + 1] = icoPos.array[i3 + 1];
			icoArray[i3 + 2] = icoPos.array[i3 + 2];
		}

		for (let i = 0, i3 = 0, l = particleCount;i < l;i++, i3 += 3) {

			translateArray[i3 + 0] = pos.array[i3 + 0];
			translateArray[i3 + 1] = pos.array[i3 + 1];
			translateArray[i3 + 2] = pos.array[i3 + 2];

			anglesArray[i] = Math.random() * Math.PI;
		}

		const uvArr = new Float32Array(particleCount * 2);

		for (let i = 0, i3 = 0, l = particleCount;i < l;i++, i3 += 2) {

			uvArr[i3 + 0] = uv.array[i3 + 0];
			uvArr[i3 + 1] = uv.array[i3 + 1];

		}

		geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3));
		geometry.setAttribute('ico', new THREE.InstancedBufferAttribute(icoArray, 3));
		geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(anglesArray, 1));
		geometry.setAttribute('aUv', new THREE.InstancedBufferAttribute(uvArr, 2));

		material = new THREE.RawShaderMaterial({
			uniforms: {
				"map": { value: new THREE.TextureLoader().load(circle) },
				"time": { value: 0.0 },
				"uTouch": { value: null },
				"toggle": { value: false },
				"timeOffset": { value: 0 },
				"rotation": { value: 0.02 },
			},
			vertexShader: vert,
			fragmentShader: frag,
			depthTest: true,
			depthWrite: true
		});

		mesh = new THREE.Mesh(geometry, material);
		mesh.scale.set(500, 500, 500);
		scene.add(mesh);

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.current.appendChild(renderer.domElement);

		if (debug) {
			stats = new Stats();
			document.body.appendChild(stats.dom);
		}

		window.addEventListener('resize', resize);

		control = new Control(camera)
		control.resize()
		initTouch()
		initHitArea()
		addListeners()
		
		return true;

	}
	function toggleModel() {
		const timeOffset = performance.now() * 0.0005
		material.uniforms["toggle"].value = !material.uniforms["toggle"].value;
		material.uniforms["timeOffset"].value = timeOffset;
	}

	function initTouch() {
		// create only once
		if (!touch) touch = new TouchTexture(this, debug);
		console.log('touch: ', touch);
		mesh.material.uniforms.uTouch.value = touch.texture;
	}
	function initHitArea() {
		const geometry = new THREE.PlaneGeometry(1160, 950, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('red'), wireframe: true, depthTest: false });
		material.visible = debug;
		hitArea = new THREE.Mesh(geometry, material);
		scene.add(hitArea);
	}
	function addListeners() {
		control.addListener('interactive-move', onInteractiveMove);
		document.body.addEventListener('click', toggleModel);
		control.objects.push(hitArea);
		control.enable();
	}
	function removeListeners() {
		control.removeListener('interactive-move', onInteractiveMove);

		const index = control.objects.findIndex(obj => obj === hitArea);
		control.objects.splice(index, 1);
		control.disable();
		active = false
	}
	function onInteractiveMove(e) {
		const uv = e.intersectionData.uv;
		if (touch) touch.addTouch(uv);
		window.a = touch
		const rot = mesh.material.uniforms.rotation.value
		const nRot = (uv.x - 0.5) * .05
		const fRot = (nRot > rot) 
		? (nRot > rot + 0.002) ? rot + 0.001 : nRot
		: (nRot < rot - 0.002) ? rot - 0.001 : nRot
		mesh.material.uniforms.rotation.value = fRot;
	}

	function resize() {
		control.resize()

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

	}

	function animate() {
		if (!active) return false
		requestAnimationFrame(animate);

		render();
		stats && stats.update();

	}

	function render() {
		const time = (performance.now() - timeOrigin);
		const adjustedTime = time * 0.0005
		material.uniforms["time"].value = adjustedTime;
		
		// lock to 60 fps
		if (time - lastframeTime > 12) {
			touch && touch.update(time)
			lastframeTime = time
		}

		// mesh.rotation.x = adjustedTime * 0.2;
		// mesh.rotation.y = adjustedTime * 0.4;

		renderer.render(scene, camera);

	}

	return (
		<CanvasContainer ref={container}>
		</CanvasContainer>
	)
}