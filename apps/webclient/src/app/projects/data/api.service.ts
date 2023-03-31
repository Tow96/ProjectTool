// Libraries
import { Injectable } from '@angular/core';
import { EditProject, Project } from '@pt/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable()
export class ProjectApiService extends ApiService {
  getProjects(): Observable<Project[]> {
    return super.getMessage('project');
  }

  updateProject(id: number, project: EditProject, img?: File): Observable<Project> {
    const fd = new FormData();
    Object.keys(project).forEach((key) => {
      fd.append(key, (project[key as keyof EditProject] || '').toString());
    });

    if (img) fd.append('image', img, img.name);

    return super.putMessage(`project/${id}`, fd);
  }
}
