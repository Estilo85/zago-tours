import { CallbackRequest, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { CallbackRequestRepository } from './callback-request.repository';

export class CallbackRequestService extends BaseService<
  CallbackRequest,
  Prisma.CallbackRequestWhereInput,
  Prisma.CallbackRequestCreateInput,
  Prisma.CallbackRequestUpdateInput
> {
  protected readonly resourceName = 'CallbackRequest';

  constructor(private readonly callbackRepo: CallbackRequestRepository) {
    super(callbackRepo);
  }

  // Create request with optional notification
  override async create(
    data: Prisma.CallbackRequestCreateInput
  ): Promise<CallbackRequest> {
    const request = await super.create(data);

    // TODO: Send email notification to admin
    // await this.emailService.notifyAdmin(request);

    return request;
  }

  // Get requests by date range
  async getByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<CallbackRequest[]> {
    return this.callbackRepo.findByDateRange(startDate, endDate);
  }

  // Get pending requests
  async getPending(): Promise<CallbackRequest[]> {
    return this.callbackRepo.findPending();
  }
}
