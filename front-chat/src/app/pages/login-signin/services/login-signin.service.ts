import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthForm, IAuthFormResponse } from '../interfaces/IAuthForm';

import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginSigninService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }


  signinUser(user: IUser): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/user`, user).pipe(take(1));
  }

  loginUser(authForm: IAuthForm): Observable<IAuthFormResponse> {
    return this.http.post<IAuthFormResponse>(`${this.BASE_URL}/session`, authForm).pipe(take(1));
  }



}
