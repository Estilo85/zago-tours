import { z } from 'zod';
import { Role } from '@zagotours/types';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(8),
    phone: z.string().optional(),
    country: z.string().optional(),
    role: z.enum(Role),
    referralCode: z.string().optional(),
    certifications: z.array(z.string()).optional(),
    companyName: z.string().optional(),
    travelBusinessDescription: z.string().optional(),
    communityBrand: z.string().optional(),
    socialLinks: z.array(z.string()).optional(),
    howDidYouHear: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(7),
  }),
});
