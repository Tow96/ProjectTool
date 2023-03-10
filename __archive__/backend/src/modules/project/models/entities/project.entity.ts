import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
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
  })
  tags: string[];

  @Column({
    nullable: false,
    default: '',
  })
  location: string;

  @Column({
    name: 'image_location',
    nullable: false,
    default: '',
  })
  imageLocation: string;

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
}
