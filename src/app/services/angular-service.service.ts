import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularServiceService {


  private baseUrl = 'http://localhost:5179/api/Angular/login'; 
  private errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  constructor(private http: HttpClient) { }

  /*login(userId: string, password: string): Observable<any> {
    const loginData = { userId, password };
    return this.http.post<any>(`${this.baseUrl}`, loginData);
  }*/ 
  login(userId: string, password: string): Observable<any> {
    const loginData = { userId, password };
    return this.http.post<any>(`${this.baseUrl}`, loginData).pipe(
      catchError(error => {
        this.errorMessageSubject.next('Invalid credentials. Please try again.');
        return throwError(() => error);
      })
    );
  } 

  logout(): void {
    // Clear authentication state (if any)
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  } 

  isAuthenticated(): boolean {
    // Check if there is a token or logged-in user in local storage
    return localStorage.getItem('isLoggedIn') === 'true'; // Example implementation
  }
} 
