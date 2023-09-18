import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubTaskController } from '../controller/sub-task/sub-task.controller';
import { SubTaskRepository } from '../repository/sub-task.repository';
import { SubTaskService } from '../service/sub-task.service';
import { TaskRepository } from '../repository/task.repository';

@Module({
  controllers: [SubTaskController],
  providers: [SubTaskService, SubTaskRepository, TaskRepository, JwtService],
})
export class SubTaskModule {}
