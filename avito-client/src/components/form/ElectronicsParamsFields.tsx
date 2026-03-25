import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EditFormValues } from '@/lib/formSchemas';

export const ElectronicsParamsFields = () => {
  const { register, setValue, watch } = useFormContext<EditFormValues>();
  const params = watch('params') as Record<string, unknown>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Тип</Label>
        <Select
          value={(params?.type as string) ?? ''}
          onValueChange={(v) => setValue('params.type' as never, v as never)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phone">Телефон</SelectItem>
            <SelectItem value="laptop">Ноутбук</SelectItem>
            <SelectItem value="misc">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Бренд</Label>
        <Input {...register('params.brand')} placeholder="Apple" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Модель</Label>
        <Input {...register('params.model')} placeholder="iPhone 15" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Состояние</Label>
        <Select
          value={(params?.condition as string) ?? ''}
          onValueChange={(v) => setValue('params.condition' as never, v as never)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Новое</SelectItem>
            <SelectItem value="used">Б/у</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Цвет</Label>
        <Input {...register('params.color')} placeholder="Чёрный" />
      </div>
    </div>
  );
};
