import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'
import { MatTableModule } from "@angular/material/table";

import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component'

import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CategoryComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,    
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
