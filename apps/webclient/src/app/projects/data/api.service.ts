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

  updateProject(id: number, project: EditProject): Observable<Project> {
    return super.putMessage(`project/${id}`, project);
  }
}
