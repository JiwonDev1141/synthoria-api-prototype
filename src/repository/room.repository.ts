import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Room } from '../entity/room.entity';

@Injectable()
export class RoomRepository extends Repository<Room> {
  constructor(dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Room> {
    return await this.findOne({
      select: {
        id: true,
        roomUuid: true,
        roomName: true,
        roomColor: true,
        startDate: true,
        endDate: true,
        sections: {
          id: true,
          sectionName: true,
        },
        createdBy: true,
        updatedBy: true,
      },
      where: {
        id: id,
      },
      relations: {
        sections: true,
      },
    });
  }

  async findByUuidWithTasks(uuid: string): Promise<Room> {
    return await this.findOne({
      select: {
        tasks: {
          id: true,
          taskName: true,
          taskDescription: true,
          taskType: true,
          startDate: true,
          endDate: true,
          section: {
            id: true,
            sectionName: true,
            isDefault: true,
          },
        },
      },
      where: {
        roomUuid: uuid,
      },
      order: {
        createdBy: 'asc',
      },
      relations: {
        tasks: {
          section: true,
        },
      },
    });
  }

  async findByUuid(uuid: string): Promise<Room> {
    return await this.findOne({
      select: {
        id: true,
        roomUuid: true,
        roomName: true,
        roomColor: true,
        startDate: true,
        endDate: true,
        sections: {
          id: true,
          sectionName: true,
        },
        createdBy: true,
        updatedBy: true,
      },
      where: {
        roomUuid: uuid,
      },
      relations: {
        sections: true,
      },
    });
  }
}
