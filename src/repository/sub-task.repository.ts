import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SubTask } from '../entity/sub-task.entity';

@Injectable()
export class SubTaskRepository extends Repository<SubTask> {
  constructor(dataSource: DataSource) {
    super(SubTask, dataSource.createEntityManager());
  }
}
