import { Component } from '@angular/core';
import { Category } from '../domain/Category';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  category = new Category()
  categories = ["Supermercado", "Esporte", "Farmácia", "Consultas", "Transporte"]

  isLoading = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoading.asObservable()
  

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
      this.isLoading.next(false)
      if (result) {
        console.log(`[INFO] new category created: ${result}`)
        this.category.name = ""
        this.category.value = ""
      }
    }
    this.data.saveCategory(this.category, handleResponse)
    this.isLoading.next(true)
  }
}
