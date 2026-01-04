import { Role, RegistrableRole } from '@zagotours/types';
import { FormErrors } from './registration-utils';

export const validateRegistration = (
  formData: FormData,
  role: RegistrableRole | null
): FormErrors => {
  const errors: FormErrors = {};

  // Extract values
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!fullName || fullName.length < 2) {
    // Dynamic error message based on role
    errors.fullName =
      role === Role.COOPERATE_AGENT
        ? 'Company name is required'
        : 'Full name is required';
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Valid email is required';
  }

  if (!password || password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  // 2. Role-Specific Validations
  if (!role) return errors;

  // Agent Specifics (Independent & Corporate)
  if (role === Role.INDEPENDENT_AGENT || role === Role.COOPERATE_AGENT) {
    if (!formData.get('business_description')) {
      errors.business_description =
        role === Role.COOPERATE_AGENT
          ? 'Company overview is required'
          : 'Business description is required';
    }

    if (!formData.get('certifications')) {
      errors.certifications = 'Please provide your certifications';
    }
  }

  // Affiliate Specifics
  if (role === Role.AFFILIATE) {
    if (!formData.get('find_us')) {
      errors.find_us = 'Please let us know how you heard about us';
    }
  }

  return errors;
};
