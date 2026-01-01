import { RegisterDTO, PublicRole } from '@zagotours/types';

export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * VALIDATION LOGIC
 * Checks both common and role-specific requirements
 */
export const validateRegistration = (
  formData: FormData,
  role: PublicRole | null
): FormErrors => {
  const errors: FormErrors = {};

  // 1. Common Fields Validation
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!fullName || fullName.length < 2)
    errors.fullName = 'Full name is required';
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    errors.email = 'Valid email is required';
  if (!password || password.length < 8)
    errors.password = 'Password must be at least 8 characters';

  // 2. Role-Specific Validations
  if (!role) return errors;

  // Agent Specifics
  if (role === 'INDEPENDENT_AGENT' || role === 'COOPERATE_AGENT') {
    if (!formData.get('certifications'))
      errors.certifications = 'Certifications are required for agents';
    if (!formData.get('business_description'))
      errors.business_description = 'Business description is required';
  }

  // Corporate Specifics
  if (role === 'COOPERATE_AGENT') {
    if (!formData.get('company_name'))
      errors.company_name = 'Company name is required';
  }

  // Affiliate Specifics
  if (role === 'AFFILIATE') {
    if (!formData.get('find_us'))
      errors.find_us = 'Please let us know how you heard about us';
  }

  return errors;
};

/**
 * MAPPING LOGIC
 *
 */
export const mapFormDataToDTO = (
  formData: FormData,
  role: PublicRole
): RegisterDTO => {
  const raw = Object.fromEntries(formData.entries());

  const payload: RegisterDTO = {
    name: raw.fullName as string,
    email: raw.email as string,
    password: raw.password as string,
    role: role,
    // Note: mapping the specific form names to the DTO property names
    phone: (raw.phone as string) || undefined,
    country: (raw.country as string) || undefined,
    referralCode: (raw.referral_code as string) || undefined,
    companyName: (raw.company_name as string) || undefined,
    travelBusinessDescription:
      (raw.business_description as string) || undefined,
    communityBrand: (raw.community_brand as string) || undefined,
    howDidYouHear: (raw.find_us as string) || undefined,

    // Array conversions
    certifications: raw.certifications
      ? (raw.certifications as string).split(',').map((c) => c.trim())
      : undefined,
    socialLinks: raw.social_links
      ? (raw.social_links as string).split(',').map((l) => l.trim())
      : undefined,
  };

  // Clean up undefined values
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined)
  ) as unknown as RegisterDTO;
};
