export default `
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform sampler2D uTouch;
uniform bool toggle;
uniform float timeOffset;
uniform float rotation;

attribute vec3 position;
attribute vec3 ico;
attribute vec2 uv;
attribute vec2 aUv;
attribute vec3 translate;
attribute float angle;

varying vec2 vUv;
varying vec4 vPressure;
varying vec3 vPos;

float map(float value, float min1, float max1, float min2, float max2) {
	return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
float rand(float n){return fract(sin(n) * 43758.5453123);}
float noise(float p){
	float fl = floor(p);
	float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}
float exponentialInOut(float t) {
	return t == 0.0 || t == 1.0
		? t
		: t < 0.5
			? +0.5 * pow(2.0, (20.0 * t) - 10.0)
			: -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}
vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, s, -s, c);
	return m * v;
}

void main() {
	vec3 from = (toggle == true) ? translate : ico;
	vec3 to = (toggle == true) ? ico : translate;
	vec3 step = (to - from);
	vec4 cur = vec4( from + (step * exponentialInOut(clamp((time - timeOffset) * .6, 0.0, 1.0))), 1.0 );
	vec2 p = rotate(cur.xz, rotation); // 1 deg = 0.017472222222222222
	cur.xz = p.xy;
	vec4 mvPosition = modelViewMatrix * cur;
	float f = texture2D(uTouch, vec2(map(p.x,0.0,1.0, 0.5,0.8),map(cur.y,0.0,1.0, 0.5,1.0))).r;

	// float scale = 10.0 - ((f - 0.5) * 120.0);
	float scale = 4.0 + noise(time * 3. + angle * 2.) * 6.;
	scale = time > 1.4 ? scale : scale * exponentialInOut(time / 1.4);

	mvPosition.xyz += vec3(position.x + sin(translate.y + time) * 1.8, position.y + 1. - 6. * cos(angle) * f, position.z) * scale;
	// float dis = distance(vec4(0,0,0,0), mvPosition);
	float d = noise(sin(angle)) * f + .75;
	float z = noise(cos(angle)) * f + .75;
	vec4 displaced = vec4(d, z, 1.0, 1.0);
	gl_Position = projectionMatrix * mvPosition * displaced;

	vUv = uv;
	vPos = translate;  // * (f*5.0 + 1.2);
	vPressure = vec4(f * 1.1, f * 1.2, f * 1., 1.0);
}
`