import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models';

@Injectable()
export class ApiService {
  private ROOTURL = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // TODO: Pipe, errors and notifications
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.ROOTURL}/project`);
  }
}
