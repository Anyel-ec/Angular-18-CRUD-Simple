import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import {ProductFormComponent} from '../../components/product-form/product-form.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product-create-page',
  imports: [
    ProductFormComponent,
    NgIf
  ],
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss']
})
export class ProductCreatePageComponent {
  public isSubmitting: boolean = false;
  public submitError: string | null = null;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  /**
   * Callback cuando productForm emite formSubmit con un nuevo Product.
   */
  onFormSubmit(newProduct: Product): void {
    this.isSubmitting = true;
    this.submitError = null;

    this.productService.create(newProduct).subscribe({
      next: (res) => {
        // Una vez creado, navegamos de regreso al listado
        this.router.navigate(['/products']).then(() => {
          console.log('Product created successfully:', res);
          this.isSubmitting = false;
        });
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.submitError = 'There was an error creating the product.';
        this.isSubmitting = false;
      }
    });
  }
}
