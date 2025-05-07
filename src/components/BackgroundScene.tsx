
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useTheme } from '@/hooks/use-theme';
import * as THREE from 'three';

// Particles component that creates floating spheres
const Particles = ({ count = 100, color = "#6B46C1" }) => {
  const particles = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  // Initialize mesh refs array
  if (meshRefs.current.length === 0) {
    meshRefs.current = Array(count).fill(null);
  }
  
  // Generate positions only once
  const positions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 10 - 5;
      positions.push({ position: [x, y, z], speed: Math.random() * 0.02 + 0.01 });
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    // Only animate if we have refs
    if (meshRefs.current) {
      meshRefs.current.forEach((mesh, i) => {
        if (mesh && positions[i]) {
          // Create a gentle floating effect
          const time = state.clock.getElapsedTime();
          const positionData = positions[i];
          const speed = positionData.speed;
          
          mesh.position.y += Math.sin(time * speed) * 0.005;
          mesh.position.x += Math.cos(time * speed) * 0.005;
          
          // Reset particles if they go too far
          if (mesh.position.y > 20) mesh.position.y = -20;
          if (mesh.position.x > 20) mesh.position.x = -20;
        }
      });
    }
  });

  return (
    <group ref={particles}>
      {positions.map((props, i) => (
        <mesh 
          key={i} 
          position={props.position as [number, number, number]}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Main background scene component
export const BackgroundScene = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-[-1] opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Particles 
          count={50} 
          color={theme === "dark" ? "#9b87f5" : "#6B46C1"} 
        />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
