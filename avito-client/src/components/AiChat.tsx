import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendChatMessage, type ChatMessage } from '@/api/llm';
import type { EditFormValues } from '@/lib/formSchemas';
import type { Item } from '@/types';

interface AiChatProps {
  formValues: EditFormValues;
}

export const AiChat = ({ formValues }: AiChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const reply = await sendChatMessage(
        updatedMessages,
        formValues as unknown as Partial<Item> & { title: string; category: string },
        abortRef.current.signal
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: reply.trim() }]);
    } catch (err) {
      if ((err as { name?: string }).name === 'CanceledError') return;
      setError('Не удалось получить ответ. Проверьте настройки LLM.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border p-4 bg-muted/30">
      <p className="text-sm font-semibold">Чат с AI</p>

      {/* История сообщений */}
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            Задайте вопрос об объявлении — AI учтёт все заполненные поля
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-background border border-border rounded-xl px-3 py-2">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        {error && <p className="text-xs text-destructive text-center">{error}</p>}
        <div ref={bottomRef} />
      </div>

      {/* Поле ввода */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите вопрос..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="button" size="sm" onClick={handleSend} disabled={isLoading || !input.trim()}>
          Отправить
        </Button>
      </div>
    </div>
  );
};
