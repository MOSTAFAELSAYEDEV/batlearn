import { useState, useCallback } from 'react';
import { TutorMessage } from '../types';
import { sendTutorMessage, getHint, checkAnswer } from '../services/aiTutor';
import { useAppStore } from '../store/appStore';

export function useAITutor() {
  const { chatHistory, addMessage, clearHistory, _hasHydrated } = useAppStore();
  const [loading, setLoading] = useState(false);

  // Return empty messages until hydrated to avoid flash of empty state
  const messages = _hasHydrated ? chatHistory?.aiTutor || [] : [];

  const sendMessage = useCallback(
    async (
      content: string,
      context?: {
        problemId?: string;
        category?: 'sql' | 'erd' | 'mapping' | 'normalization';
        currentProblem?: any;
      }
    ) => {
      const userMessage: TutorMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
        context,
      };

      addMessage('aiTutor', userMessage);
      setLoading(true);

      try {
        const response = await sendTutorMessage([...messages, userMessage], context);
        const assistantMessage: TutorMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          context,
        };
        addMessage('aiTutor', assistantMessage);
      } catch (error: any) {
        const errorMessage: TutorMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Error: ${error.message || 'Failed to get response'}`,
          timestamp: new Date(),
          context,
        };
        addMessage('aiTutor', errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [messages, addMessage]
  );

  const requestHint = useCallback(
    async (
      problemId: string,
      category: 'sql' | 'erd' | 'mapping' | 'normalization',
      currentAttempt?: string
    ) => {
      setLoading(true);
      try {
        const hint = await getHint(problemId, category, currentAttempt);
        const hintMessage: TutorMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: hint,
          timestamp: new Date(),
          context: { problemId, category },
        };
        addMessage('aiTutor', hintMessage);
      } catch (error: any) {
        const errorMessage: TutorMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Error: ${error.message || 'Failed to get hint'}`,
          timestamp: new Date(),
          context: { problemId, category },
        };
        addMessage('aiTutor', errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [addMessage]
  );

  const validateAnswer = useCallback(
    async (
      problemId: string,
      category: 'sql' | 'erd' | 'mapping' | 'normalization',
      studentAnswer: string,
      correctAnswer?: string
    ) => {
      setLoading(true);
      try {
        const feedback = await checkAnswer(problemId, category, studentAnswer, correctAnswer);
        const feedbackMessage: TutorMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: feedback,
          timestamp: new Date(),
          context: { problemId, category },
        };
        addMessage('aiTutor', feedbackMessage);
      } catch (error: any) {
        const errorMessage: TutorMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Error: ${error.message || 'Failed to validate answer'}`,
          timestamp: new Date(),
          context: { problemId, category },
        };
        addMessage('aiTutor', errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [addMessage]
  );

  const clearMessages = useCallback(() => {
    clearHistory('aiTutor');
  }, [clearHistory]);

  return {
    messages,
    loading,
    sendMessage,
    requestHint,
    validateAnswer,
    clearMessages,
  };
}
