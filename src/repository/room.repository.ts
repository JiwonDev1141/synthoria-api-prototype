import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Room } from '../entity/room.entity';

@Injectable()
export class RoomRepository extends Repository<Room> {
  constructor(dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
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
          taskSection: {
            id: true,
            sectionName: true,
            isDefault: true,
          },
        },
      },
      where: {
        roomUuid: uuid,
      },
      relations: {
        tasks: {
          taskSection: true,
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
        taskSections: {
          id: true,
          sectionName: true,
        },
      },
      where: {
        roomUuid: uuid,
      },
      relations: {
        taskSections: true,
      },
    });
  }
}
