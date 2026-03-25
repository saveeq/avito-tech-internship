import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { EditFormValues } from '@/lib/formSchemas';

const getDraftKey = (id: number) => `ad_draft_${id}`;

export const useDraft = (id: number, form: UseFormReturn<EditFormValues>) => {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(getDraftKey(id));
      if (raw) {
        const draft = JSON.parse(raw) as EditFormValues;
        form.reset(draft);
      }
    } catch {
      localStorage.removeItem(getDraftKey(id));
    }
  }, [id]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      try {
        localStorage.setItem(getDraftKey(id), JSON.stringify(values));
      } catch {
        // localStorage переполнен — игнорируем
      }
    });
    return () => subscription.unsubscribe();
  }, [id, form]);

  const clearDraft = () => localStorage.removeItem(getDraftKey(id));

  return { clearDraft };
};
