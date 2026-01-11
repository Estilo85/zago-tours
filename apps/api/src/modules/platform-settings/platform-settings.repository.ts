import { PlatformSettings, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class PlatformSettingsRepository extends BaseRepository<
  PlatformSettings,
  Prisma.PlatformSettingsWhereInput,
  Prisma.PlatformSettingsCreateInput,
  Prisma.PlatformSettingsUpdateInput
  // Prisma.PlatformSettingsInclude
> {
  protected readonly modelDelegate = prisma.platformSettings;

  // Get the single settings record (there should only be one)
  async findSettings(): Promise<PlatformSettings | null> {
    return this.modelDelegate.findFirst({
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Get or create settings (ensures settings always exist)
  async getOrCreate(): Promise<PlatformSettings> {
    let settings = await this.findSettings();

    if (!settings) {
      settings = await this.create({
        siteName: 'Zagotours',
        maintenance: false,
      });
    }

    return settings;
  }

  // Update settings (creates if doesn't exist)
  async updateSettings(
    data: Prisma.PlatformSettingsUpdateInput
  ): Promise<PlatformSettings> {
    const existing = await this.findSettings();

    if (existing) {
      return this.update(existing.id, data);
    }

    // Create with defaults if doesn't exist
    return this.create({
      siteName: typeof data.siteName === 'string' ? data.siteName : 'Zagotours',
      contactEmail:
        typeof data.contactEmail === 'string' ? data.contactEmail : undefined,
      maintenance:
        typeof data.maintenance === 'boolean' ? data.maintenance : false,
    });
  }
}
