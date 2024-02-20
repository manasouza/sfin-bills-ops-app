import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Bill } from '../domain/Bill';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.data.getRecentBills((bills: Bill[]) => {
      this.list = bills
    })
    this.allCategoryValues()
  }
}
