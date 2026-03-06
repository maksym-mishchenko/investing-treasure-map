'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zones } from '@/lib/zones';
import { isZoneUnlocked, isZoneCompleted } from '@/lib/progress';
import Particles from '@/components/Particles';
import Quiz from '@/components/Quiz';

export default function ZonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const zone = zones.find((z) => z.slug === slug);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!zone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">🌀 Zone not found</p>
          <Link href="/" className="text-[#ff1744] hover:underline font-cinzel text-sm tracking-widest">
            ← Back to Map
          </Link>
        </div>
      </div>
    );
  }

  const unlocked = mounted ? isZoneUnlocked(zone.id) : zone.id === 1;
  const completed = mounted ? isZoneCompleted(zone.id) : false;

  if (mounted && !unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">🔒</p>
          <h2 className="font-cinzel text-xl mb-2 text-gray-400">Zone Locked</h2>
          <p className="text-sm text-gray-600 mb-6">Complete Zone {zone.id - 1} to unlock this area.</p>
          <Link href="/" className="text-[#ff1744] hover:underline font-cinzel text-sm tracking-widest">
            ← Back to Map
          </Link>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen relative">
        <Particles />
        <div className="relative z-10 px-4 py-12">
          <div className="max-w-xl mx-auto mb-8">
            <button
              onClick={() => setShowQuiz(false)}
              className="text-xs text-gray-500 hover:text-gray-300 font-cinzel tracking-widest"
            >
              ← Back to Zone
            </button>
            <h2
              className="font-cinzel text-xl mt-4 tracking-wide"
              style={{ color: zone.color }}
            >
              {zone.icon} Quiz: {zone.name}
            </h2>
          </div>
          <Quiz
            questions={zone.quiz}
            zoneId={zone.id}
            zoneColor={zone.color}
            onComplete={() => router.push('/')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Particles />

      <div className="relative z-10 px-4 py-12 max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-block text-xs text-gray-500 hover:text-gray-300 font-cinzel tracking-widest mb-8"
        >
          ← Back to Map
        </Link>

        {/* Zone Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] font-cinzel tracking-widest"
              style={{ color: zone.color }}
            >
              Zone {zone.id}
            </span>
            <span className="text-[10px] text-gray-600">· {zone.hawkinsLocation}</span>
            {completed && (
              <span className="text-[10px] text-[#00e5ff] ml-auto">✓ Completed</span>
            )}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{zone.icon}</span>
            <div>
              <h1
                className="font-cinzel text-2xl sm:text-3xl tracking-wide"
                style={{ color: zone.color }}
              >
                {zone.name}
              </h1>
              <p className="text-sm text-gray-400">{zone.subtitle}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{zone.description}</p>
        </div>

        {/* Resources */}
        <div className="mb-12">
          <h2 className="font-cinzel text-sm tracking-widest text-gray-400 mb-4">
            📚 Resources
          </h2>
          <div className="space-y-3">
            {zone.resources.map((resource, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/10 p-4 hover:border-white/20 transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{resource.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{resource.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-gray-500">
                        {resource.type}
                      </span>
                    </div>
                    {resource.author && (
                      <p className="text-xs text-gray-500 mb-1">by {resource.author}</p>
                    )}
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {resource.description}
                    </p>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-2 inline-block hover:underline"
                        style={{ color: zone.color }}
                      >
                        Visit →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div
          className="rounded-lg border p-5 mb-10"
          style={{
            borderColor: `${zone.color}30`,
            backgroundColor: `${zone.color}05`,
          }}
        >
          <h3 className="font-cinzel text-xs tracking-widest mb-2" style={{ color: zone.color }}>
            💡 Key Takeaway
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{zone.keyTakeaway}</p>
        </div>

        {/* Take the Quiz Button */}
        <div className="text-center">
          <button
            onClick={() => setShowQuiz(true)}
            className="px-10 py-4 rounded-xl font-cinzel text-sm tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: zone.color,
              color: '#0a0a0a',
              boxShadow: `0 0 30px ${zone.color}40, 0 0 60px ${zone.color}20`,
            }}
          >
            {completed ? '🔄 Retake Quiz' : '⚡ Take the Quiz'}
          </button>
          <p className="text-xs text-gray-600 mt-3">
            {completed
              ? 'You already passed! Retake to improve your score.'
              : `Answer ${Math.ceil(zone.quiz.length * 0.6)} of ${zone.quiz.length} correctly to unlock the next zone`}
          </p>
        </div>
      </div>
    </div>
  );
}
