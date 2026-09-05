"use client";

import { useEffect, useRef } from "react";

/**
 * The brand's light source — a slow silk aurora in the logo gradient
 * (amber → magenta → violet) rendered as a single WebGL fragment shader.
 * Luxurious, smooth, and crafted — no particles, no point clouds.
 *
 * Perf: DPR capped at 1.5, one rAF, pauses off-screen, static frame under
 * prefers-reduced-motion, CSS-gradient fallback when WebGL is unavailable.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.05 + vec2(3.7, 1.3);
    a *= 0.52;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.045;
  vec2 drift = uMouse * 0.10;

  // two layers of flowing silk
  float n1 = fbm(p * 1.35 + vec2(t * 0.8, -t * 0.45) + drift);
  float n2 = fbm(p * 2.1 - vec2(t * 0.5, t * 0.3) + n1 * 0.9);
  float silk = fbm(p * 1.6 + vec2(n2 * 1.4, n1 * 1.1));

  // brand colors
  vec3 bg      = vec3(0.047, 0.031, 0.070);   // #0C0812
  vec3 violet  = vec3(0.541, 0.310, 0.878);   // #8A4FE0
  vec3 magenta = vec3(0.871, 0.145, 0.533);   // #DE2588
  vec3 amber   = vec3(0.941, 0.565, 0.188);   // #F09030

  vec3 col = bg;
  col = mix(col, violet * 0.75, smoothstep(0.32, 0.78, silk) * 0.75);
  col = mix(col, magenta * 0.85, smoothstep(0.48, 0.92, n2) * 0.70);
  col = mix(col, amber * 0.90, smoothstep(0.70, 1.00, silk * n2 * 1.85) * 0.85);

  // intensity: rises from the lower-left, breathes at the top-right
  float mask = smoothstep(-0.15, 0.85, 1.0 - distance(uv, vec2(0.72, 0.68)) * 1.05);
  mask = max(mask, smoothstep(0.0, 0.9, 1.0 - distance(uv, vec2(0.15, 0.15)) * 1.35) * 0.6);
  col = mix(bg, col, mask);

  // vignette so edges melt into the page ground
  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5, 0.5)));
  col = mix(bg, col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function Aurora({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS fallback layer stays visible

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduce) {
      gl.uniform1f(uTime, 18.0);
      gl.uniform2f(uMouse, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div aria-hidden className={className}>
      {/* CSS fallback / underpaint while the shader boots */}
      <div className="absolute inset-0 bg-brand-gradient-soft" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
