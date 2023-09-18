import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { Member } from '../entity/member.entity';
import { Like } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async findMembers(): Promise<Member[]> {
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
    });
  }

  async findMemberByKeyword(keyword: string): Promise<Member[]> {
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
      where: [{ username: Like('%' + keyword + '%') }, { email: Like('%' + keyword + '%') }],
    });
  }
}
