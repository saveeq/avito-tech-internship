import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { estimatePrice } from '@/api/llm';
import type { EditFormValues } from '@/lib/formSchemas';
import type { Item } from '@/types';

interface AiPriceBlockProps {
  formValues: EditFormValues;
  onApply: (price: number) => void;
}

export const AiPriceBlock = ({ formValues, onApply }: AiPriceBlockProps) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleEstimate = async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await estimatePrice(
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

  const extractPrice = (text: string): number | null => {
    const match = text.replace(/\s/g, '').match(/(\d+)/);
    return match ? Number(match[1]) : null;
  };

  const handleApply = () => {
    if (!suggestion) return;
    const price = extractPrice(suggestion);
    if (price !== null) {
      onApply(price);
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
        onClick={handleEstimate}
        disabled={isLoading}
        className="w-fit"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Анализирую рынок...
          </span>
        ) : (
          '💰 Узнать рыночную цену'
        )}
      </Button>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {suggestion && (
        <div className="rounded-lg border border-border bg-muted/40 p-3 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground font-medium">Оценка AI:</p>
          <p className="text-sm leading-relaxed">{suggestion}</p>
          <div className="flex gap-2">
            {extractPrice(suggestion) !== null && (
              <Button type="button" size="sm" onClick={handleApply}>
                Применить цену
              </Button>
            )}
            <Button type="button" size="sm" variant="ghost" onClick={handleDiscard}>
              Отклонить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
