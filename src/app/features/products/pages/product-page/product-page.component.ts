import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../../core/services/product.service';
import {Product} from '../../../../core/models/product.model';
import {SearchInputComponent} from '../../../../shared/components/search-input/search-input.component';
import {PaginationSelectComponent} from '../../../../shared/components/pagination-select/pagination-select.component';
import {NgForOf, NgIf} from '@angular/common';
import {ProductItemComponent} from '../../components/product-item/product-item.component';
import {ModalConfirmComponent} from '../../../../shared/components/model-confim/model-confim.component';


@Component({
  selector: 'app-product-page',
  imports: [
    SearchInputComponent,
    PaginationSelectComponent,
    NgIf,
    ProductItemComponent,
    ModalConfirmComponent,
    NgForOf
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public isLoading: boolean = false;

  public currentPageSize: number = 5;
  public currentSearchQuery: string = '';

  // Para manejar el modal de confirmación al eliminar
  public showConfirmModal: boolean = false;
  private productToDeleteId: string | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Carga todos los productos y los guarda en `this.products`.
   * Aplica luego paginación y/o búsqueda sobre el arreglo.
   */
  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res.data;
        this.applyFilters(); // Aplica búsqueda + paginación inicial
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Aplica filtro por búsqueda y luego toma los primeros `currentPageSize`.
   */
  private applyFilters(): void {
    const queryLower = this.currentSearchQuery.trim().toLowerCase();
    if (queryLower) {
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower)
      );
    } else {
      this.filteredProducts = [...this.products];
    }
    // Aplica paginación (solo items hasta currentPageSize)
    this.filteredProducts = this.filteredProducts.slice(0, this.currentPageSize);
  }

  /**
   * Handler para el evento de búsqueda emitido por SearchInputComponent.
   */
  onSearch(query: string): void {
    this.currentSearchQuery = query;
    this.applyFilters();
  }

  /**
   * Handler para el evento pageSizeChange emitido por PaginationSelectComponent.
   */
  onPageSizeChange(newSize: number): void {
    this.currentPageSize = newSize;
    this.applyFilters();
  }

  /**
   * Navegar a la página de creación de producto.
   */
  onCreateNew(): void {
    // Suponiendo que uses Router, inyecta Router en el constructor:
    // constructor(private productService: ProductService, private router: Router) {}
    // this.router.navigate(['/products/create']);
  }

  /**
   * Pide confirmación antes de eliminar un producto.
   */
  askDelete(id: string): void {
    this.productToDeleteId = id;
    this.showConfirmModal = true;
  }

  /**
   * Ejecuta DELETE si el usuario confirmó.
   */
  onConfirmDelete(): void {
    if (!this.productToDeleteId) return;

    this.productService.delete(this.productToDeleteId).subscribe({
      next: () => {
        // Recarga productos luego de eliminar
        this.loadProducts();
        this.resetModalState();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.resetModalState();
      }
    });
  }

  /**
   * Cancela la eliminación y oculta el modal.
   */
  onCancelDelete(): void {
    this.resetModalState();
  }

  /**
   * Reinicia estado del modal de confirmación.
   */
  private resetModalState(): void {
    this.productToDeleteId = null;
    this.showConfirmModal = false;
  }

  /**
   * Navegar a la página de edición para el producto con ID dado.
   */
  onEdit(id: string): void {

  }
}
