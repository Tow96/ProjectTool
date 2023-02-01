import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

/* eslint-disable  @typescript-eslint/no-explicit-any*/
@Injectable()
export class ApiService {
  protected ROOTURL = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.ROOTURL}/${path}`).pipe(
      retry(3),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.ROOTURL}/${path}`).pipe(
      retry(3),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  post(path: string, payload: any): Observable<any> {
    return this.http.post(`${this.ROOTURL}/${path}`, payload).pipe(
      retry(3),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  put(path: string, payload: any): Observable<any> {
    return this.http.put(`${this.ROOTURL}/${path}`, payload).pipe(
      retry(3),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
