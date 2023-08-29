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
import { SubTaskComment } from './task-comment.entity';
import { MemberRoom } from './member-room.entity';

@Entity('member')
@Unique(['loginId'])
export class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Token, (token) => token.member, {
    cascade: true,
  })
  token: Token;

  @OneToMany(() => SubTaskComment, (subTaskComment) => subTaskComment.member, {
    cascade: true,
  })
  subTaskComments: SubTaskComment[];

  @OneToMany(() => MemberRoom, (memberRoom) => memberRoom.member, {
    cascade: true,
  })
  memberRooms: MemberRoom[];

  @Column({
    name: 'login_id',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  loginId!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password!: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username!: string;

  @Column({
    name: 'department',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  department!: string;

  @Column({
    name: 'position',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  position!: string;

  @Column({
    name: 'authority_id',
    type: 'integer',
    nullable: true,
  })
  authorityId!: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birth: Date;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  phone: string;

  @Column({
    name: 'timezone',
    type: 'varchar',
    length: 255,
    default: 'Asia/Seoul',
  })
  timezone: string;

  @Column({
    name: 'login_status',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  loginStatus: string;

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
