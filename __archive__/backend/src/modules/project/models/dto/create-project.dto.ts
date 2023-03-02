/** create-project.dto.ts
 * Copyright (c) 2023, Towechlabs
 *
 * Dto for creating projects
 */
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

// TODO: i18n
export class CreateProjectDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least three characters long' })
  name: string;

  @IsString({ message: 'description must be a string' })
  // TODO: Max Length?
  description: string;

  @IsArray({ message: 'tags must be a string array' })
  @IsString({ each: true, message: 'tags must be a string array' })
  tags: string[];

  @IsString({ message: 'location must be a string' })
  @IsNotEmpty({ message: "location can't be an empty string" })
  // TODO: add / if missing
  location: string;

  // TODO: img
}
