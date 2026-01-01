import { create } from 'zustand';
import { PublicRole } from '@zagotours/types';

interface RoleState {
  role: string | PublicRole;
  setRole: (newRole: string | PublicRole) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: 'ADVENTURER',
  setRole: (newRole) => set({ role: newRole }),
}));
