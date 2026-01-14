import { PlatformSettings, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { PlatformSettingsRepository } from './platform-settings.repository';

// Simple in-memory cache
class SettingsCache {
  private cache: PlatformSettings | null = null;
  private lastUpdate: number = 0;
  private readonly TTL = 5 * 60 * 1000;

  get(): PlatformSettings | null {
    if (!this.cache || Date.now() - this.lastUpdate > this.TTL) {
      return null;
    }
    return this.cache;
  }

  set(settings: PlatformSettings): void {
    this.cache = settings;
    this.lastUpdate = Date.now();
  }

  clear(): void {
    this.cache = null;
    this.lastUpdate = 0;
  }
}

export class PlatformSettingsService extends BaseService<
  PlatformSettings,
  Prisma.PlatformSettingsWhereInput,
  Prisma.PlatformSettingsCreateInput,
  Prisma.PlatformSettingsUpdateInput
  // Prisma.PlatformSettingsInclude
> {
  protected readonly resourceName = 'PlatformSettings';
  private cache = new SettingsCache();

  constructor(private readonly settingsRepo: PlatformSettingsRepository) {
    super(settingsRepo);
  }

  // Get current settings (with caching)
  async getSettings(): Promise<PlatformSettings> {
    // Check cache first
    const cached = this.cache.get();
    if (cached) {
      return cached;
    }

    // Fetch from database
    const settings = await this.settingsRepo.getOrCreate();

    // Update cache
    this.cache.set(settings);

    return settings;
  }

  // Update settings
  async updateSettings(
    data: Prisma.PlatformSettingsUpdateInput
  ): Promise<PlatformSettings> {
    const updated = await this.settingsRepo.updateSettings(data);

    // Clear cache to force refresh
    this.cache.clear();

    return updated;
  }

  // Enable maintenance mode
  async enableMaintenance(): Promise<PlatformSettings> {
    const updated = await this.updateSettings({ maintenance: true });

    // TODO: Broadcast to all connected clients (WebSocket/SSE)
    // TODO: Log maintenance mode activation

    return updated;
  }

  // Disable maintenance mode
  async disableMaintenance(): Promise<PlatformSettings> {
    const updated = await this.updateSettings({ maintenance: false });

    // TODO: Broadcast to all connected clients
    // TODO: Log maintenance mode deactivation

    return updated;
  }

  // Update site name
  async updateSiteName(siteName: string): Promise<PlatformSettings> {
    if (!siteName || siteName.trim().length === 0) {
      throw new Error('Site name cannot be empty');
    }

    return this.updateSettings({ siteName });
  }

  // Update contact email
  async updateContactEmail(contactEmail: string): Promise<PlatformSettings> {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      throw new Error('Invalid email address');
    }

    return this.updateSettings({ contactEmail });
  }

  // Check if in maintenance mode
  async isMaintenanceMode(): Promise<boolean> {
    const settings = await this.getSettings();
    return settings.maintenance;
  }

  // Clear cache manually (useful for testing or debugging)
  clearCache(): void {
    this.cache.clear();
  }
}
