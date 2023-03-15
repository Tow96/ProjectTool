/** create-project.dto.ts
 * Copyright (c) 2023, Towechlabs
 *
 * Dto for creating projects
 */
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProject } from '@pt/models';

// TODO: i18n
export class CreateProjectDto implements CreateProject {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least three characters long' })
  @ApiProperty({ description: 'Name of the project', example: 'project' })
  name: string;

  // TODO: Max Length?
  @IsString({ message: 'description must be a string' })
  @ApiProperty({
    description: 'Short description of the project',
    example: 'Project description',
  })
  description: string;

  // TODO: Tags
  // @IsArray({ message: 'tags must be a string array' })
  // @IsString({ each: true, message: 'tags must be a string array' })
  // tags: string[];

  // TODO: add / if missing
  @IsString({ message: 'location must be a string' })
  @IsNotEmpty({ message: "location can't be an empty string" })
  @ApiProperty({
    description: 'Relative path of the folder to the projects folder',
    example: 'project',
  })
  location: string;
}
