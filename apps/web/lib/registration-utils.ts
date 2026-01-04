import { RegisterDTO, RegistrableRole } from '@zagotours/types';

export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * MAPPING LOGIC
 *
 */
export const mapFormDataToDTO = (
  formData: FormData,
  role: RegistrableRole
): RegisterDTO => {
  // Convert FormData to a plain object for easier access
  const raw = Object.fromEntries(formData.entries());

  const payload: RegisterDTO = {
    // Standard Fields
    name: raw.fullName as string,
    email: raw.email as string,
    password: raw.password as string,
    role: role,

    // Role-specific fields
    phone: (raw.phone as string) || undefined,
    country: (raw.country as string) || undefined,
    referralCode: (raw.referral_code as string) || undefined,
    companyName:
      (raw.company_name as string) || (raw.company_type as string) || undefined,
    travelBusinessDescription:
      (raw.business_description as string) || undefined,
    howDidYouHear: (raw.find_us as string) || undefined,

    // Array Handling (for certifications or social links)
    certifications: raw.certifications
      ? (raw.certifications as string).split(',').map((c) => c.trim())
      : undefined,
  };

  // Remove any keys that are undefined so the API doesn't get "null" values
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined && v !== '')
  ) as unknown as RegisterDTO;
};
