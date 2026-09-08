"use client";

import type { Tier } from "@/lib/tier";
import { HeroStage } from "./HeroStage";
import { LabStage } from "./LabStage";
import { ModelStage } from "./ModelStage";
import { WardStage } from "./WardStage";
import { GroundStage } from "./GroundStage";

/**
 * Everything on the stage. Each stage owns its framings and draws itself in
 * when one of them is current — see useStage.
 */
export function Room({ tier }: { tier: Tier }) {
  void tier;
  return (
    <>
      <HeroStage />
      <ModelStage />
      <LabStage />
      <WardStage />
      <GroundStage />
    </>
  );
}
