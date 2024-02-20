import { Component, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent {
  
  @ViewChild(MatTable)
  table!: MatTable<any>;
  
  dataSource = []

  displayedColumns = ['categoryKey', 'categoryValue']

  constructor(
    private data: DataService) {}

  ngOnInit() {
    this.data.getCategoriesMap((allCategories: []) => {
      // console.log(allCategories)
      // let tableRegistry:never[] = []
      // allCategories.forEach((map) => {
      //   tableRegistry.push(map['k'], map['v'])
      // })
      this.dataSource = allCategories
      console.log(this.dataSource)      
      // this.table.renderRows()
    })  
  }
}
