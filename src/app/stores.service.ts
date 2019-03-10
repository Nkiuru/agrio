import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http: HttpClient) {
  }

  public getStores(): Observable<any> {
    return this.http.get<JSON>('../../assets/stores.json');
  }
}
