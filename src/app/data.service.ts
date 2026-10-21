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
  private settingsResource = "/settings"
  private documentsResource = "/documents"

  constructor(private http: HttpClient) { }

  getRecentBills(callback: Function, errorHandler?: Function) {
    this.http.get(`${this.endpoint}${this.categoryUnmappedResource}`)
      .subscribe({
        next: resp => callback(resp),
        error: (err) => {
          console.error('[ERROR] getRecentBills', err)
          callback([])
          if (errorHandler) {
            errorHandler(err)
          }
        }
      })
  }
  
  healthcheck(callback: Function, errorHandler?: Function) {
    this.http.get(`${this.endpoint}`)
      .subscribe({
        next: resp => callback(resp),
        error: (err) => {
          console.error('[ERROR] healthcheck', err)
          callback({ ok: false, message: 'Service unavailable' })
          if (errorHandler) {
            errorHandler(err)
          }
        }
      })
  }

  getCategories(callback: Function, errorHandler?: Function) {
    this.http.get(`${this.endpoint}${this.categoryResource}`)
      .subscribe({
        next: resp => callback(resp),
        error: (err) => {
          console.error('[ERROR] getCategories', err)
          callback([])
          if (errorHandler) {
            errorHandler(err)
          }
        }
      })
  }

  getCategoriesMap(callback: Function, errorHandler?: Function) {
    this.http.get(`${this.endpoint}${this.categoryMappingResource}`)
      .subscribe({
        next: resp => callback(resp),
        error: (err) => {
          console.error('[ERROR] getCategoriesMap', err)
          callback([])
          if (errorHandler) {
            errorHandler(err)
          }
        }
      })
  }

  saveCategory(category: Category, callback: Function) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers };
    console.log("[INFO] save category: " + category.toString())
    this.http.post(`${this.endpoint}${this.categoryResource}`, category, options)
      .subscribe(
        () => callback(true),
        error => {
          console.error('[ERROR] saveCategory', error)
          callback(false)
        }
      )
  }

  getSettings(callback: Function) {
    this.http.get(`${this.endpoint}${this.settingsResource}`)
      .subscribe(resp => callback(resp))
  }

  saveSettings(settings: { columnOffsets: { [source: string]: number } }, callback: Function) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers };
    this.http.put(`${this.endpoint}${this.settingsResource}`, settings, options)
      .subscribe(resp => callback(resp))
  }

  getDocumentById(documentId: string, callback: Function) {
    this.http.get(`${this.endpoint}${this.documentsResource}/${encodeURIComponent(documentId)}`)
      .subscribe(
        resp => callback(resp),
        error => callback(error.error ?? { message: 'Registry not found' })
      )
  }

  deleteDocumentById(documentId: string, callback: Function) {
    this.http.delete(`${this.endpoint}${this.documentsResource}/${encodeURIComponent(documentId)}`)
      .subscribe(
        resp => callback(resp),
        error => callback(error.error ?? { message: 'Registry not found' })
      )
  }

}
