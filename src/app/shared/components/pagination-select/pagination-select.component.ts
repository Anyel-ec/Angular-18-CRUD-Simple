import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-pagination-select',
  imports: [
    NgForOf
  ],
  templateUrl: './pagination-select.component.html',
  styleUrl: './pagination-select.component.scss'
})
export class PaginationSelectComponent {
  /**
   * Options for page sizes. By default, [5, 10, 20].
   * The parent can override this array if needed.
   */
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  /**
   * Current selected page size. Defaults to the first element of pageSizeOptions.
   */
  @Input() selectedPageSize: number = this.pageSizeOptions[0];

  /**
   * Emits the new page size when the user selects a different option.
   */
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Called when the <select> value changes.
   * Emits the selected page size to the parent.
   */
  onPageSizeChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const newSize = Number(selectEl.value);
    this.selectedPageSize = newSize;
    this.pageSizeChange.emit(newSize);
  }
}
