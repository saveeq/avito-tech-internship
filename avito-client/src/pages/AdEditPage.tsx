import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useItem } from '@/hooks/useItem';
import { useSaveItem } from '@/hooks/useSaveItem';
import { useDraft } from '@/hooks/useDraft';
import { AutoParamsFields } from '@/components/form/AutoParamsFields';
import { RealEstateParamsFields } from '@/components/form/RealEstateParamsFields';
import { ElectronicsParamsFields } from '@/components/form/ElectronicsParamsFields';
import { CATEGORY_LABELS } from '@/lib/displayHelpers';
import { EditFormSchema, type EditFormValues } from '@/lib/formSchemas';
import { AiDescriptionBlock } from '@/components/AiDescriptionBlock';
import { AiPriceBlock } from '@/components/AiPriceBlock';
import { AiChat } from '@/components/AiChat';

export const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = Number(id);

  const { data: item, isLoading, isError } = useItem(itemId);
  const { mutate: saveItem, isPending: isSaving } = useSaveItem(itemId);

  const form = useForm<EditFormValues>({
    resolver: zodResolver(EditFormSchema) as any,
    mode: 'onChange',
    defaultValues: {
      category: 'electronics' as const,
      title: '',
      price: 0,
      description: '',
      params: {
        type: undefined,
        brand: '',
        model: '',
        condition: undefined,
        color: '',
      },
    } as EditFormValues,
  });

  const { clearDraft } = useDraft(itemId, form);

  useEffect(() => {
    if (!item) return;
    const hasDraft = Boolean(localStorage.getItem(`ad_draft_${itemId}`));
    if (!hasDraft) {
      form.reset({
        category: item.category,
        title: item.title,
        price: item.price ?? 0,
        description: item.description ?? '',
        params: item.params ?? {},
      } as EditFormValues);
    }
  }, [item, itemId, form]);

  const description = form.watch('description') ?? '';
  const category = form.watch('category');

  const handleSubmit = form.handleSubmit((values) => {
    const cleanParams = Object.fromEntries(
      Object.entries(values.params).filter(([, v]) => v !== '' && v !== undefined)
    );

    saveItem({ ...values, params: cleanParams } as never, {
      onSuccess: () => {
        clearDraft();
        navigate(`/ads/${itemId}`);
      },
    });
  });

  const handleCancel = () => {
    clearDraft();
    navigate(`/ads/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Button
          variant="ghost"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => navigate(`/ads/${itemId}`)}
        >
          ← К объявлению
        </Button>

        <h1 className="text-2xl font-bold">Редактирование</h1>

        {isLoading && (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 text-destructive p-4 text-sm">
            Не удалось загрузить объявление.
          </div>
        )}

        {item && (
          <FormProvider {...form}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <Label>Категория</Label>
                <Input value={CATEGORY_LABELS[category]} disabled />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">
                  Название <span className="text-destructive">*</span>
                </Label>
                <Input id="title" {...form.register('title')} placeholder="Введите название" />
                {form.formState.errors.title && (
                  <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="price">
                  Цена (₽) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  {...form.register('price')}
                  placeholder="0"
                />
                {form.formState.errors.price && (
                  <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-sm">Характеристики</h2>
                {category === 'auto' && <AutoParamsFields />}
                {category === 'real_estate' && <RealEstateParamsFields />}
                {category === 'electronics' && <ElectronicsParamsFields />}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Описание</Label>
                  <span className="text-xs text-muted-foreground">
                    {description.length} символов
                  </span>
                </div>
                <textarea
                  id="description"
                  {...form.register('description')}
                  placeholder="Расскажите подробнее о товаре..."
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-border p-4 bg-muted/30">
                <p className="text-sm font-semibold">AI-ассистент</p>

                <AiDescriptionBlock
                  formValues={form.getValues()}
                  onApply={(text) => form.setValue('description', text, { shouldDirty: true })}
                />

                <hr className="border-border" />

                <AiPriceBlock
                  formValues={form.getValues()}
                  onApply={(price) => form.setValue('price', price, { shouldDirty: true })}
                />
              </div>

              <AiChat formValues={form.watch()} />

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSaving} className="flex-1">
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Отменить
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};
