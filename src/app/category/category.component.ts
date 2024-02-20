import { Component } from '@angular/core';
import { Category } from '../domain/Category';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  category = new Category()
  categories = ["Supermercado", "Esporte", "Farmácia", "Consultas", "Transporte"]

  // dataService = new DataService()
  constructor(
    private data: DataService,
    private router: Router) {}

  getCategories() {

  }

  cancel() {
    this.router.navigate(["/"])
  }

  save() {
    let handleResponse = (result: boolean) => {
      if (result) {

      }
    }
    this.data.saveCategory(this.category, handleResponse)
  }
}
