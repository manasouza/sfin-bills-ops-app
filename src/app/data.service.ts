import { Injectable } from '@angular/core';
import { Bill } from './domain/Bill';
import { Category } from './domain/Category';
import { FirestoreService } from './firestore.service';
import { SpreadsheetService } from './spreadsheet.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   
  private endpoint = "http://localhost:3000"
  private categoryResource = "/categories"
  private categoryMappningResource = "/categories/mapping"

  constructor(private http: HttpClient) { }

  getRecentBills(callback: Function) {
    const list = [
      new Bill("pix", "2024-02-15", "hungsing", new Category("Esporte", "hungsing"), 10),
      new Bill("credit", "2024-02-05","supermercado", new Category("Supermercado", "supermercado"), 103.30),
      new Bill("pix", "2024-02-25","terapia", new Category("Consultas", "terapia"), 210.99)
    ]
    callback(list)
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
    this.http.get(`${this.endpoint}${this.categoryMappningResource}`)
      .subscribe(resp => callback(resp))
  }

  saveCategory(category: Category, callback: Function) {
    // this.firestore.createKeyValue(category.name, category.value)
    this.http.post(`${this.endpoint}${this.categoryResource}`, category)
      .subscribe(resp => callback(resp))
  }

}
