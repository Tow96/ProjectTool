export interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  location: string;
  imageLocation: string;
  createdOn: Date;
  lastArchived: Date;
  status: number;
}
