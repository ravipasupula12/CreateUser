import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpSericeService {

  constructor(private http: HttpClient) { }

  get(){
    this.http.get(' https://jsonplaceholder.typicode.com/users')
  }
}
