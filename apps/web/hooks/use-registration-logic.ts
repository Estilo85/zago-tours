import { useState, useEffect } from 'react';
import { PublicRole } from '@zagotours/types';
import { useRoleStore } from '@/store/role-selector.store';

type RoleCategory = 'AFFILIATE' | 'ADVENTURER' | 'AGENT';
type AgentType = 'INDEPENDENT_AGENT' | 'COOPERATE_AGENT';

export function useRegistrationLogic() {
  const storeRole = useRoleStore((state) => state.role);

  const [selectedCategory, setSelectedCategory] =
    useState<RoleCategory>('ADVENTURER');
  const [selectedAgentType, setSelectedAgentType] =
    useState<AgentType>('INDEPENDENT_AGENT');
  const [finalRole, setFinalRole] = useState<PublicRole | null>(null);

  useEffect(() => {
    if (storeRole === 'AGENT') {
      setSelectedCategory('AGENT');
      setFinalRole(selectedAgentType as PublicRole);
    } else {
      setSelectedCategory(storeRole as RoleCategory);
      setFinalRole(storeRole as PublicRole);
      setSelectedAgentType('INDEPENDENT_AGENT');
    }
  }, [storeRole, selectedAgentType]);

  const handleAgentTypeSelect = (agentType: AgentType) => {
    setSelectedAgentType(agentType);
    setFinalRole(agentType as PublicRole);
  };

  return {
    selectedCategory,
    selectedAgentType,
    finalRole,
    handleAgentTypeSelect,
  };
}
