export interface Project {
  id: number;
  name: string;
  description: string;
  location: string;
  createdOn: Date;
  lastArchived: Date;
  status: number;
  detailsVisible?: boolean;
  loading?: boolean;
}
