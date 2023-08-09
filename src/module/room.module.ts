import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoomService } from '../service/room.service';
import { RoomController } from '../controller/room/room.controller';
import { RoomRepository } from '../repository/room.repository';
import { MemberRepository } from '../repository/member.repository';
import { MemberRoomRepository } from '../repository/member-room.repository';
import { SectionRepository } from '../repository/section.repository';

@Module({
  controllers: [RoomController],
  providers: [RoomService, JwtService, RoomRepository, MemberRepository, MemberRoomRepository, SectionRepository],
})
export class RoomModule {}
