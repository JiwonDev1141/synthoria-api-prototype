import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { SubTask } from './sub-task.entity';
import { TaskSection } from './section.entity';
import { SectionRepository } from '../repository/section.repository';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.tasks)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => TaskSection, (taskSection) => taskSection.task)
  @JoinColumn({ name: 'task_section_id' })
  taskSection: TaskSection;

  @OneToMany(() => SubTask, (subTask) => subTask.task)
  @JoinColumn({ name: 'sub_task_id' })
  subTasks: SubTask[];

  @Column({
    name: 'task_name',
    type: 'varchar',
    length: 255,
  })
  taskName: string;

  @Column({
    name: 'task_description',
    type: 'varchar',
    length: 1023,
  })
  taskDescription: string;

  @Column({
    name: 'task_type',
    type: 'varchar',
    length: 255,
  })
  taskType: string;

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
