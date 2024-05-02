import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

 
  
  /*private baseUrl = 'http://localhost:5271/api/Angular/payment'; // Update this with your actual API base URL

  constructor(private http: HttpClient) { }

  makePayment(securityCode: number): Observable<any> {
    const url = `${this.baseUrl}/payment`;
    return this.http.post<any>(url, { securityCode }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('API Error:', error);
    return throwError('Something went wrong, please try again later.');
  }*/ 
  

  private baseUrl = 'http://localhost:5179/api/Angular';
  
  constructor(private http: HttpClient) { }

  makePayment(userId: string, securityCode: number): Observable<any> {
    const url = `${this.baseUrl}/payment`;
    const body = { userId, securityCode };
    return this.http.post<any>(url, body);
  } 

  addCard(cardDetails: any): Observable<any> {
    // Use the full URL including the base URL and endpoint
    const url = `${this.baseUrl}/add-card`;
    return this.http.post<any>(url, cardDetails);
  } 

  editCard(cardDetails: any): Observable<any> {
    const url = `${this.baseUrl}/edit-card/${cardDetails.cardId}`;
    return this.http.put<any>(url, cardDetails);
  }


  deleteCard(cardId: number): Observable<any> {
    const url = `${this.baseUrl}/delete-card`;
    // Assuming you have set up the backend to accept DELETE requests with a body
    return this.http.delete<any>(url, { body: { cardId: cardId } });
  }
  
  
}
