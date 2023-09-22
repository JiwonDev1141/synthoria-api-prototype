import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { MemberRoom } from './member-room.entity';
import { Section } from './section.entity';

@Entity('room')
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Task, (task) => task.room, {
    onDelete: 'CASCADE',
  })
  tasks: Task[];

  @OneToMany(() => MemberRoom, (memberRoom) => memberRoom.room, {
    onDelete: 'CASCADE',
  })
  memberRooms: MemberRoom[];

  @OneToMany(() => Section, (section) => section.room, {
    onDelete: 'CASCADE',
  })
  sections: Section[];

  @Column({
    name: 'room_uuid',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  roomUuid: string;

  @Column({
    name: 'room_name',
    type: 'varchar',
    length: 255,
  })
  roomName: string;

  @Column({
    name: 'room_color',
    type: 'varchar',
    length: 255,
  })
  roomColor: string;

  @Column({
    name: 'start_date',
    type: 'timestamptz',
    nullable: true,
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamptz',
    nullable: true,
  })
  endDate: Date;

  @Column({
    name: 'created_by',
    type: 'integer',
    nullable: true,
  })
  createdBy: number;

  @Column({
    name: 'updated_by',
    type: 'integer',
    nullable: true,
  })
  updatedBy: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
