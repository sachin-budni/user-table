import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';

@Injectable()
export class UserService {

  URL= 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  get users(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  addUser(payload: User): Observable<User> {
    return this.http.post<User>(this.URL, payload);
  }

  updateUser(payload: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${payload.id}`, payload);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
