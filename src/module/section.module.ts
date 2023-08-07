import { Module } from '@nestjs/common';
import { SectionRepository } from '../repository/section.repository';
import { SectionController } from '../controller/section/section.controller';
import { SectionService } from '../service/section.service';
import { RoomRepository } from '../repository/room.repository';
import { TaskRepository } from '../repository/task.repository';

@Module({
  controllers: [SectionController],
  providers: [SectionService, SectionRepository, RoomRepository, TaskRepository],
})
export class SectionModule {}
