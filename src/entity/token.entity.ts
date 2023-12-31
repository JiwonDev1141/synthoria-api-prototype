import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'refresh_token',
    unique: true,
    nullable: false,
  })
  refreshToken: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
  })
  updatedAt!: Date;

  @OneToOne(() => Member, (member) => member.token)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
