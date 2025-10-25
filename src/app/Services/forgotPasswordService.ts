import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment/environment.development";
import { forgotPasswordResponse } from "../interfaces/ForgotPassword/forgotPasswordResponse";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseUrl = `${environment.apiUrl}/api/ForgotPassword`;

  constructor(private http: HttpClient) {}

  sendOtp(data: { email: string }): Observable<forgotPasswordResponse> {
    localStorage.setItem('resetEmail', data.email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<forgotPasswordResponse>(
      `${this.baseUrl}/send-otp`,
      data,
      { headers }
    );
  }

  verifyOtp(data: { email: string; otp: string }): Observable<forgotPasswordResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<forgotPasswordResponse>(
      `${this.baseUrl}/verify-otp`,
      data,
      { headers }
    );
  }

  resetPassword(data: { email: string; newPassword: string }): Observable<forgotPasswordResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<forgotPasswordResponse>(
      `${this.baseUrl}/reset-password`,
      data,
      { headers }
    );
  }
}