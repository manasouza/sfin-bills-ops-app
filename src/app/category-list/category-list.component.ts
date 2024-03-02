import { Component, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent {
  
  @ViewChild(MatTable)
  table!: MatTable<any>;
  
  categoryMapData = []
  dataSource = new MatTableDataSource();

  displayedColumns = ['categoryKey', 'categoryValue']

  constructor(
    private data: DataService) {}

  ngOnInit() {
    this.data.getCategoriesMap((allCategories: []) => {
      this.categoryMapData = allCategories
      console.log(this.categoryMapData)
      this.dataSource.data = this.categoryMapData
      console.log(this.dataSource.data)
    })  
  }
  
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value
    console.log(filterValue);
    console.log(this.dataSource.data)
    console.log(this.dataSource.filteredData)
    this.dataSource.filter = filterValue.trim().toLowerCase()
    console.log(this.dataSource.filteredData)
    this.dataSource.data = this.dataSource.filteredData
    this.table.renderRows()
  }
    
}
