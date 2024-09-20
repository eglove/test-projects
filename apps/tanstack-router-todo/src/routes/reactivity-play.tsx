import { createFileRoute } from "@tanstack/react-router";

import { CustomStore } from "../components/reactivity/custom-store";
import { EffectSystem } from "../components/reactivity/effect-system";
import { TanstackStore } from "../components/reactivity/tanstack-store";
import { UseState } from "../components/reactivity/use-state";

export const ReactivityPlay = () => {
  return (
    <div className="mx-auto my-4 grid w-max grid-cols-4 gap-4">
      <UseState />
      <TanstackStore />
      <EffectSystem />
      <CustomStore />
    </div>
  );
};

export const Route = createFileRoute("/reactivity-play")({
  component: ReactivityPlay,
});
