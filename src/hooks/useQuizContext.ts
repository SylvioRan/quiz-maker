import {createContext, useContext} from "react";
import type {QuizContextType} from "../context/QuizContext.tsx";

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('No context found : useQuiz must be used within a QuizProvider');
  }
  return context;
}