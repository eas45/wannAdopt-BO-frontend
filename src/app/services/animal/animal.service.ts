import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';

const baseUrl = 'http://localhost:8080/api/animals'
@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(baseUrl);
  }

  find(id: any): Observable<Animal> {
    return this.http.get<Animal>(`${baseUrl}/${id}`);
  }

  create(animal: any): Observable<any> {
    return this.http.post(`${baseUrl}?shelter=5`, animal);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findAllByShelter(params: any): Observable<any> {
    return this.http.get(`${baseUrl}/shelter`, { params });
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

}
