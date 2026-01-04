import { create } from 'zustand';
import { CustomerRole } from '@zagotours/types';

interface RoleState {
  role: string | CustomerRole;
  setRole: (newRole: string | CustomerRole) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: 'ADVENTURER',
  setRole: (newRole) => set({ role: newRole }),
}));
