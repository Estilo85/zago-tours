import { Role } from '@zagotours/types';

export function getRedirectUrlByRole(role: Role): string {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return '/admin';

    case Role.INDEPENDENT_AGENT:
      return '/independent-agent';

    case Role.COOPERATE_AGENT:
      return '/corporate-agent';

    case Role.ADVENTURER:
      return '/adventurer';

    case Role.AFFILIATE:
      return '/affiliate';

    default:
      return '/';
  }
}
