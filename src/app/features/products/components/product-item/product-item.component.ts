import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {Product} from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [
    NgForOf,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  /**
   * Single product data to render in this row.
   */
  @Input() product!: Product;

  /**
   * Emits when user clicks “Edit” button.
   */
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emits when user clicks “Delete” button.
   */
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emit edit event with product ID.
   */
  onEdit(): void {
    this.edit.emit(this.product.id);
  }

  /**
   * Emit delete event with product ID.
   */
  onDelete(): void {
    this.delete.emit(this.product.id);
  }
}
