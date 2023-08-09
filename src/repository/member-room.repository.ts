import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MemberRoom } from '../entity/member-room.entity';

@Injectable()
export class MemberRoomRepository extends Repository<MemberRoom> {
  constructor(dataSource: DataSource) {
    super(MemberRoom, dataSource.createEntityManager());
  }

  async findByMemberIdAndRoomId(memberId: number, roomId: number): Promise<MemberRoom> {
    return await this.findOneBy({
      memberId: memberId,
      roomId: roomId,
    });
  }

  async findAllByMemberId(memberId: number): Promise<MemberRoom[]> {
    return await this.find({
      where: {
        memberId: memberId,
      },
      relations: {
        room: true,
      },
    });
  }
}
