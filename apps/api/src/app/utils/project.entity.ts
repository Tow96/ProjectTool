import { ProjectStatus, Project } from '@pt/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'project',
})
export class ProjectEntity implements Project {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    type: 'simple-array',
    nullable: false,
    default: '',
  })
  tags: number[];

  @Column({
    nullable: false,
    default: '',
  })
  location: string;

  @Column({
    name: 'image_location',
    nullable: true,
    default: '',
  })
  imageLocation: string | null;

  @Column({
    type: 'datetime',
    name: 'created_on',
    nullable: false,
  })
  createdOn: Date;

  @Column({
    type: 'datetime',
    name: 'last_archived',
    nullable: true,
  })
  lastArchived: Date;

  status: ProjectStatus;
}
