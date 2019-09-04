import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerareaService {

  constructor(
    private http: HttpClient
  ) { }
  public  queryServiceAreaDataPage(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/paingQueryServiceArea', pamars);
  }
}
