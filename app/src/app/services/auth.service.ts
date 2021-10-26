import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const AUTH_API = 'https://localhost:5001/api/authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : any;
  decoded : any;
  user : any;

  constructor(
    private http: HttpClient,
    public router: Router
    ) { }

    login(user : any): Observable<any> { 
      return this.http.post(AUTH_API + 'login', user, httpOptions)
    }
  
    register(user:any): Observable<any> {
      return this.http.post(AUTH_API + 'register', user, httpOptions);
    }
  
    signOut(): void {
      window.sessionStorage.clear();
    }
  
    public saveToken(token: string): void {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  
    public getToken(): string | null {
      return window.sessionStorage.getItem(TOKEN_KEY);
    }
  
    decode(token: string) {
      try {
          return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
          console.log("error decoding token");
      }
    }

    getUserDecode() : any{
      this.token = this.getToken();
      return this.decode(this.token);
    }

    public isUserAdmin = (): boolean => {
      const user = this.getUserDecode();
      const role = user.roles;
      return role === 'Admin';
    }
    // Error 
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
}
