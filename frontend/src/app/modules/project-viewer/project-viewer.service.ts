import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CreateProject, Project } from './models';

@Injectable()
export class ProjectViewerService extends ApiService {
  createProject(project: CreateProject): Observable<Project> {
    return super.post('project', project);
  }

  // TODO: type
  deleteProject(id: number): Observable<any> {
    return super.delete(`project/${id}`);
  }

  getProjects(): Observable<Project[]> {
    return super.get('project');
  }

  updateProject(project: Project): Observable<Project> {
    return super.put(`project/${project.id}`, project);
  }
}
