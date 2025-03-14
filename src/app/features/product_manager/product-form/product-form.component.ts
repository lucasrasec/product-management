import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, ProductBody } from '../../../shared/models/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input'
import { EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'product-form',
  imports: [MatFormFieldModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() action!: string;
  @Input() product?: Product;
  @Output() emitValue = new EventEmitter<ProductBody | null>();
  public productForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      featured: [false]
    });
  }

  public compareValues(): boolean {
    if (!this.product) return false;

    const formValues = this.productForm.value;
    const initialValues = this.product;

    return Object.keys(formValues).some(
      (key) => formValues[key] !== initialValues[key as keyof Product]
    );
  }

  public validateForm(): boolean {
  if (!this.productForm.valid) return false;

  if (this.action === 'update' && this.product) {
    const hasChanges = this.compareValues()
    if (!hasChanges) return false;
  }

  return true;
}

  onCancel() {
    this.emitValue.emit(null)
  }
  
  onSubmit(): void {
    const payload: ProductBody = {
      ...this.productForm.value,
      createdAt: this.product?.createdAt || new Date()
    }

    if (this.validateForm()) {
      this.emitValue.emit(payload)
    }
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }
}