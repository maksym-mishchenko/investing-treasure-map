'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { zones } from '@/lib/zones';
import { isZoneUnlocked, isZoneCompleted } from '@/lib/progress';
import Particles from '@/components/Particles';
import MapPath from '@/components/MapPath';
import { useAuth } from '@/components/AuthProvider';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const username = user?.username ?? 'diana';

  return (
    <div className="min-h-screen relative">
      <Particles />

      <div className="relative z-10 flex flex-col items-center px-4 py-16 sm:py-24">
        {/* Title */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-cinzel text-center mb-3 neon-glow"
          style={{ '--neon-color': '#ff1744' } as React.CSSProperties}
        >
          {"Diana's Investment Journey"}
        </h1>
        {user && (
          <p className="text-xs font-cinzel tracking-widest mb-2" style={{ color: 'rgba(255,23,68,0.6)' }}>
            Welcome, {user.displayName}
          </p>
        )}
        <p className="text-gray-400 text-center text-sm sm:text-base max-w-lg mb-4">
          Navigate through Hawkins. Learn to invest. Escape the Upside Down.
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-12">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00e5ff]" /> Completed
          <span className="inline-block w-2 h-2 rounded-full bg-[#ffab00] ml-3" /> Current
          <span className="inline-block w-2 h-2 rounded-full bg-gray-600 ml-3" /> Locked
        </div>

        {/* Zone Map */}
        <div className="w-full max-w-md flex flex-col items-center">
          {zones.map((zone, i) => {
            const unlocked = mounted ? isZoneUnlocked(username, zone.id) : zone.id === 1;
            const completed = mounted ? isZoneCompleted(username, zone.id) : false;
            const isCurrent = unlocked && !completed;

            return (
              <div key={zone.id} className="w-full flex flex-col items-center">
                {i > 0 && (
                  <MapPath color={completed ? '#00e5ff' : isCurrent ? zone.color : '#333'} />
                )}

                {unlocked ? (
                  <Link href={`/zone/${zone.slug}`} className="w-full group">
                    <div
                      className={`relative w-full rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] ${
                        isCurrent ? 'pulse-border' : ''
                      }`}
                      style={{
                        borderColor: completed ? '#00e5ff' : isCurrent ? zone.color : '#333',
                        backgroundColor: completed
                          ? 'rgba(0,229,255,0.03)'
                          : isCurrent
                          ? `${zone.color}08`
                          : 'rgba(255,255,255,0.02)',
                        boxShadow: completed
                          ? '0 0 20px rgba(0,229,255,0.1)'
                          : isCurrent
                          ? `0 0 25px ${zone.color}20`
                          : 'none',
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{completed ? '✅' : zone.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] font-cinzel tracking-widest"
                              style={{ color: completed ? '#00e5ff' : zone.color }}
                            >
                              Zone {zone.id}
                            </span>
                            <span className="text-[10px] text-gray-600">
                              · {zone.hawkinsLocation}
                            </span>
                          </div>
                          <h3
                            className="font-cinzel text-sm sm:text-base mb-1 tracking-wide"
                            style={{
                              color: completed ? '#00e5ff' : isCurrent ? zone.color : '#ededed',
                            }}
                          >
                            {zone.name}
                          </h3>
                          <p className="text-xs text-gray-500">{zone.subtitle}</p>
                        </div>
                        <span
                          className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: zone.color }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="w-full rounded-xl border border-gray-800 p-5 opacity-40"
                    style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl grayscale">🔒</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-cinzel tracking-widest text-gray-600">
                            Zone {zone.id}
                          </span>
                          <span className="text-[10px] text-gray-700">
                            · {zone.hawkinsLocation}
                          </span>
                        </div>
                        <h3 className="font-cinzel text-sm sm:text-base mb-1 tracking-wide text-gray-600">
                          {zone.name}
                        </h3>
                        <p className="text-xs text-gray-700">Complete Zone {zone.id - 1} to unlock</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-600 font-cinzel tracking-widest">
            &quot;Friends don&apos;t let friends not invest&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
