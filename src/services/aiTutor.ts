import { TutorMessage } from '../types';

// Google Gemini API - FREE tier available!
const GEMINI_API_KEY = 'AIzaSyD0DviKj-oW8BhTk-nOloyXyuF3_vkrzVQ';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are an expert database tutor helping students learn SQL, ERD, Database Mapping, and Normalization.

CRITICAL RULES:
1. Only use information from the provided curriculum documents.
2. USE EXACT IDENTIFIERS from the curriculum. (e.g., Use 'salesman' table with columns 'name' and 'commission', NOT 'SALESPEOPLE', 'SNAME', or 'COMM').
3. Never introduce external examples or concepts.
4. Always reference specific problems from the curriculum when helping.
5. Provide step-by-step explanations.
6. Support both English and Arabic.
7. Be encouraging and patient.
8. Provide a clear explanation first, then provide the final answer in a section clearly labeled 'final Solution:'.
9. Validate student answers against curriculum solutions.

You are helping students understand database concepts through interactive learning.`;

export async function sendTutorMessage(
  messages: TutorMessage[],
  context?: {
    problemId?: string;
    category?: 'sql' | 'erd' | 'mapping' | 'normalization';
    currentProblem?: any;
  }
): Promise<string> {
  try {
    const contextPrompt = context
      ? `\n\nCurrent Context:\n- Category: ${context.category || 'general'}\n- Problem ID: ${context.problemId || 'none'}\n- Current Problem: ${JSON.stringify(context.currentProblem || {})}`
      : '';

    // Format conversation for Gemini
    const conversationText = messages.map(m =>
      `${m.role === 'user' ? 'Student' : 'AI Tutor'}: ${m.content}`
    ).join('\n\n');

    const fullPrompt = `${SYSTEM_PROMPT}${contextPrompt}\n\n${conversationText}\n\nAI Tutor:`;

    const payload = {
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      }
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      return "I'm currently receiving too many requests. Please wait a moment and try again.";
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'I apologize, but I could not generate a response.';
  } catch (error: any) {
    if (error.message && error.message.includes('429')) {
      return "I'm currently receiving too many requests. Please wait a moment and try again.";
    }
    console.error('AI Tutor error:', error);
    return `Error: ${error.message || 'Failed to get AI response'}`;
  }
}

export async function getHint(
  problemId: string,
  category: 'sql' | 'erd' | 'mapping' | 'normalization',
  currentAttempt?: string
): Promise<string> {
  const messages: TutorMessage[] = [
    {
      id: 'hint-request',
      role: 'user',
      content: `I need a hint for problem ${problemId} in ${category}. ${currentAttempt ? `My current attempt: ${currentAttempt}` : ''}`,
      timestamp: new Date(),
    },
  ];

  return sendTutorMessage(messages, { problemId, category });
}

export async function checkAnswer(
  problemId: string,
  category: 'sql' | 'erd' | 'mapping' | 'normalization',
  studentAnswer: string,
  correctAnswer?: string
): Promise<string> {
  const messages: TutorMessage[] = [
    {
      id: 'check-answer',
      role: 'user',
      content: `Please check my answer for problem ${problemId} in ${category}.\n\nMy answer:\n${studentAnswer}\n\n${correctAnswer ? `Correct answer:\n${correctAnswer}` : ''}\n\nPlease provide feedback and explain any mistakes.`,
      timestamp: new Date(),
    },
  ];

  return sendTutorMessage(messages, { problemId, category });
}
