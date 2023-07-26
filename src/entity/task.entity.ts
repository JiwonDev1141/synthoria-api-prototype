import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { SubTask } from './sub-task.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.tasks)
  room: Room;

  @OneToMany(() => SubTask, (subTask) => subTask.task)
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
    name: 'task_status',
    type: 'varchar',
    length: 255,
  })
  taskStatus: string;

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
