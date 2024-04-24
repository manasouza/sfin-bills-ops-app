import { Injectable } from '@angular/core';
import { Category } from './domain/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   
  private endpoint = "http://localhost:3000"
  private categoryResource = "/categories"
  private categoryMappingResource = "/categories/mapping"
  private categoryUnmappedResource = "/categories/unmapped"

  constructor(private http: HttpClient) { }

  getRecentBills(callback: Function) {
    this.http.get(`${this.endpoint}${this.categoryUnmappedResource}`)
      .subscribe(resp => callback(resp))
  }
  
  healthcheck(callback: Function) {
    this.http.get(`${this.endpoint}`)
      .subscribe(resp => callback(resp))
  }

  getCategories(callback: Function) {
    this.http.get(`${this.endpoint}${this.categoryResource}`)
      .subscribe(resp => callback(resp))
  }

  getCategoriesMap(callback: Function) {
    this.http.get(`${this.endpoint}${this.categoryMappingResource}`)
      .subscribe(resp => callback(resp))
  }

  saveCategory(category: Category, callback: Function) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers };
    console.log("[INFO] save category: " + category.toString())
    this.http.post(`${this.endpoint}${this.categoryResource}`, category, options)
      .subscribe(resp => callback(resp))
  }

}
