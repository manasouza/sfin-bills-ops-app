import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Bill } from '../domain/Bill';
import { Router } from '@angular/router';
import { Category } from '../domain/Category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  list: Bill[] = []
  isLoading: boolean = true
  private seenBills: Set<string> = new Set<string>()

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

  saveCategory(bill: Bill, categoryValue: string) {
    if (!categoryValue) {
      console.warn('[WARN] No category selected for save.')
      return
    }

    let handleResponse = (result: boolean) => {
      if (result) {
        console.log("[INFO] Category saved successfully")
        this.list = this.list.filter(item => item !== bill)
        this.seenBills.delete(bill.name)
      } else {
        console.log("[INFO] Category data may be inconsistent")
      }
    }
    // Need to add .toString() because it was being interpreted as string array on backend
    let c = new Category(bill.name, categoryValue.toString())
    this.data.saveCategory(c, handleResponse)
  }

  ngOnInit() {
    this.isLoading = true
    this.data.getRecentBills((pendingBills: string[]) => {
      if (Array.isArray(pendingBills)) {
        pendingBills.forEach(billName => {
          const name = billName.toString()
          if (!this.seenBills.has(name)) {
            console.log(`[INFO] pending category added: ${name}`)
            this.seenBills.add(name)
            this.list.push(new Bill("", "2024", name, null, 0))
          } else {
            console.log(`[DEBUG] duplicate suppressed: ${name}`)
          }
        })
      }
      this.isLoading = false
    })
    this.allCategoryValues()
  }
}
