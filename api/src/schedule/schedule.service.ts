import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly taskService: TasksService) {}

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async handleCron() {
    this.logger.debug('Running cron job to update all catalogs');
    try {
      await this.taskService.getTommorowDueDate();
      this.logger.debug('All catalogs updated successfully');
    } catch (error) {
      this.logger.error('Error updating catalogs in cron job', error);
    }
  }
}
