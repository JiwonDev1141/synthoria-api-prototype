import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Task> {
    return this.findOne({
      select: {
        id: true,
        taskName: true,
        taskDescription: true,
        taskType: true,
        startDate: true,
        endDate: true,
        section: {
          sectionName: true,
          isDefault: true,
        },
      },
      where: {
        id: id,
      },
      relations: {
        section: true,
      },
    });
  }

  async findBySectionId(sectionId: number): Promise<Task[]> {
    return this.find({
      where: {
        sectionId: sectionId,
      },
    });
  }
}
