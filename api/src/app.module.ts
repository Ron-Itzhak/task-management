import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule/schedule.service';
import { MongoModule } from './shared/mongo/mongo.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    MongoModule,
    CategoriesModule,
    TasksModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [ScheduleService, TasksService],
})
export class AppModule {}
