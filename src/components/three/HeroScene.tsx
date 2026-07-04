// src/components/three/HeroScene.tsx
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- Shader Background ---
function ShaderBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -14]}>
      <planeGeometry args={[60, 36]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vec2 uv = vUv;
            float n = sin(uv.x * 3.0 + uTime * 0.15) * 0.5 + 0.5;
            float m = sin(uv.y * 4.0 - uTime * 0.1) * 0.5 + 0.5;
            vec3 amber = vec3(0.831, 0.635, 0.298);
            vec3 mauve = vec3(0.608, 0.478, 0.549);
            vec3 ink = vec3(0.039, 0.055, 0.075);
            vec3 col = mix(ink, mix(amber, mauve, m), n * 0.16);
            gl_FragColor = vec4(col, 1.0);
          }
        `}
        depthWrite={false}
      />
    </mesh>
  );
}

// --- Glow Sprite Texture ---
function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(212,162,76,0.9)");
  g.addColorStop(1, "rgba(212,162,76,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

// --- Network Node ---
interface NodeProps {
  position: [number, number, number];
  color: string;
  big?: boolean;
  glowTexture: THREE.CanvasTexture;
}

function NetworkNode({ position, color, big, glowTexture }: NodeProps) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[big ? 0.16 : 0.11, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <sprite scale={[0.8, 0.8, 0.8]}>
        <spriteMaterial
          map={glowTexture}
          color={color}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

// --- Edge Line ---
function EdgeLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#3a4048" transparent opacity={0.55} />
    </line>
  );
}

// --- Node data ---
const nodeData: {
  p: [number, number, number];
  c: string;
  big?: boolean;
}[] = [
  { p: [-2.6, 1.4, 0.6], c: "#ece4d6" },
  { p: [-3.3, 0.2, -0.4], c: "#ece4d6" },
  { p: [-1.9, 0.4, 0.9], c: "#ece4d6" },
  { p: [-2.8, -1.4, 0.2], c: "#d4a24c" },
  { p: [-3.6, -0.6, -0.6], c: "#d4a24c" },
  { p: [-1.7, -1.8, 0.4], c: "#d4a24c" },
  { p: [0, 0.1, 1.1], c: "#9b7a8c", big: true },
  { p: [2.1, 1.6, -0.2], c: "#d4a24c" },
  { p: [3.2, 0.4, 0.5], c: "#d4a24c" },
  { p: [2.5, -0.9, -0.5], c: "#d4a24c" },
  { p: [1.3, -1.7, 0.3], c: "#d4a24c" },
  { p: [3.4, -2.1, -0.3], c: "#7fa9a0" },
];

const edgeIndices: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [3, 4], [3, 5], [4, 5],
  [1, 6], [4, 6], [6, 7], [6, 8], [6, 9], [6, 10],
  [7, 8], [8, 9], [9, 10], [10, 11], [3, 11],
];

// --- Mouse follower camera ---
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current.y * 1.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// --- Network group with rotation ---
function NetworkGroup({
  glowTexture,
}: {
  glowTexture: THREE.CanvasTexture;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.09;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {nodeData.map((node, i) => (
        <NetworkNode
          key={i}
          position={node.p}
          color={node.c}
          big={node.big}
          glowTexture={glowTexture}
        />
      ))}
      {edgeIndices.map(([a, b], i) => (
        <EdgeLine key={i} start={nodeData[a].p} end={nodeData[b].p} />
      ))}
    </group>
  );
}

// --- Main scene component ---
function Scene() {
  const glowTexture = useMemo(() => createGlowTexture(), []);

  return (
    <>
      <ShaderBackground />
      <NetworkGroup glowTexture={glowTexture} />
      <CameraRig />
    </>
  );
}

// --- Exported canvas wrapper ---
export function HeroScene({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}