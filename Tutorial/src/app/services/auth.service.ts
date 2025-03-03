import { HttpClient , HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost/Access-Token/Token";
  http = inject(HttpClient);

  register(userData : any): Observable<any> {
    return this.http.post(`${this.apiURL}/register.php`, userData);
  }

  login (userData : any ): Observable<any> {
    return this.http.post(`${this.apiURL}/login.php`, userData);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated() : boolean {
    return this.getToken() !==null;
  }

  getAuthHeaders() : HttpHeaders{
    return new HttpHeaders({
      Authorization : `Bearer ${this.getToken()}`,
      'Content-Type' : 'application/json'
    });
  }
}
