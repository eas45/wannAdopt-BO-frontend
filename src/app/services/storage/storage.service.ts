import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const EMAIL_KEY = 'email-profile';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }
  
  public saveLoginData(loginData: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, loginData.token);
  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      // return JSON.parse(token);
      return token;
    }

    return {};
  }

  public getEmail(): any {
    const email = window.sessionStorage.getItem(EMAIL_KEY);
    if (email) {
      // return JSON.parse(email);
      return email;
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    console.log(token);
    
    if (token) {
      return true;
    }

    return false;
  }
}
