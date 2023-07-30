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
      where: {
        roomUuid: uuid,
      },
      relations: {
        tasks: true,
      },
    });
  }

  async findByUuid(uuid: string): Promise<Room> {
    return await this.findOneBy({ roomUuid: uuid });
  }
}
