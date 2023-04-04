// Libraries
import { Injectable } from '@angular/core';
import { CreateProject, EditProject, Project } from '@pt/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable()
export class ProjectApiService extends ApiService {
  getProjects(): Observable<Project[]> {
    return super.getMessage('project');
  }

  createProject(project: CreateProject, img?: File): Observable<Project> {
    const formData = new FormData();
    Object.keys(project).forEach((key) => {
      formData.append(key, (project[key as keyof CreateProject] || '').toString());
    });

    if (img) formData.append('image', img, img.name);

    return super.postMessage(`project`, formData);
  }

  deleteProject(id: number): Observable<{ affected: number }> {
    return super.deleteMessage(`project/${id}`);
  }

  updateProject(id: number, project: EditProject, img?: File): Observable<Project> {
    const formData = new FormData();
    Object.keys(project).forEach((key) => {
      formData.append(key, (project[key as keyof EditProject] || '').toString());
    });

    if (img) formData.append('image', img, img.name);

    return super.putMessage(`project/${id}`, formData);
  }
}
