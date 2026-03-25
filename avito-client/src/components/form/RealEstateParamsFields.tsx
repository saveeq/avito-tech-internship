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

export const RealEstateParamsFields = () => {
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
            <SelectItem value="flat">Квартира</SelectItem>
            <SelectItem value="house">Дом</SelectItem>
            <SelectItem value="room">Комната</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Адрес</Label>
        <Input {...register('params.address')} placeholder="ул. Ленина, 1" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Площадь (м²)</Label>
        <Input type="number" {...register('params.area')} placeholder="50" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Этаж</Label>
        <Input type="number" {...register('params.floor')} placeholder="3" />
      </div>
    </div>
  );
};
