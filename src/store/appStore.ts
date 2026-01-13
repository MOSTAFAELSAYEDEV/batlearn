import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Progress, UserSettings, TutorMessage } from '../types';

interface AppState {
  // Persistence status
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  // Progress tracking
  progress: Progress;
  updateProgress: (category: keyof Progress, problemId: string) => void;

  // User settings
  settings: Omit<UserSettings, 'id'>;
  updateSettings: (settings: Partial<Omit<UserSettings, 'id'>>) => void;

  // Chat History
  chatHistory: {
    aiTutor: TutorMessage[];
    batBot: TutorMessage[];
  };
  addMessage: (type: 'aiTutor' | 'batBot', message: TutorMessage) => void;
  clearHistory: (type: 'aiTutor' | 'batBot') => void;

  // Current database
  currentDatabase: 'salesman' | 'nobel' | 'tutor' | 'university';
  setCurrentDatabase: (db: 'salesman' | 'nobel' | 'tutor' | 'university') => void;

  // Current problem context
  currentProblem: {
    id?: string;
    category?: 'sql' | 'erd' | 'mapping' | 'normalization';
  } | null;
  setCurrentProblem: (problem: { id: string; category: 'sql' | 'erd' | 'mapping' | 'normalization' } | null) => void;

  // SQL Practice State
  sqlQueries: Record<string, string>;
  setSQLQuery: (problemId: string, partId: string, query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      progress: {
        sql: { completed: [], total: 0 },
        erd: { completed: [], total: 0 },
        mapping: { completed: [], total: 0 },
        normalization: { completed: [], total: 0 },
      },
      updateProgress: (category, problemId) =>
        set((state) => {
          const newCompleted = state.progress[category].completed.includes(problemId)
            ? state.progress[category].completed
            : [...state.progress[category].completed, problemId];
          return {
            progress: {
              ...state.progress,
              [category]: {
                ...state.progress[category],
                completed: newCompleted,
              },
            },
          };
        }),

      settings: {
        theme: 'light',
        language: 'en',
        fontSize: 14,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      chatHistory: {
        aiTutor: [],
        batBot: [],
      },
      addMessage: (type, message) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [type]: [...state.chatHistory[type], message],
          },
        })),
      clearHistory: (type) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [type]: [],
          },
        })),

      currentDatabase: 'salesman',
      setCurrentDatabase: (db) => set({ currentDatabase: db }),

      currentProblem: null,
      setCurrentProblem: (problem) => set({ currentProblem: problem }),

      sqlQueries: {},
      setSQLQuery: (problemId, partId, query) =>
        set((state) => ({
          sqlQueries: {
            ...state.sqlQueries,
            [`${problemId}-${partId}`]: query,
          },
        })),
    }),
    {
      name: 'batlearn-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
