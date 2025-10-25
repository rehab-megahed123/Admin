import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest } from "../interfaces/Login/LoginRequest";
import { LoginResponse } from "../interfaces/Login/LoginResponse";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  `${environment.apiUrl}/api/Auth`; 

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }
 

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

 

  

 
}