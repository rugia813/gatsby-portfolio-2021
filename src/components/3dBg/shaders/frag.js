export default `precision highp float;

uniform sampler2D map;
uniform float time;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vPressure;

void main() {
	vec4 diffuseColor = texture2D( map, vUv );
	float z = smoothstep(0.4, 1.0, vPos.z);
	float d = z + cos(time*3.) * 0.1;
	gl_FragColor = diffuseColor * vec4(d * 1.15, d * 1.85, 1.6, 1.0) + vPressure;

	// if ( diffuseColor.w < 0.5 ) discard;
}
`