'use client';

import { useState, useCallback } from 'react';
import type { QuizQuestion } from '@/lib/zones';
import { completeZone } from '@/lib/progress';

interface QuizProps {
  questions: QuizQuestion[];
  zoneId: number;
  zoneColor: string;
  onComplete: () => void;
}

export default function Quiz({ questions, zoneId, zoneColor, onComplete }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    [...questions].sort(() => Math.random() - 0.5)
  );

  const current = shuffledQuestions[currentIdx];
  const isCorrect = selectedOption === current?.correctIndex;
  const passingScore = Math.ceil(shuffledQuestions.length * 0.6);
  const passed = score >= passingScore;

  const handleSelect = useCallback(
    (idx: number) => {
      if (showResult) return;
      setSelectedOption(idx);
      setShowResult(true);
      if (idx === current.correctIndex) {
        setScore((s) => s + 1);
      }
    },
    [showResult, current]
  );

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= shuffledQuestions.length) {
      const finalScore = score + (isCorrect ? 0 : 0);
      setFinished(true);
      if (finalScore >= passingScore) {
        completeZone(zoneId, finalScore);
      }
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  }, [currentIdx, shuffledQuestions.length, score, isCorrect, passingScore, zoneId]);

  const handleRetry = useCallback(() => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setFinished(false);
  }, [questions]);

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div
          className="text-6xl mb-6"
          style={{ textShadow: `0 0 30px ${zoneColor}` }}
        >
          {passed ? '🎉' : '💀'}
        </div>
        <h2
          className="text-3xl font-cinzel mb-4"
          style={{ color: passed ? zoneColor : '#ff1744' }}
        >
          {passed ? 'Zone Completed!' : 'The Upside Down Got You'}
        </h2>
        <p className="text-lg text-gray-300 mb-2">
          Score: {score} / {shuffledQuestions.length}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          {passed
            ? 'The next zone is now unlocked. Keep going!'
            : `You need ${passingScore} correct answers to pass. Review the resources and try again.`}
        </p>
        {passed ? (
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-lg font-cinzel text-sm tracking-widest transition-all"
            style={{
              backgroundColor: zoneColor,
              color: '#0a0a0a',
              boxShadow: `0 0 20px ${zoneColor}80`,
            }}
          >
            Continue Journey →
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="px-8 py-3 rounded-lg font-cinzel text-sm tracking-widest border transition-all hover:bg-white/5"
            style={{ borderColor: '#ff1744', color: '#ff1744' }}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-gray-500 font-cinzel tracking-widest">
          Question {currentIdx + 1} of {shuffledQuestions.length}
        </span>
        <span className="text-xs" style={{ color: zoneColor }}>
          Score: {score}
        </span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-1 mb-8">
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIdx + 1) / shuffledQuestions.length) * 100}%`,
            backgroundColor: zoneColor,
            boxShadow: `0 0 8px ${zoneColor}`,
          }}
        />
      </div>

      <h3 className="text-xl font-semibold mb-8 leading-relaxed">
        {current.question}
      </h3>

      <div className="space-y-3 mb-8">
        {current.options.map((opt, idx) => {
          let borderColor = 'rgba(255,255,255,0.1)';
          let bg = 'transparent';
          let textColor = '#ededed';

          if (showResult) {
            if (idx === current.correctIndex) {
              borderColor = '#4caf50';
              bg = 'rgba(76,175,80,0.1)';
              textColor = '#4caf50';
            } else if (idx === selectedOption && idx !== current.correctIndex) {
              borderColor = '#ff1744';
              bg = 'rgba(255,23,68,0.1)';
              textColor = '#ff1744';
            }
          } else if (idx === selectedOption) {
            borderColor = zoneColor;
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className="w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 hover:border-white/30"
              style={{
                borderColor,
                backgroundColor: bg,
                color: textColor,
                cursor: showResult ? 'default' : 'pointer',
              }}
            >
              <span className="text-xs text-gray-500 mr-3">
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div
          className="rounded-lg p-4 mb-6 border"
          style={{
            borderColor: isCorrect ? '#4caf5040' : '#ff174440',
            backgroundColor: isCorrect
              ? 'rgba(76,175,80,0.05)'
              : 'rgba(255,23,68,0.05)',
          }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: isCorrect ? '#4caf50' : '#ff1744' }}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
          </p>
          <p className="text-sm text-gray-400">{current.explanation}</p>
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg font-cinzel text-sm tracking-widest transition-all"
          style={{
            backgroundColor: zoneColor,
            color: '#0a0a0a',
            boxShadow: `0 0 15px ${zoneColor}60`,
          }}
        >
          {currentIdx + 1 >= shuffledQuestions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
