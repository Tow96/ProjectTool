/** create-project.dto.ts
 * Copyright (c) 2023, Towechlabs
 *
 * Dto for creating projects
 */
import { EditProject } from '@pt/models';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class EditProjectDto implements EditProject {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least three characters long' })
  name: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @Transform(({ value }) => value.slice(0, 140))
  description: string;

  @IsOptional()
  @IsArray({ message: 'tags must be a string array' })
  @IsString({ each: true, message: 'tags must be a string array' })
  tags: string[];

  @IsOptional()
  @IsBoolean({ message: 'removeImg must be a boolean' })
  removeImg = false;
}
