export interface CreateProject {
  id: number;
  name: string;
  location: string;
  description: string;
  tags: []; // TODO: Proper tags
}
