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

  async findAllByRoomId(roomId: number): Promise<MemberRoom[]> {
    return await this.find({
      select: {
        member: {
          loginId: true,
          username: true,
          department: true,
          position: true,
          email: true,
          birth: true,
          phone: true,
          timezone: true,
          loginStatus: true,
        },
      },
      where: {
        roomId: roomId,
      },
      relations: ['member'],
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
