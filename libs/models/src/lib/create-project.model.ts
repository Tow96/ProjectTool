// TODO: i18n
export interface CreateProject {
  name: string;
  description: string;

  // TODO: Tags
  // @IsArray({ message: 'tags must be a string array' })
  // @IsString({ each: true, message: 'tags must be a string array' })
  // tags: string[];

  location: string;
}
