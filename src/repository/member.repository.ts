import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../entity/member.entity';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

  async findMemberByLoginId(loginId: string) {
    return await this.findOne({
      where: { loginId: loginId },
      relations: { token: true },
    });
  }

  async findById(id: number) {
    return await this.findOne({
      where: { id: id },
      relations: { token: true },
    });
  }
}
