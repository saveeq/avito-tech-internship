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

export const AutoParamsFields = () => {
  const {
    register,
    setValue,
    watch,
  } = useFormContext<EditFormValues>();
  const params = watch('params') as Record<string, unknown>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Марка</Label>
        <Input {...register('params.brand')} placeholder="Toyota" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Модель</Label>
        <Input {...register('params.model')} placeholder="Camry" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Год выпуска</Label>
        <Input type="number" {...register('params.yearOfManufacture')} placeholder="2020" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Коробка передач</Label>
        <Select
          value={(params?.transmission as string) ?? ''}
          onValueChange={(v) => setValue('params.transmission' as never, v as never)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automatic">Автомат</SelectItem>
            <SelectItem value="manual">Механика</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Пробег (км)</Label>
        <Input type="number" {...register('params.mileage')} placeholder="50000" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Мощность (л.с.)</Label>
        <Input type="number" {...register('params.enginePower')} placeholder="150" />
      </div>
    </div>
  );
};
