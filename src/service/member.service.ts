import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { Member } from '../entity/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async findMemberByEmail(email: string): Promise<Member[]> {
    return await this.memberRepository.find({
      select: {
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
      where: {
        email: email,
      },
    });
  }

  async findMemberByUsername(username: string): Promise<Member[]> {
    return await this.memberRepository.find({
      select: {
        loginId: true,
        username: true,
        department: true,
        position: true,
        birth: true,
        phone: true,
        timezone: true,
        email: true,
        loginStatus: true,
      },
      where: {
        username: username,
      },
    });
  }
}
