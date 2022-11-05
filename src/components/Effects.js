import React from "react";

import {
  EffectComposer,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";

const Effects = () => {
  return (
    <>
      <EffectComposer>
        <Vignette offset={0.3} darkness={0.65} />
        <DepthOfField focusDistance={0} focalLength={0.03} bokehScale={5} />
      </EffectComposer>
    </>
  );
};

export default Effects;
