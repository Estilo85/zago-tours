import { Role } from '@zagotours/types';

export function getRedirectUrlByRole(role: Role): string {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return '/dashboard/admin';

    case Role.INDEPENDENT_AGENT:
      return '/dashboard/independent-agent';

    case Role.COOPERATE_AGENT:
      return '/dashboard/corporate-agent';

    case Role.ADVENTURER:
      return '/dashboard/adventurer';

    case Role.AFFILIATE:
      return '/dashboard/affiliate';

    default:
      return '/dashboard';
  }
}
