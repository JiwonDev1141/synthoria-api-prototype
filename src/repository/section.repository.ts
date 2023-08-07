import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Section } from '../entity/section.entity';

@Injectable()
export class SectionRepository extends Repository<Section> {
  constructor(dataSource: DataSource) {
    super(Section, dataSource.createEntityManager());
  }

  async findById(id: number) {
    return await this.findOne({
      where: { id: id },
    });
  }

  async findByRoomId(roomId: number) {
    return await this.find({
      select: {
        id: true,
        sectionName: true,
        isDefault: true,
      },
      where: {
        roomId: roomId,
      },
    });
  }
}
