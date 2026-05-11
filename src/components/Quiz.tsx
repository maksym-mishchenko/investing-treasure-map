'use client';

import { useState, useCallback } from 'react';
import type { QuizQuestion } from '@/lib/zones';
import { completeZone } from '@/lib/progress';

interface QuestionResult {
  questionIndex: number;
  correct: boolean;
  correctIndex: number;
  explanation: string;
}

interface ApiResponse {
  score: number;
  total: number;
  passed: boolean;
  results: QuestionResult[];
}

interface QuizProps {
  questions: QuizQuestion[];
  zoneSlug: string;
  zoneId: number;
  zoneColor: string;
  username: string;
  onComplete: (score: number, total: number) => void;
}

export default function Quiz({ questions, zoneSlug, zoneId, zoneColor, username, onComplete }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [shuffledQuestions] = useState(() =>
    [...questions].sort(() => Math.random() - 0.5)
  );

  const current = shuffledQuestions[currentIdx];

  const handleSelect = useCallback(
    (idx: number) => {
      setSelectedOption(idx);
    },
    []
  );

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIdx + 1 >= shuffledQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }, [currentIdx, shuffledQuestions.length, selectedOption, userAnswers]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);

    const orderedAnswers = questions.map((originalQ) => {
      const shuffledIdx = shuffledQuestions.findIndex((q) => q.question === originalQ.question);
      return userAnswers[shuffledIdx];
    });

    const res = await fetch('/api/quiz/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zoneSlug, answers: orderedAnswers }),
    });
    const data: ApiResponse = await res.json();
    setApiResult(data);

    if (data.passed) {
      completeZone(username, zoneId, data.score);
    }

    setSubmitting(false);
  }, [questions, shuffledQuestions, userAnswers, zoneSlug, zoneId]);

  const handleRetry = useCallback(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setFinished(false);
    setApiResult(null);
    setSubmitting(false);
  }, []);

  if (apiResult) {
    const { score, total, passed, results } = apiResult;
    const passingCount = Math.ceil(total * 0.6);

    return (
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
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
            Score: {score} / {total}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {passed
              ? 'The next zone is now unlocked. Keep going!'
              : `You need ${passingCount} correct answers to pass. Review the resources and try again.`}
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {shuffledQuestions.map((q, shuffledIdx) => {
            const originalIdx = questions.findIndex((oq) => oq.question === q.question);
            const result = results.find((r) => r.questionIndex === originalIdx);
            if (!result) return null;

            return (
              <div
                key={shuffledIdx}
                className="rounded-lg border p-4"
                style={{
                  borderColor: result.correct ? '#4caf5040' : '#ff174440',
                  backgroundColor: result.correct
                    ? 'rgba(76,175,80,0.05)'
                    : 'rgba(255,23,68,0.05)',
                }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: result.correct ? '#4caf50' : '#ff1744' }}>
                  {result.correct ? '✓ Correct' : '✗ Incorrect'} — Q{shuffledIdx + 1}
                </p>
                <p className="text-sm text-gray-300 mb-2">{q.question}</p>
                {!result.correct && (
                  <p className="text-xs text-gray-500 mb-1">
                    Correct answer: <span className="text-gray-300">{q.options[result.correctIndex]}</span>
                  </p>
                )}
                <p className="text-xs text-gray-400">{result.explanation}</p>
              </div>
            );
          })}
        </div>

        {passed ? (
          <div className="text-center">
            <button
              onClick={() => onComplete(score, total)}
              className="px-8 py-3 rounded-lg font-cinzel text-sm tracking-widest transition-all"
              style={{
                backgroundColor: zoneColor,
                color: '#0a0a0a',
                boxShadow: `0 0 20px ${zoneColor}80`,
              }}
            >
              Continue Journey →
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={handleRetry}
              className="px-8 py-3 rounded-lg font-cinzel text-sm tracking-widest border transition-all hover:bg-white/5"
              style={{ borderColor: '#ff1744', color: '#ff1744' }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="text-5xl mb-6">📋</div>
        <h2 className="text-2xl font-cinzel mb-4" style={{ color: zoneColor }}>
          All Questions Answered
        </h2>
        <p className="text-gray-400 mb-8">
          You answered all {shuffledQuestions.length} questions. Ready to see your results?
        </p>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-10 py-4 rounded-xl font-cinzel text-sm tracking-widest transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: zoneColor,
            color: '#0a0a0a',
            boxShadow: `0 0 30px ${zoneColor}40`,
          }}
        >
          {submitting ? 'Checking...' : 'Submit Quiz'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-gray-500 font-cinzel tracking-widest">
          Question {currentIdx + 1} of {shuffledQuestions.length}
        </span>
        <span className="text-xs text-gray-500">
          {userAnswers.length} answered
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
          const isSelected = idx === selectedOption;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 hover:border-white/30"
              style={{
                borderColor: isSelected ? zoneColor : 'rgba(255,255,255,0.1)',
                backgroundColor: isSelected ? `${zoneColor}15` : 'transparent',
                color: '#ededed',
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

      {selectedOption !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg font-cinzel text-sm tracking-widest transition-all"
          style={{
            backgroundColor: zoneColor,
            color: '#0a0a0a',
            boxShadow: `0 0 15px ${zoneColor}60`,
          }}
        >
          {currentIdx + 1 >= shuffledQuestions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
