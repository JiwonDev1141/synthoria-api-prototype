import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskSection } from '../entity/section.entity';

@Injectable()
export class SectionRepository extends Repository<TaskSection> {
  constructor(dataSource: DataSource) {
    super(TaskSection, dataSource.createEntityManager());
  }

  async findById(id: number) {
    return await this.findOne({
      where: { id: id },
    });
  }
}
