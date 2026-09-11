import React, { useMemo } from 'react';

export const StarBackground: React.FC = () => {
  // Generate random twinkling stars once
  const stars = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: `${(i * 137.5) % 100}%`,
      top: `${(i * 73.1) % 100}%`,
      size: (i % 3) + 2,
      duration: 2 + (i % 4),
      delay: (i * 0.2) % 3,
      opacity: 0.3 + ((i % 5) * 0.14),
      color: i % 4 === 0 ? '#fde047' : i % 4 === 1 ? '#67e8f9' : i % 4 === 2 ? '#f472b6' : '#ffffff'
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-b from-[#090b24] via-[#10143d] to-[#1e1045]">
      {/* Soft cosmic glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`
          }}
        />
      ))}

      {/* Cute distant floating planets decoration */}
      <div className="absolute top-12 right-12 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 opacity-30 blur-[1px] animate-float" />
      <div className="absolute bottom-24 left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-400 opacity-25 blur-[1px] animate-float-slow" />
      <div className="absolute top-1/3 left-6 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-red-400 opacity-20 blur-[1px]" />
    </div>
  );
};
