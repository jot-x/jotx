import { z } from 'zod';

export const name = z
  .string()
  .min(2, 'Name length should have at least 2 letters')
  .max(20, 'Name length should have maximum of 20 chars')
  .refine(
    (value: string) => /^[a-zA-Z0-9_]+$/.test(value),
    'Name should contain only alphabets and digits'
  );

export default { name };
