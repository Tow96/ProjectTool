import { ProjectStatus } from '@pt/models';

export const getStatusText = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.ACTIVE:
    case ProjectStatus.BOTH:
      return 'Active';
    case ProjectStatus.ARCHIVED:
      return 'Archived';
    case ProjectStatus.UNREGISTERED:
      return 'Unregistered';
    default:
      return 'Lost';
  }
};
