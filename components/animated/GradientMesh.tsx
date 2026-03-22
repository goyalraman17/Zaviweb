'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GradientMeshProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function GradientMesh({
  className = '',
  colors = ['#6366F1', '#8B5CF6', '#3B82F6', '#A855F7'],
  speed = 20,
}: GradientMeshProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden opacity-30 ${className}`}>
      {/* Gradient mesh blobs */}
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            width: '40%',
            height: '40%',
          }}
          animate={{
            x: [
              `${20 + i * 20}%`,
              `${30 + i * 15 + mousePosition.x * 0.05}%`,
              `${20 + i * 20}%`,
            ],
            y: [
              `${15 + i * 15}%`,
              `${25 + i * 10 + mousePosition.y * 0.05}%`,
              `${15 + i * 15}%`,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: speed + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Mesh grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mesh-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-400"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh-grid)" />
      </svg>
    </div>
  );
}
