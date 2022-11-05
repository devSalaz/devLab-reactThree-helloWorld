import React from "react";
import gsap from "gsap";
import { useGLTF } from "@react-three/drei";

const Donut = ({ randomTransform }) => {
  const { nodes, materials } = useGLTF("./models/donut.glb");

  const donutMouseHover = (e) => {
    document.body.style.cursor = "pointer";
    const baseMat = e.eventObject.children.filter((meshElement) => {
      return meshElement.name === "base";
    });
    baseMat[0].material.emissiveIntensity = 1;
    e.stopPropagation();
  };

  const donutMouseLeave = (e) => {
    document.body.style.cursor = "auto";
    const baseMat = e.eventObject.children.filter((meshElement) => {
      return meshElement.name === "base";
    });
    baseMat[0].material.emissiveIntensity = 0.05;
    e.stopPropagation();
  };

  const donutMouseClicked = (e) => {
    const donutObject = e.eventObject;
    const donutObjectScale = e.eventObject.scale.x;
    const donutScaleMin = donutObjectScale / 1.3;
    const donutScaleMax = donutObjectScale * 1.3;
    const isClicked = !donutObject.isClicked;
    donutObject.isClicked = isClicked;
    if (isClicked) {
      gsap.to(e.eventObject.scale, {
        x: donutScaleMin,
        y: donutScaleMin,
        z: donutScaleMin,
        duration: 0.2,
        ease: "easeOut",
      });
    } else {
      gsap.to(e.eventObject.scale, {
        x: donutScaleMax,
        y: donutScaleMax,
        z: donutScaleMax,
        duration: 0.2,
        ease: "easeOut",
      });
    }
    e.stopPropagation();
  };
  return (
    <>
      <group
        dispose={null}
        onClick={donutMouseClicked}
        onPointerEnter={donutMouseHover}
        onPointerLeave={donutMouseLeave}
        isClicked={false}
        rotationIntensity={Math.random() + 0.1}
        position={randomTransform.randomPosition}
        rotation={randomTransform.randomRotation}
        scale={randomTransform.randomScale}
        directionRotX={randomTransform.directionRotX}
        directionRotZ={randomTransform.directionRotZ}
      >
        <mesh
          name="base"
          castShadow
          receiveShadow
          geometry={nodes.Donut.geometry}
          material={nodes.Donut.material.clone()}
          material-roughness={0.4}
          material-emissive={"#0019ff"}
          material-emissiveIntensity={0.05}
          material-envMapIntensity={1.1}
        />
        <mesh
          name="icing"
          castShadow
          receiveShadow
          geometry={nodes.Icing.geometry}
          material={materials.icing}
          material-roughness={0.18}
          material-emissive={"#d812db"}
          material-emissiveIntensity={0.3}
          material-envMapIntensity={1.1}
        />
        <mesh
          name="sprinkles"
          castShadow
          receiveShadow
          geometry={nodes.Sprinkles.geometry}
          material={materials.sprinkles_bake}
          material-roughness={0}
          material-envMapIntensity={1.1}
        />
      </group>
    </>
  );
};

export default Donut;
