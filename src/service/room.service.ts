import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from '../controller/room/room.dto';
import { RoomRepository } from '../repository/room.repository';
import { Room } from '../entity/room.entity';
import { v4 as uuidv4 } from 'uuid';
import { MemberRoom } from '../entity/member-room.entity';
import { MemberRepository } from '../repository/member.repository';
import { MemberRoomRepository } from '../repository/member-room.repository';
import { SectionRepository } from '../repository/section.repository';
import { Section } from '../entity/section.entity';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly memberRepository: MemberRepository,
    private readonly memberRoomRepository: MemberRoomRepository,
    private readonly sectionRepository: SectionRepository,
  ) {}

  async getRooms(memberId: number) {
    const memberRooms: MemberRoom[] = await this.memberRoomRepository.findAllByMemberId(memberId);

    const rooms: Room[] = [];
    memberRooms.forEach((value) => {
      rooms.push(value.room);
    });

    return rooms;
  }

  async getRoom(memberId: number, uuid: string): Promise<Room> {
    const foundRoom = await this.roomRepository.findByUuid(uuid);
    if (!foundRoom) {
      throw new BadRequestException();
    }

    const foundMemberRoom = await this.memberRoomRepository.findByMemberIdAndRoomId(memberId, foundRoom.id);
    if (!foundMemberRoom) {
      throw new HttpException(
        {
          code: 1,
          message: '조회 권한이 없습니다.',
        },
        400,
      );
    }

    return foundRoom;
  }

  /**
   * 룸에 포함된 작업들을 조회합니다.
   * @param uuid
   */
  async getTasks(uuid: string) {
    const foundRoom = await this.roomRepository.findByUuidWithTasks(uuid);
    return foundRoom.tasks;
  }

  async createRoom(memberId: number, createRoomDto: CreateRoomDto): Promise<Room> {
    // 룸 생성
    const newRoom = new Room();
    newRoom.roomName = createRoomDto.roomName;
    newRoom.roomColor = createRoomDto.roomColor;
    newRoom.roomUuid = uuidv4();
    newRoom.startDate = createRoomDto.startDate;
    newRoom.endDate = createRoomDto.endDate;
    newRoom.createdBy = memberId;
    newRoom.updatedBy = memberId;
    await this.roomRepository.save(newRoom);

    // 룸에 사용자 참여
    const foundMember = await this.memberRepository.findById(memberId);
    const memberRoom = new MemberRoom();
    memberRoom.room = newRoom;
    memberRoom.member = foundMember;
    await this.memberRoomRepository.save(memberRoom);

    // 기본 테스크 섹션 추가
    const todoSection = new Section();
    todoSection.room = newRoom;
    todoSection.sectionName = 'To do';
    todoSection.isDefault = true;
    todoSection.createdBy = foundMember.id;
    todoSection.updatedBy = foundMember.id;

    const doingSection = new Section();
    doingSection.room = newRoom;
    doingSection.sectionName = 'Doing';
    doingSection.isDefault = true;
    doingSection.createdBy = foundMember.id;
    doingSection.updatedBy = foundMember.id;

    const doneSection = new Section();
    doneSection.room = newRoom;
    doneSection.sectionName = 'Done';
    doneSection.isDefault = true;
    doneSection.createdBy = foundMember.id;
    doneSection.updatedBy = foundMember.id;

    await this.sectionRepository.save(todoSection);
    await this.sectionRepository.save(doingSection);
    await this.sectionRepository.save(doneSection);

    return await this.roomRepository.findById(newRoom.id);
  }

  async updateRoom(memberId: number, uuid: string, updateRoomDto: UpdateRoomDto) {
    const foundRoom = await this.roomRepository.findByUuid(uuid);
    if (!foundRoom) {
      throw new HttpException(
        {
          code: 1,
          message: '워크룸을 찾을 수 없습니다.',
        },
        400,
      );
    }

    console.log(JSON.stringify(foundRoom));

    // 관리자 또는 워크룸을 생성한 사람이 아닐 경우 수정 불가능
    // todo - 관리자 판단 여부는 코드 추가 필요

    console.log('foundRoom.createdBy = ' + foundRoom.createdBy);
    console.log('memberId = ' + memberId);

    if (foundRoom.createdBy !== memberId) {
      throw new HttpException(
        {
          code: 1,
          message: '워크룸 수정 권한이 없습니다.',
        },
        400,
      );
    }
    foundRoom.roomName = updateRoomDto.roomName ?? foundRoom.roomName;
    foundRoom.roomColor = updateRoomDto.roomColor ?? foundRoom.roomColor;
    foundRoom.startDate = updateRoomDto.startDate ?? foundRoom.startDate;
    foundRoom.endDate = updateRoomDto.endDate ?? foundRoom.endDate;

    await this.roomRepository.save(foundRoom);
  }

  /**
   * 룸 삭제
   * @param memberId - 회원 ID
   * @param uuid - 룸 식별자
   */
  async deleteRoom(memberId: number, uuid: string) {
    const foundRoom = await this.roomRepository.findByUuid(uuid);
    if (!foundRoom) {
      throw new HttpException(
        {
          code: 1,
          message: '워크룸을 찾을 수 없습니다.',
        },
        400,
      );
    }

    // 관리자 또는 워크룸을 생성한 사람이 아닐 경우 삭제 불가능
    // todo - 관리자 판단 여부는 코드 추가 필요
    if (foundRoom.createdBy !== memberId) {
      throw new HttpException(
        {
          code: 1,
          message: '워크룸 삭제 권한이 없습니다.',
        },
        400,
      );
    }

    await this.roomRepository.delete(foundRoom.id);
  }
}
