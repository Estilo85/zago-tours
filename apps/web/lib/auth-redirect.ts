import { Role } from '@zagotours/types';

export function getRedirectUrlByRole(role: Role): string {
  switch (role) {
    case Role.SUPER_ADMIN:
      return '/super-admin/dashboard';

    case Role.ADMIN:
      return '/admin/dashboard';

    case Role.AFFILIATE:
      return '/affiliate/dashboard';

    case Role.ADVENTURER:
      return '/adventurer/dashboard';

    case Role.INDEPENDENT_AGENT:
      return '/agent/dashboard';

    case Role.COOPERATE_AGENT:
      return '/agent/dashboard';

    default:
      return '/dashboard';
  }
}
