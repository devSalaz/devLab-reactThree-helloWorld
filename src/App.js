import "./App.css";
import ThreeComponent from "./components/ThreeComponent";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html wrapperClass="loading-container" center>
      Loading...
    </Html>
  );
}

function App() {
  return (
    <div className="three-container">
      <div className="social-container">
        <ul>
          <li>
            <a href="https://github.com/devSalaz" target="_blank">
              <FaGithub size="2rem" color="#ffffff" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/el.salaz/" target="_blank">
              <FaInstagram size="2rem" color="#ffffff" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/andres-salaz/" target="_blank">
              <FaLinkedin size="2rem" color="#ffffff" />
            </a>
          </li>
        </ul>
        <a
          href="https://sketchfab.com/3d-models/pink-donut-dec0beb59d0644078572b65b2eef0345"
          target={"_blank"}
        >
          Donut 3D Model
        </a>
      </div>
      <Canvas dpr={[1, 2]} gl={{ alpha: false }}>
        {/* <Loader /> */}
        <Suspense fallback={<Loader />}>
          <ThreeComponent />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
