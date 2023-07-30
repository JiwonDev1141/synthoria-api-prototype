import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Room } from './room.entity';

@Entity('member_room')
export class MemberRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.memberRooms)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Room, (room) => room.memberRooms)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({
    name: 'member_id',
    type: 'integer',
  })
  memberId: number;

  @Column({
    name: 'room_id',
    type: 'integer',
  })
  roomId: number;
}
