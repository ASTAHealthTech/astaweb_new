import * as THREE from "three";

/**
 * The one look every object on the site shares — the same recipe as the
 * club site's machines (matte near-black solids, glowing edges, emissive
 * LEDs, a ring plinth on a grid) in ASTA's colours instead of blue:
 *
 *   bodies   deep aubergine, lit
 *   edges    violet
 *   glow     magenta          (LEDs, plinth rings, pulses)
 *   signal   amber            (the vital sign itself)
 */
export const BODY = "#130b1c";
export const BODY_LIGHT = "#241733";
export const EDGE = "#a37cf5";
export const EDGE_SOFT = "#6b47b8";
export const GLOW = "#de2588";
export const GLOW_SOFT = "#ff5fb0";
export const SIGNAL = "#f09030";
export const VIOLET = "#8a4fe0";
export const WHITE = "#f6f2f8";
export const GRID_A = "#2b1a44";
export const GRID_B = "#1a1030";

/** Every solid shares one material; opacity is animated per instance via a clone. */
export function bodyMaterial(color: string = BODY): THREE.MeshStandardMaterial {
  // polygonOffset pushes the faces back a hair so the edge lines drawn on
  // top of them never z-fight.
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.5,
    transparent: true,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}

export function glassMaterial(color: string = VIOLET): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    transparent: true,
    opacity: 0.18,
    roughness: 0.2,
    metalness: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
}
