import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  public setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  get decodePayloadJWT(): any {
    try {
      return jwt_decode(this.getLocalStorage('token')!);
    } catch (Error) {
      return null;
    }
  }

}
