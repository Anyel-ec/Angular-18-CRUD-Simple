import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCreatePageComponent} from './pages/product-create-page/product-create-page.component';
import {ProductEditPageComponent} from './pages/product-edit-page/product-edit-page.component';
import {ProductsPageComponent} from './pages/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent
    // por defecto: /products → muestra listado
  },
  {
    path: 'create',
    component: ProductCreatePageComponent
    // /products/create → formulario para crear
  },
  {
    path: 'edit/:id',
    component: ProductEditPageComponent
    // /products/edit/abc123 → formulario de edición para el producto con id=abc123
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
