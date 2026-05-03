import { NextRequest } from 'next/server';
import { quizAnswers } from '@/lib/quiz-answers';

interface CheckRequest {
  zoneSlug: string;
  answers: number[];
}

interface QuestionResult {
  questionIndex: number;
  correct: boolean;
  correctIndex?: number;
  explanation?: string;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { zoneSlug, answers } = body as CheckRequest;

  if (typeof zoneSlug !== 'string' || !Array.isArray(answers) || !answers.every(a => typeof a === 'number')) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }

  const zoneAnswers = quizAnswers[zoneSlug];
  if (!zoneAnswers) {
    return Response.json({ error: 'Unknown zone' }, { status: 404 });
  }

  if (answers.length !== zoneAnswers.length) {
    return Response.json({ error: 'Answer count mismatch' }, { status: 400 });
  }

  const results: QuestionResult[] = zoneAnswers.map((answer, i) => {
    const correct = answers[i] === answer.correctIndex;
    return {
      questionIndex: i,
      correct,
      // Only reveal correct answer and explanation for correct responses
      ...(correct ? { correctIndex: answer.correctIndex, explanation: answer.explanation } : {}),
    };
  });

  const score = results.filter((r) => r.correct).length;
  const total = results.length;
  const passed = score / total >= 0.6;

  // Reveal all explanations only after passing
  const finalResults = passed
    ? zoneAnswers.map((answer, i) => ({
        questionIndex: i,
        correct: answers[i] === answer.correctIndex,
        correctIndex: answer.correctIndex,
        explanation: answer.explanation,
      }))
    : results;

  return Response.json({ score, total, passed, results: finalResults });
}
