'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zones } from '@/lib/zones';
import { isZoneUnlocked, isZoneCompleted, completeZone } from '@/lib/progress';
import Particles from '@/components/Particles';
import Quiz from '@/components/Quiz';
import ZoneRating from '@/components/ZoneRating';
import CompletionModal from '@/components/CompletionModal';
import { useAuth } from '@/components/AuthProvider';
import StockTicker from '@/components/StockTicker';
import CompoundInterestCalc from '@/components/calculators/CompoundInterestCalc';
import DividendCalc from '@/components/calculators/DividendCalc';
import PortfolioAllocator from '@/components/calculators/PortfolioAllocator';
import JournalPrompt from '@/components/JournalPrompt';
import { checkAndAwardBadges } from '@/lib/badge-checker';

export default function ZonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const zone = zones.find((z) => z.slug === slug);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!zone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">🌀 Zone not found</p>
          <Link href="/" className="text-[#ff1744] hover:underline font-neon text-sm tracking-widest">
            ← Back to Map
          </Link>
        </div>
      </div>
    );
  }

  const username = user?.username ?? 'guest';
  const admin = user?.role === 'admin';
  const unlocked = mounted ? (admin || isZoneUnlocked(username, zone.id)) : zone.id === 1;
  const completed = mounted ? isZoneCompleted(username, zone.id) : false;

  if (mounted && !unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">🔒</p>
          <h2 className="font-neon text-xl mb-2 text-gray-400">Zone Locked</h2>
          <p className="text-sm text-gray-600 mb-6">Complete Zone {zone.id - 1} to unlock this area.</p>
          <Link href="/" className="text-[#ff1744] hover:underline font-neon text-sm tracking-widest">
            ← Back to Map
          </Link>
        </div>
      </div>
    );
  }

  function handleSkipQuiz() {
    completeZone(username, zone!.id, zone!.quiz.length);
    router.push('/');
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen relative">
        <Particles />
        <div className="relative z-10 px-4 py-12">
          {/* pr-24 reserves space for the fixed auth pill on mobile */}
          <div className="max-w-xl mx-auto mb-8 pr-24 sm:pr-0">
            <button
              onClick={() => setShowQuiz(false)}
              className="text-xs text-gray-500 hover:text-gray-300 font-neon tracking-widest"
            >
              ← Back to Zone
            </button>
            <h2
              className="font-neon text-xl mt-4 tracking-wide"
              style={{ color: zone.color }}
            >
              {zone.icon} Quiz: {zone.name}
            </h2>
          </div>
          <Quiz
            questions={zone.quiz}
            zoneSlug={zone.slug}
            zoneId={zone.id}
            zoneColor={zone.color}
            username={username}
            onComplete={(score, total) => {
              setQuizCompleted(true);
              if (user?.authenticated) {
                checkAndAwardBadges(zone.id, score, total, username).catch(() => {});
              }
            }}
          />
          {quizCompleted && (
            <>
              <div className="max-w-xl mx-auto">
                <ZoneRating zoneSlug={zone.slug} zoneColor={zone.color} />
                {zone.journalPrompt && (
                  <JournalPrompt
                    zoneSlug={zone.slug}
                    zoneId={zone.id}
                    zoneColor={zone.color}
                    journalPrompt={zone.journalPrompt}
                  />
                )}
                <div className="text-center mt-6 space-y-3">
                  {zone.id < zones.length ? (
                    <button
                      onClick={() => router.push(`/zone/${zones[zone.id].slug}`)}
                      className="px-8 py-3 rounded-xl font-neon text-sm tracking-widest transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: zones[zone.id].color,
                        color: '#0a0a0a',
                        boxShadow: `0 0 20px ${zones[zone.id].color}40`,
                      }}
                    >
                      Next Zone: {zones[zone.id].name} →
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/')}
                      className="px-8 py-3 rounded-xl font-neon text-sm tracking-widest transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: '#00e5ff',
                        color: '#0a0a0a',
                        boxShadow: '0 0 20px rgba(0,229,255,0.4)',
                      }}
                    >
                      🏆 View Your Map
                    </button>
                  )}
                  <div>
                    <button
                      onClick={() => router.push('/')}
                      className="text-xs font-neon tracking-widest text-gray-600 hover:text-gray-400"
                    >
                      ← Back to Map
                    </button>
                  </div>
                </div>
              </div>
              {zone.id === zones.length && <CompletionModal />}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Particles />

      <div className="relative z-10 px-4 py-12 max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-xs text-gray-500 hover:text-gray-300 font-neon tracking-widest mb-8"
        >
          ← Back to Map
        </Link>

        {/* pr-24 reserves space for the fixed auth pill on mobile */}
        <div className="mb-10 pr-24 sm:pr-0">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] font-neon tracking-widest"
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
                className="font-neon text-2xl sm:text-3xl tracking-wide"
                style={{ color: zone.color }}
              >
                {zone.name}
              </h1>
              <p className="text-sm text-gray-400">{zone.subtitle}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{zone.description}</p>
        </div>

        {zone.tickerSymbols && zone.tickerSymbols.length > 0 && (
          <StockTicker symbols={zone.tickerSymbols} zoneColor={zone.color} />
        )}

        <div className="mb-12">
          <h2 className="font-neon text-sm tracking-widest text-gray-400 mb-4">
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

        {/* Calculator */}
        {zone.calculator === 'compound' && <CompoundInterestCalc />}
        {zone.calculator === 'dividend' && <DividendCalc />}
        {zone.calculator === 'portfolio' && <PortfolioAllocator />}

        <div
          className="rounded-lg border p-5 mb-10"
          style={{
            borderColor: `${zone.color}30`,
            backgroundColor: `${zone.color}05`,
          }}
        >
          <h3 className="font-neon text-xs tracking-widest mb-2" style={{ color: zone.color }}>
            💡 Key Takeaway
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{zone.keyTakeaway}</p>
        </div>

        <div className="text-center space-y-3">
          <button
            onClick={() => setShowQuiz(true)}
            className="px-10 py-4 rounded-xl font-neon text-sm tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: zone.color,
              color: '#0a0a0a',
              boxShadow: `0 0 30px ${zone.color}40, 0 0 60px ${zone.color}20`,
            }}
          >
            {completed ? '🔄 Retake Quiz' : '⚡ Take the Quiz'}
          </button>

          {admin && (
            <div>
              <button
                onClick={handleSkipQuiz}
                className="px-8 py-3 rounded-xl font-neon text-xs tracking-widest transition-all duration-300 hover:scale-105 border"
                style={{
                  borderColor: 'rgba(255,23,68,0.4)',
                  color: 'rgba(255,23,68,0.7)',
                  backgroundColor: 'rgba(255,23,68,0.05)',
                }}
              >
                ⚡ Skip Quiz
              </button>
            </div>
          )}

          <p className="text-xs text-gray-600">
            {completed
              ? 'You already passed! Retake to improve your score.'
              : `Answer ${Math.ceil(zone.quiz.length * 0.6)} of ${zone.quiz.length} correctly to unlock the next zone`}
          </p>
        </div>
      </div>
    </div>
  );
}
