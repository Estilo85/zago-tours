import { ContractStatus } from '../enums';

export interface CreateContractDTO {
  userId: string;
  agreement: string;
  documentUrl: string;
}

export interface UpdateContractDTO {
  agreement?: string;
  status?: ContractStatus;
  documentUrl?: string;
}
