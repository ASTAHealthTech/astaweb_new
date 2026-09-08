/**
 * Ground objects — small solid objects that sit inside the page's lower
 * sections, positioned by a DOM anchor.
 *
 * A section renders <GroundObject kind="unit" /> where it wants the object;
 * the stage looks up that element's rectangle every frame and places the 3D
 * object exactly there, at a depth that makes it fill the box. One scene,
 * one camera, no extra canvases.
 */
export type GroundKind =
  | "unit" | "monitor" | "heart" | "lungs" | "neuron" | "bed" | "graph" | "node"
  // the section objects — one distinct form each (objects/fresh.tsx)
  | "eye" | "rail" | "ribbon" | "alarms" | "cage" | "attention" | "landscape" | "balance"
  | "sirens" | "monitors5" | "comb" | "radar" | "tape"
  // the operable pedestal objects, one per inner page
  | "pedestal-model" | "pedestal-ward" | "pedestal-bedside" | "pedestal-switchboard" | "pedestal-hub";

export type GroundAnchor = { id: number; el: HTMLElement; kind: GroundKind };

const anchors: GroundAnchor[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

export function registerAnchor(el: HTMLElement, kind: GroundKind): () => void {
  const a = { id: nextId++, el, kind };
  anchors.push(a);
  listeners.forEach((l) => l());
  return () => {
    const i = anchors.indexOf(a);
    if (i >= 0) anchors.splice(i, 1);
    listeners.forEach((l) => l());
  };
}

export function subscribeAnchors(l: () => void): () => void {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

export function getAnchors(): readonly GroundAnchor[] {
  return anchors;
}
