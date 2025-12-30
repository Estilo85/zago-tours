export interface UpdateProfileDTO {
  name?: string;
  phone?: string;
  country?: string;
}

export interface UpdateIndependentAgentDTO {
  certifications?: string[];
}

export interface UpdateCooperateAgentDTO {
  companyName?: string;
  travelBusinessDescription?: string;
}

export interface UpdateAffiliateDTO {
  communityBrand?: string;
  socialLinks?: string[];
}
