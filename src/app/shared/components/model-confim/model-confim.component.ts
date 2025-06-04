import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-model-confim',
  imports: [],
  templateUrl: './model-confim.component.html',
  styleUrl: './model-confim.component.scss'
})
export class ModalConfirmComponent {
  /**
   * Message to display inside the modal.
   * If no message is passed from the parent, it falls back to a default.
   */
  @Input() message: string = 'Are you sure you want to proceed?';

  /**
   * Emits when the user clicks the "Confirm" button.
   */
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits when the user clicks the "Cancel" button (or closes the modal).
   */
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Called when the user clicks "Confirm".
   * Emits the confirm event to the parent.
   */
  onConfirm(): void {
    this.confirm.emit();
  }

  /**
   * Called when the user clicks "Cancel" or closes the modal.
   * Emits the cancel event to the parent.
   */
  onCancel(): void {
    this.cancel.emit();
  }
}
