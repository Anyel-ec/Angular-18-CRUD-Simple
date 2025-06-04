import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [
    FormsModule
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  /** Valor actual del input */
  public query: string = '';

  onEnterKey(): void {
    this.search.emit(this.query.trim());
  }

}
