import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/list', component: CategoryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
