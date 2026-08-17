"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (icoRef.current) {
      icoRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      icoRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * -0.05;
      torusRef.current.rotation.y = state.clock.getElapsedTime() * -0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#6366F1" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#8B5CF6" />

      {/* Center abstract geometry */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={icoRef} position={[3, 0, -3]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial 
            color="#6366F1" 
            wireframe 
            transparent 
            opacity={0.3} 
            emissive="#6366F1"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Background ring */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={torusRef} position={[-3, -1, -5]}>
          <torusGeometry args={[1.5, 0.4, 16, 32]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            wireframe 
            transparent 
            opacity={0.2}
            emissive="#8B5CF6"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      
      {/* Small floating node */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
        <mesh position={[0, 2.5, -6]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#4F46E5" 
            wireframe 
            transparent 
            opacity={0.4}
            emissive="#4F46E5"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Growth3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none mix-blend-screen opacity-100">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <fog attach="fog" args={["#000000", 2, 12]} />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
