import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Bill } from '../domain/Bill';
import { Router } from '@angular/router';
import { Category } from '../domain/Category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  list: Bill[] = []

  categories = ["Sample Item"]

  constructor(
    private data: DataService,
    private router: Router) {}

  details(b: Bill) {
    // this.router.navigate(["/"])
    this.data.healthcheck((m: string) => {
      console.log(m)
    })
  }

  allCategoryValues() {
    this.data.getCategories((m: string[]) => {
      console.log(m)
      this.categories = m
    })
  }

  saveCategory(categoryName: string, categoryValue: string) {
    let handleResponse = (result: boolean) => {
      if (result) {
        console.log("[INFO] Category saved successfully")
      } else {
        console.log("[INFO] Category data may be inconsistent")
      }
    }
    // Need to add .toString() because it was being interpreted as string array on backend
    let c = new Category(categoryName, categoryValue.toString())
    this.data.saveCategory(c, handleResponse)
  }

  ngOnInit() {
    this.data.getRecentBills((pendingBills: string[]) => {
      pendingBills.forEach(billName => {
        console.log(`[INFO] pending category added: ${billName.toString()}`)        
        this.list.push(new Bill("", "2024", billName.toString(), null, 0))
      });
    })
    this.allCategoryValues()
  }
}
