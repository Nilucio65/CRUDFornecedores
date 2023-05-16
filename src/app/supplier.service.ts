import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './form/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  url = "http://localhost:3000/supplier";
  constructor(private http: HttpClient) { }


  getSuppliers(): Observable<Supplier[]> {

      return this.http.get<Supplier[]>(this.url);
  }

  save(newsupplier:Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.url, newsupplier);
  }

  remove(supplier:Supplier): Observable<void>{
   // return this.http.delete<void>(`${this.url}/${supplier.id}`);
    return this.http.delete<void>(this.url + "/" + supplier.id);

  }

  update(supplier:Supplier): Observable<Supplier>{
    // return this.http.delete<void>(`${this.url}/${supplier.id}`);
     return this.http.put<Supplier>(`${this.url}/${supplier.id}`, supplier);

   }
}
