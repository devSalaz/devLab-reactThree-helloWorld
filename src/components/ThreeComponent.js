import React, { useMemo, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Center,
  Text3D,
  OrbitControls,
  Environment,
  Float,
} from "@react-three/drei";
import Effects from "./Effects";
import Donut from "./Donut";

const ThreeComponent = () => {
  const [change, setChange] = useState(false);
  const donutsGroupRef = useRef(null);
  useFrame((state, delta) => {
    donutsGroupRef.current.children.forEach((donut) => {
      donut.rotation.x +=
        donut.directionRotX * delta * 0.2 * donut.rotationIntensity;
      donut.rotation.z +=
        donut.directionRotZ * delta * 0.2 * donut.rotationIntensity;
    });
  });
  const donutCount = 200;

  const randomTransforms = useMemo(() => {
    const randomTransforms = [];

    for (let i = 0; i < donutCount; i++) {
      const randomScale = 0.5 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const posX = Math.sin(angle) * (2.5 + Math.random() * 5);
      const posZ = Math.cos(angle) * (2.5 + Math.random() * 5);
      const randomObject = {
        randomPosition: [posX, (Math.random() - 0.5) * 8, posZ],
        randomRotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        randomScale: [randomScale, randomScale, randomScale],
        directionRotX: Math.random() < 0.5 ? 1 : -1,
        directionRotZ: Math.random() < 0.5 ? 1 : -1,
      };

      randomTransforms[i] = randomObject;
    }

    return randomTransforms;
  }, []);

  return (
    <>
      <color args={[`#f2ecef`]} attach="background" />
      <OrbitControls enablePan={false} maxDistance={10} minDistance={3} />
      <Effects />
      <Environment preset="sunset" e />
      <ambientLight intensity={0.2} color={"#ffac00"} />
      <Float floatIntensity={2} speed={2}>
        <Center>
          <Text3D
            font="./fonts/lato_Bold.json"
            size={0.65}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            onClick={() => {
              setChange(!change);
            }}
          >
            {`HOLA R3F`}
            <meshStandardMaterial color={"#f581c1"} roughness={0.35} />
          </Text3D>
        </Center>
      </Float>

      <group name="donutsGroup" ref={donutsGroupRef}>
        {randomTransforms.map((donut, index) => {
          return <Donut randomTransform={donut} key={`donut${index}`} />;
        })}
      </group>
    </>
  );
};

export default ThreeComponent;
