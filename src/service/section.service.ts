import { BadRequestException, Injectable } from '@nestjs/common';
import { SectionRepository } from '../repository/section.repository';
import { RoomRepository } from '../repository/room.repository';
import { Section } from '../entity/section.entity';
import { CreateSectionDto, UpdateSectionDto } from '../controller/section/section.dto';
import { TaskRepository } from '../repository/task.repository';
import { ExtractJwt } from 'passport-jwt';
import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;

@Injectable()
export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository,
    private readonly roomRepository: RoomRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async getSections(uuid: string): Promise<Section[]> {
    const foundRoom = await this.roomRepository.findByUuid(uuid);
    if (!foundRoom) throw new BadRequestException('워크룸을 찾을 수 없습니다.');

    return await this.sectionRepository.findByRoomId(foundRoom.id);
  }

  /**
   * 섹션 저장
   * @param memberId
   * @param createSectionDto
   */
  async createSection(memberId: number, createSectionDto: CreateSectionDto) {
    const foundRoom = await this.roomRepository.findByUuid(createSectionDto.roomUuid);
    if (!foundRoom) throw new BadRequestException('워크룸을 찾을 수 없습니다.');

    const newSection = new Section();
    newSection.room = foundRoom;
    newSection.sectionName = createSectionDto.sectionName;
    newSection.createdBy = memberId;
    newSection.updatedBy = memberId;

    return await this.sectionRepository.save(newSection);
  }

  /**
   * 섹션 수정
   * @param memberId 회원 시퀀스
   * @param updateSectionDto
   */
  async updateSection(memberId: number, sectionId: number, updateSectionDto: UpdateSectionDto) {
    const foundSection = await this.sectionRepository.findById(sectionId);
    if (!foundSection) throw new BadRequestException('섹션을 찾을 수 없습니다.');

    foundSection.sectionName = updateSectionDto.sectionName ?? foundSection.sectionName;
    foundSection.updatedBy = memberId;
    return await this.sectionRepository.save(foundSection);
  }

  async deleteSection(sectionId: number): Promise<void> {
    const foundSection = await this.sectionRepository.findById(sectionId);
    if (!foundSection) throw new BadRequestException('섹션을 찾을 수 없습니다.');

    const foundTasks = await this.taskRepository.findBySectionId(sectionId);
    if (foundTasks.length > 0) {
      throw new BadRequestException('섹션에 등록된 작업이 있습니다.');
    }

    await this.sectionRepository.delete(foundSection.id);
  }
}
