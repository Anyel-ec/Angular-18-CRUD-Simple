import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ProductsPageComponent} from './pages/product-page/product-page.component';
import {ProductCreatePageComponent} from './pages/product-create-page/product-create-page.component';
import {ProductEditPageComponent} from './pages/product-edit-page/product-edit-page.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule, SharedModule, ProductsRoutingModule, ProductsPageComponent, ProductEditPageComponent, ProductListComponent, ProductFormComponent, ProductFormComponent, ProductCreatePageComponent, ProductsPageComponent
  ]
})
export class ProductsModule { }
