interface DiffViewProps {
  original: string;
  improved: string;
}

const computeDiff = (original: string, improved: string) => {
  const originalWords = original.split(/(\s+)/);
  const improvedWords = improved.split(/(\s+)/);

  const originalSet = new Set(originalWords);
  const improvedSet = new Set(improvedWords);

  const removedParts = originalWords.map((word) => ({
    text: word,
    removed: !improvedSet.has(word) && word.trim() !== '',
  }));

  const addedParts = improvedWords.map((word) => ({
    text: word,
    added: !originalSet.has(word) && word.trim() !== '',
  }));

  return { removedParts, addedParts };
};

export const DiffView = ({ original, improved }: DiffViewProps) => {
  const { removedParts, addedParts } = computeDiff(original, improved);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Было</p>
        <div className="rounded-lg border border-border bg-background p-3 text-sm leading-relaxed min-h-20">
          {removedParts.map((part, i) => (
            <span
              key={i}
              className={
                part.removed
                  ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 line-through rounded px-0.5'
                  : ''
              }
            >
              {part.text}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Стало</p>
        <div className="rounded-lg border border-border bg-background p-3 text-sm leading-relaxed min-h-20">
          {addedParts.map((part, i) => (
            <span
              key={i}
              className={
                part.added
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded px-0.5'
                  : ''
              }
            >
              {part.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
