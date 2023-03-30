import { Project, ProjectStatus } from '@pt/models';

export const filterProjects = (
  searchInput: string,
  projects: Project[]
): Project[] => {
  const keywords = searchInput.toLowerCase().split(' ');

  return projects.filter((project) => {
    const serializedProject = `${project.name},${
      project.location
    }, ${getStatusText(project.status)}`.toLowerCase();

    for (let i = 0; i < keywords.length; i++) {
      if (keywords[i] !== '' && serializedProject.includes(keywords[i]))
        return true;
    }

    return false;
  });
};

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
