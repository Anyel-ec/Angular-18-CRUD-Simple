import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../core/models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../core/services/product.service';
import {NgIf} from '@angular/common';
import {ProductFormComponent} from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product-edit-page',
  imports: [
    NgIf,
    ProductFormComponent
  ],
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss'
})
export class ProductEditPageComponent implements OnInit {
  public isLoading: boolean = false;
  public isSubmitting: boolean = false;
  public submitError: string | null = null;

  public initialProduct: Product | null = null;

  private productId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }

  /**
   * Carga el producto existente desde el backend y lo guarda en initialProduct.
   */
  private loadProduct(id: string): void {
    this.isLoading = true;
    this.productService.getById(id).subscribe({
      next: (prod) => {
        this.initialProduct = prod;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product for edit:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Callback cuando el formulario emite formSubmit con el objeto Product actualizado.
   */
  onFormSubmit(updatedProduct: Product): void {
    if (!this.productId) return;

    this.isSubmitting = true;
    this.submitError = null;

    this.productService.update(this.productId, updatedProduct).subscribe({
      next: () => {
        // Una vez actualizado, volvemos al listado
        this.router.navigate(['/products']).then(r =>  {
          console.log('Product updated successfully:', updatedProduct);
          this.isSubmitting = false;
        });
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.submitError = 'There was an error updating the product.';
        this.isSubmitting = false;
      }
    });
  }
}
