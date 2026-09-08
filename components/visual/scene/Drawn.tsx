"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { DRAW_FRAG, DRAW_VERT, drawUniforms, type DrawUniforms } from "@/lib/scene/draw";

export type DrawnMaterial = THREE.ShaderMaterial & { uniforms: DrawUniforms };

type Props = {
  geometry: THREE.BufferGeometry;
  color: string;
  colorB?: string;
  opacity?: number;
  window?: number;
  pulseColor?: string;
  /** Start fully drawn (for objects that are never animated in). */
  drawn?: boolean;
};

/**
 * One drawn object. A lineSegments with the draw shader; the parent writes
 * uniforms through the ref every frame (`ref.current.uniforms.uDraw.value`).
 * Never pass a new uniforms object to update — R3F does not forward it.
 */
export const Drawn = forwardRef<DrawnMaterial, Props>(function Drawn(
  { geometry, color, colorB, opacity, window, pulseColor, drawn },
  ref
) {
  const uniforms = useMemo(() => {
    const u = drawUniforms({ color, colorB, opacity, window, pulseColor });
    if (drawn) u.uDraw.value = 1;
    return u;
    // Colours are constants at call sites; a new uniforms object would reset
    // the drawing, so build it once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <lineSegments frustumCulled={false} geometry={geometry} renderOrder={2}>
      <shaderMaterial
        ref={ref as React.Ref<THREE.ShaderMaterial>}
        vertexShader={DRAW_VERT}
        fragmentShader={DRAW_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
});
