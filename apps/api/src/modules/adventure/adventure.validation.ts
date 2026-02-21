import { AccessType, AdventureLevel } from '@zagotours/database';
import { z } from 'zod';

export const createAdventureSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  location: z.string().min(2, 'Location is required'),
  level: z.enum(AdventureLevel),
  tripType: z.string().min(2, 'Trip type is required'),
  date: z.coerce.date(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  days: z.coerce.number().int().positive('Days must be a positive integer'),
  certification: z.string().optional(),
  gear: z.string().optional(),
  access: z.enum(AccessType).optional(),
  safetyScore: z.coerce.number().min(0).max(100).optional(),
  safetyTips: z.string().optional(),
  mediaUrl: z.url().optional(),
  publicId: z.string().optional(),
});

export type CreateAdventureInput = z.infer<typeof createAdventureSchema>;
export const bulkCreateAdventureSchema: z.ZodType<CreateAdventureInput[]> = z
  .array(createAdventureSchema)
  .min(1)
  .max(100);
