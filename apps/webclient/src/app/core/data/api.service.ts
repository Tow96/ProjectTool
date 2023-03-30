// Libraries
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, ObservableInput, throwError } from 'rxjs';
// Misc
import { environment } from '../../../environments/environment';

/* eslint-disable @typescript-eslint/no-explicit-any*/
@Injectable()
export abstract class ApiService {
  protected ROOTURL = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}
  private headers = { Accept: 'application/json', Pragma: 'no-cache' };

  private processError = (error: any): ObservableInput<any> => {
    console.error(error);
    return throwError(() => error.error);
  };

  protected getMessage(uri: string): Observable<any> {
    return this.http.get(`${this.ROOTURL}/${uri}`, { headers: this.headers }).pipe(
      // retry(3),
      catchError((error) => this.processError(error))
    );
  }

  protected putMessage(uri: string, payload: any): Observable<any> {
    return this.http.put(`${this.ROOTURL}/${uri}`, payload, { headers: this.headers }).pipe(
      // retry(3),
      catchError((error) => this.processError(error))
    );
  }

  protected postMessage(uri: string, payload: any): Observable<any> {
    return this.http.post(`${this.ROOTURL}/${uri}`, payload, { headers: this.headers }).pipe(
      // retry(3),
      catchError((error) => this.processError(error))
    );
  }

  protected deleteMessage(uri: string): Observable<any> {
    return this.http.delete(`${this.ROOTURL}/${uri}`, { headers: this.headers }).pipe(
      // retry(3),
      catchError((error) => this.processError(error))
    );
  }
}
