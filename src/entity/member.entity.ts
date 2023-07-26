import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from './token.entity';
import { Task } from './task.entity';
import { SubTaskComment } from './task-comment.entity';

@Entity('member')
@Unique(['loginId'])
export class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Token, (token) => token.member)
  token: Token;

  @OneToMany(() => SubTaskComment, (subTaskComment) => subTaskComment.member)
  subTaskComments: SubTaskComment[];

  @Column({
    name: 'login_id',
    length: 255,
  })
  loginId!: string;

  @Column({
    name: 'password',
    length: 255,
  })
  password!: string;

  @Column({
    name: 'username',
    length: 255,
  })
  username!: string;

  @Column({
    name: 'department',
    length: 255,
  })
  department!: string;

  @Column({
    name: 'position',
    length: 255,
  })
  position!: string;

  @Column({
    name: 'authority_id',
  })
  authorityId!: number;

  @Column({
    name: 'last_login_date',
    nullable: true,
    type: 'timestamp with time zone',
  })
  lastLoginDate!: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updatedAt!: Date;
}
