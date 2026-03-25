import { z } from 'zod';

export const AutoParamsSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  yearOfManufacture: z.coerce.number().int().positive().optional().or(z.literal('')),
  transmission: z.enum(['automatic', 'manual']).optional(),
  mileage: z.coerce.number().positive().optional().or(z.literal('')),
  enginePower: z.coerce.number().int().positive().optional().or(z.literal('')),
});

export const RealEstateParamsSchema = z.object({
  type: z.enum(['flat', 'house', 'room']).optional(),
  address: z.string().optional(),
  area: z.coerce.number().positive().optional().or(z.literal('')),
  floor: z.coerce.number().int().positive().optional().or(z.literal('')),
});

export const ElectronicsParamsSchema = z.object({
  type: z.enum(['phone', 'laptop', 'misc']).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  condition: z.enum(['new', 'used']).optional(),
  color: z.string().optional(),
});

const BaseSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  price: z.coerce
  .number()
  .refine((val) => !isNaN(val), {
    message: 'Введите число',
  })
  .min(0, 'Цена не может быть отрицательной'),
  description: z.string().optional(),
});

export const EditFormSchema = z.discriminatedUnion('category', [
  BaseSchema.extend({
    category: z.literal('auto'),
    params: AutoParamsSchema,
  }),
  BaseSchema.extend({
    category: z.literal('real_estate'),
    params: RealEstateParamsSchema,
  }),
  BaseSchema.extend({
    category: z.literal('electronics'),
    params: ElectronicsParamsSchema,
  }),
]);

export type EditFormValues = z.infer<typeof EditFormSchema>;
