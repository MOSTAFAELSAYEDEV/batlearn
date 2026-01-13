import { useState, useCallback } from 'react';
import { TutorMessage } from '../types';
import { sendBatBotMessage } from '../services/batBot';
import { useAppStore } from '../store/appStore';

export function useBatBot() {
    const { chatHistory, addMessage, clearHistory, _hasHydrated } = useAppStore();
    const [loading, setLoading] = useState(false);

    // Return empty messages until hydrated to avoid flash of empty state
    const messages = _hasHydrated ? chatHistory?.batBot || [] : [];

    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim()) return;

            const userMessage: TutorMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: content.trim(),
                timestamp: new Date(),
            };

            addMessage('batBot', userMessage);
            setLoading(true);

            try {
                const response = await sendBatBotMessage([...messages, userMessage]);
                const assistantMessage: TutorMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: response,
                    timestamp: new Date(),
                };
                addMessage('batBot', assistantMessage);
            } catch (error: any) {
                const errorMessage: TutorMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: `Error: ${error.message || 'Failed to get response'}`,
                    timestamp: new Date(),
                };
                addMessage('batBot', errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [messages, addMessage]
    );

    const clearMessages = useCallback(() => {
        clearHistory('batBot');
    }, [clearHistory]);

    return {
        messages,
        loading,
        sendMessage,
        clearMessages,
    };
}
