import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

}
