import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { dtsDtsxOrDtsDtsxMapRegex } from 'ts-loader/dist/constants';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findById(id: number) {
    return this.findOne({
      select: {
        id: true,
        taskName: true,
        taskDescription: true,
        taskType: true,
        startDate: true,
        endDate: true,
        taskSection: {
          sectionName: true,
          isDefault: true,
        },
      },
      where: {
        id: id,
      },
      relations: {
        taskSection: true,
      },
    });
  }
}
