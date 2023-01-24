/** create-project.dto.ts
 * Copyright (c) 2023, Towechlabs
 *
 * Dto for creating projects
 */
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class EditProjectDto {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least three characters long' })
  name: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  // TODO: Max Length?
  description: string;

  @IsOptional()
  @IsArray({ message: 'tags must be a string array' })
  @IsString({ each: true, message: 'tags must be a string array' })
  tags: string[];
}
