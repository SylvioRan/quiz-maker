import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import {type ReactNode, useCallback, useMemo, useState} from "react";
import {QuizContext} from "../hooks/useQuizContext.ts";

export type QuizContextType = {
  quiz: QuizzCaracteristics[];
  setQuiz: (q: QuizzCaracteristics[]) => void;
  answers: Record<string, string>,
  setAnswer: (questionId: string, answer: string) => void;
  resetAnswers: () => void;
};

export type QuizProviderProps = {
  children: ReactNode;
};

export function QuizProvider({children}: QuizProviderProps) {
  const [quiz, setQuiz] = useState<QuizzCaracteristics[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = useCallback((questionId: string, answer: string): void => {
    setAnswers((prev) => ({...prev, [questionId]: answer}));
  }, []);

  const resetAnswers = useCallback(() => {
    setQuiz([]);
    setAnswers({});
  }, []);
  const value = useMemo(() => ({
    quiz,
    setQuiz,
    answers,
    setAnswer,
    resetAnswers
  }), [quiz, answers, setAnswer, resetAnswers]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
