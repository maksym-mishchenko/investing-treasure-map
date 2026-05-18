'use client';

import { useEffect, useState } from 'react';

interface Spore {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

export default function Particles() {
  const [spores, setSpores] = useState<Spore[]>([]);

  useEffect(() => {
    const generated: Spore[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 1,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 10 + 8}s`,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpores(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {spores.map((s) => (
        <div
          key={s.id}
          className="spore"
          style={{
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
