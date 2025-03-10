import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Mail} from '../model/mail';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  url = environment.apiUrl

  constructor(private readonly http:HttpClient) { }

  sendEmail(data:Mail):Observable<any>{
    return this.http.post<any>(`${this.url}/email`, data);
  }
}
