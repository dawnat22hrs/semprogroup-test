import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  phone: z.string().min(18, 'Введите номер телефона полностью'),
  email: z.string().min(1, 'Введите email').email('Введите корректный email'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
