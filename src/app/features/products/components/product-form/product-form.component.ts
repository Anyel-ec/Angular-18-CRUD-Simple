import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../core/models/product.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  /**
   * If `initialProduct` is provided, we patch the form for “edit” mode.
   * Otherwise, the form is empty for “create” mode.
   */
  @Input() initialProduct: Product | null = null;

  /**
   * Emits a Product object when the user clicks “Submit” and the form is valid.
   */
  @Output() formSubmit: EventEmitter<Product> = new EventEmitter<Product>();

  public productForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    if (this.initialProduct) {
      // If editing, patch values and disable the ID field
      this.productForm.patchValue(this.initialProduct);
      this.productForm.get('id')?.disable();
    }
  }

  /**
   * Construye el FormGroup con validaciones mínimas.
   */
  private buildForm(): void {
    this.productForm = this.fb.group({
      id: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]]
    });
  }

  /**
   * Llamado cuando el usuario hace clic en “Submit”.
   * Emite la data solo si el formulario es válido.
   */
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    // Si estamos en “edit” mode, el control `id` está deshabilitado, así que:
    const formValue = this.productForm.getRawValue() as Product;
    this.formSubmit.emit(formValue);
  }

  /**
   * Permite al contenedor (create/edit page) resetear el formulario por completo.
   */
  onReset(): void {
    this.productForm.reset();
    if (this.initialProduct) {
      // Si veníamos de edición, volvemos a parchear los datos originales
      this.productForm.patchValue(this.initialProduct);
      this.productForm.get('id')?.disable();
    }
  }

  // Getters convenientes para el template
  get id() {
    return this.productForm.get('id');
  }
  get name() {
    return this.productForm.get('name');
  }
  get description() {
    return this.productForm.get('description');
  }
  get logo() {
    return this.productForm.get('logo');
  }
  get date_release() {
    return this.productForm.get('date_release');
  }
  get date_revision() {
    return this.productForm.get('date_revision');
  }
}
