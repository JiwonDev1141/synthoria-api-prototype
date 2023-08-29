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

  /*
  "id": 1,
        "loginId": "admin",
        "password": "quMerv4JwzI2tA==$SR2+1SCx1Nyrk/LQPkEZjuvwW9hwk0/HiyWlZx+P0nY=\n",
        "username": "관리자",
        "department": "총괄",
        "position": "팀장",
        "authorityId": null,
        "email": null,
        "birth": null,
        "phone": null,
        "timezone": "Asia/Seoul",
        "loginStatus": null,
        "lastLoginDate": null,
        "createdAt": "2023-07-16T08:25:25.241Z",
        "updatedAt": "2023-07-16T08:25:25.241Z"
   */
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
