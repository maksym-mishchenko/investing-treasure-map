import { NextRequest } from 'next/server';
import { quizAnswers } from '@/lib/quiz-answers';

interface CheckRequest {
  zoneSlug: string;
  answers: number[];
}

interface QuestionResult {
  questionIndex: number;
  correct: boolean;
  correctIndex: number;
  explanation: string;
}

export async function POST(request: NextRequest) {
  const { zoneSlug, answers }: CheckRequest = await request.json();

  const zoneAnswers = quizAnswers[zoneSlug];
  if (!zoneAnswers) {
    return Response.json({ error: 'Unknown zone' }, { status: 404 });
  }

  if (answers.length !== zoneAnswers.length) {
    return Response.json({ error: 'Answer count mismatch' }, { status: 400 });
  }

  const results: QuestionResult[] = zoneAnswers.map((answer, i) => ({
    questionIndex: i,
    correct: answers[i] === answer.correctIndex,
    correctIndex: answer.correctIndex,
    explanation: answer.explanation,
  }));

  const score = results.filter((r) => r.correct).length;
  const total = results.length;
  const passed = score / total >= 0.6;

  return Response.json({ score, total, passed, results });
}
