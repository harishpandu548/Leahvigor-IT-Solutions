"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { 
  TrendingUp, Target, Megaphone, Briefcase, Users, BarChart 
} from "lucide-react";
import { 
  FaInstagram, FaGlobe, FaRocket, FaFacebook, FaTwitter, FaPhone,
  FaSearch, FaCode, FaCamera, FaBolt
} from "react-icons/fa";

// ── Define data for 15 icons ──
const ITEMS = [
  { id: 'talent', type: 'image', url: '/bg-icons/talent.jpg', size: 2.5 },
  { id: 'marketing', type: 'image', url: '/bg-icons/marketing.jpg', size: 3 },
  { id: 'insta', type: 'icon', Icon: FaInstagram, color: '#8B5CF6', size: 40 },
  { id: 'fb', type: 'icon', Icon: FaFacebook, color: '#3AA6B9', size: 40 },
  { id: 'twit', type: 'icon', Icon: FaTwitter, color: '#fff', size: 36 },
  { id: 'phone', type: 'icon', Icon: FaPhone, color: '#10B981', size: 38 },
  { id: 'trend', type: 'icon', Icon: TrendingUp, color: '#10B981', size: 48 },
  { id: 'target', type: 'icon', Icon: Target, color: '#F43F5E', size: 50 },
  { id: 'mega', type: 'icon', Icon: Megaphone, color: '#EC4899', size: 46 },
  { id: 'globe', type: 'icon', Icon: FaGlobe, color: '#3B82F6', size: 50 },
  { id: 'rocket', type: 'icon', Icon: FaRocket, color: '#F43F5E', size: 55 },
  { id: 'search', type: 'icon', Icon: FaSearch, color: '#8B5CF6', size: 35 },
  { id: 'code', type: 'icon', Icon: FaCode, color: '#3AA6B9', size: 45 },
  { id: 'cam', type: 'icon', Icon: FaCamera, color: '#10B981', size: 40 },
  { id: 'bolt', type: 'icon', Icon: FaBolt, color: '#F59E0B', size: 42 },
];

function FloatingLogos() {
  const talentTexture = useTexture('/bg-icons/talent.jpg');
  const marketingTexture = useTexture('/bg-icons/marketing.jpg');
  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);

  // Initialize proper velocity-based physics state
  const physicsState = useRef(
    ITEMS.map(() => ({
      // Random starting positions within the view
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 16, 
        (Math.random() - 0.5) * 10, 
        -6 - Math.random() * 4      
      ),
      // Extremely slow starting velocity
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.4, 
        (Math.random() - 0.5) * 0.4, 
        0
      )
    }))
  );

  // Velocity-based Physics Loop
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1); 

    for (let i = 0; i < ITEMS.length; i++) {
      const state = physicsState.current[i];
      const mesh = meshesRef.current[i];
      if (!mesh) continue;

      // 1. Move icon by its velocity
      state.pos.x += state.vel.x * d;
      state.pos.y += state.vel.y * d;

      // 2. Repulsion (Check against all other icons)
      for (let j = i + 1; j < ITEMS.length; j++) {
        const otherState = physicsState.current[j];
        
        const dx = state.pos.x - otherState.pos.x;
        const dy = state.pos.y - otherState.pos.y;
        const distSq = dx * dx + dy * dy;
        
        // Reduced repulsion distance strictly to their visual size (2 units)
        const minDist = 2.0; 

        if (distSq < minDist * minDist && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          // Softened the repulsion force
          const force = ((minDist - dist) / dist) * 2.0; 
          
          state.vel.x += dx * force * d;
          state.vel.y += dy * force * d;
          otherState.vel.x -= dx * force * d;
          otherState.vel.y -= dy * force * d;
        }
      }

      // 3. Screen Boundaries (Soft Repulsion to Center)
      // Tighter limits so they never escape the visible viewport
      const limitX = 10; 
      const limitY = 5;
      
      // If they get too far, apply a gentle force pushing them back toward the center (0,0)
      if (Math.abs(state.pos.x) > limitX) {
        const sign = Math.sign(state.pos.x);
        state.vel.x -= sign * 0.05 * d; // Gentle push back
      }
      
      if (Math.abs(state.pos.y) > limitY) {
        const sign = Math.sign(state.pos.y);
        state.vel.y -= sign * 0.05 * d; // Gentle push back
      }

      // 4. Speed Regulation (Friction + Cruising Speed)
      // Apply constant friction to bleed off energy from bounces
      state.vel.x *= 0.99;
      state.vel.y *= 0.99;

      const currentSpeed = Math.sqrt(state.vel.x * state.vel.x + state.vel.y * state.vel.y);
      const targetSpeed = 0.25; // Very slow, ambient cruising speed
      
      if (currentSpeed > 0) {
        if (currentSpeed < targetSpeed) {
          // Gently accelerate back to cruising speed if they get too slow
          state.vel.x += (state.vel.x / currentSpeed) * 0.005;
          state.vel.y += (state.vel.y / currentSpeed) * 0.005;
        }
        
        // Hard cap max speed so they never fly across the screen wildly
        const maxSpeed = 0.8;
        if (currentSpeed > maxSpeed) {
          state.vel.x = (state.vel.x / currentSpeed) * maxSpeed;
          state.vel.y = (state.vel.y / currentSpeed) * maxSpeed;
        }
      }

      // Apply physics position to actual 3D mesh
      mesh.position.copy(state.pos);
      
      // Add a tiny bit of rotation for life
      mesh.rotation.z = Math.sin(state.pos.x * 0.5) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      
      {ITEMS.map((item, i) => (
        <mesh key={item.id} ref={(el) => { meshesRef.current[i] = el; }}>
          {item.type === 'image' ? (
            <>
              <planeGeometry args={[item.size, item.size]} />
              <meshBasicMaterial 
                map={item.id === 'talent' ? talentTexture : marketingTexture} 
                transparent 
                blending={THREE.AdditiveBlending} 
                depthWrite={false} 
                opacity={0.15} 
              />
            </>
          ) : (
            <Html transform sprite zIndexRange={[-100, -10]}>
              <div style={{ padding: '10px', opacity: 0.25 }}> 
                {/* @ts-ignore - Dynamic icon rendering */}
                <item.Icon size={item.size} color={item.color} />
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </>
  );
}

export default function Growth3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none mix-blend-screen opacity-100">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <fog attach="fog" args={["#000000", 2, 15]} />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
        <Suspense fallback={null}>
          <FloatingLogos />
        </Suspense>
      </Canvas>
    </div>
  );
}
