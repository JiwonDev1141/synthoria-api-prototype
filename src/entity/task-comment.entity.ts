import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubTask } from './sub-task.entity';
import { Member } from './member.entity';

@Entity('sub_task_comment')
export class SubTaskComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubTask, (subTask) => subTask.subTaskComments)
  subTask: SubTask;

  @ManyToOne(() => Member, (member) => member.subTaskComments)
  member: Member;

  @Column({
    name: 'comment_content',
    type: 'varchar',
    length: 1023,
  })
  commentContent: string;

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
