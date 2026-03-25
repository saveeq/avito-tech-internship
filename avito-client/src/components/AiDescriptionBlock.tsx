import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { generateDescription } from '@/api/llm';
import type { EditFormValues } from '@/lib/formSchemas';
import { DiffView } from '@/components/DiffView';
import type { Item } from '@/types';

interface AiDescriptionBlockProps {
  formValues: EditFormValues;
  onApply: (description: string) => void;
}

export const AiDescriptionBlock = ({ formValues, onApply }: AiDescriptionBlockProps) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const hasDescription = Boolean(formValues.description?.trim());

  const handleGenerate = async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await generateDescription(
        formValues as unknown as Partial<Item> & { title: string; category: string },
        abortRef.current.signal
      );
      setSuggestion(result.trim());
    } catch (err) {
      if ((err as { name?: string }).name === 'CanceledError') return;
      setError('Не удалось получить ответ от AI. Проверьте настройки LLM.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (suggestion) {
      onApply(suggestion);
      setSuggestion(null);
    }
  };

  const handleDiscard = () => {
    abortRef.current?.abort();
    setSuggestion(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-fit"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Генерирую...
          </span>
        ) : (
          `✨ ${hasDescription ? 'Улучшить описание' : 'Придумать описание'}`
        )}
      </Button>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {suggestion && (
        <div className="rounded-lg border border-border bg-muted/40 p-3 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground font-medium">Предложение AI:</p>

          {formValues.description?.trim() ? (
            <DiffView original={formValues.description} improved={suggestion} />
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{suggestion}</p>
          )}

          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={handleApply}>
              Применить
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={handleDiscard}>
              Отклонить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
