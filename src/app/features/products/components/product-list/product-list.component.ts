import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  /**
   * Array of products to display in the table.
   */
  @Input() products: Product[] = [];

  /**
   * Emits the product ID when the user clicks edit on a product.
   */
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emits the product ID when the user clicks delete on a product.
   */
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Forward the edit event up to parent
   */
  onEditClick(id: string): void {
    this.edit.emit(id);
  }

  /**
   * Forward the delete event up to parent
   */
  onDeleteClick(id: string): void {
    this.delete.emit(id);
  }
}
