import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = `${environment.apiUrl}/api/address`;

  constructor(private http: HttpClient) {}

  getAllAddresses(): Observable<Address[]> {
    return this.http
      .get<Address[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getAddress(id: number): Observable<Address> {
    return this.http
      .get<Address>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createAddress(address: Omit<Address, 'id'>): Observable<Address> {
    return this.http
      .post<Address>(this.apiUrl, address)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error || 'Server error';
    }

    return throwError(() => errorMessage);
  }
}
