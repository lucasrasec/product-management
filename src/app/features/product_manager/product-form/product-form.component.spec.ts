import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product, ProductBody } from '../../../shared/models/product';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  const mockProduct: Product = {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    category: 'Category 1',
    featured: false,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductFormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    fixture.detectChanges();

    const formValues = component.productForm.value;
    expect(formValues).toEqual({
      name: '',
      description: '',
      price: null,
      category: '',
      featured: false,
    });
  });

  it('should patch the form with product data on init', () => {
    component.product = mockProduct;
    component.ngOnInit();
    fixture.detectChanges();

    const formValues = component.productForm.value;
    expect(formValues).toEqual({
      name: mockProduct.name,
      description: mockProduct.description,
      price: mockProduct.price,
      category: mockProduct.category,
      featured: mockProduct.featured,
    });
  });

  it('should emit null when onCancel is called', () => {
    jest.spyOn(component.emitValue, 'emit');

    component.onCancel();

    expect(component.emitValue.emit).toHaveBeenCalledWith(null);
  });

  it('should emit the form value when onSubmit is called with a valid form', () => {
    jest.spyOn(component.emitValue, 'emit');

    component.productForm.setValue({
      name: 'New Product',
      description: 'New Description',
      price: 200,
      category: 'New Category',
      featured: true,
    });

    component.onSubmit();

    const expectedPayload: ProductBody = {
      name: 'New Product',
      description: 'New Description',
      price: 200,
      category: 'New Category',
      featured: true,
      createdAt: new Date(), // Formato YYYY-MM-DD
    };

    expect(component.emitValue.emit).toHaveBeenCalledWith(expectedPayload);
  });

  it('should not emit the form value when onSubmit is called with an invalid form', () => {
    jest.spyOn(component.emitValue, 'emit');

    component.productForm.setValue({
      name: '', // Nome inválido (campo obrigatório)
      description: 'New Description',
      price: 200,
      category: 'New Category',
      featured: true,
    });

    component.onSubmit();

    expect(component.emitValue.emit).not.toHaveBeenCalled();
  });

  it('should return true when compareValues detects changes', () => {
    component.product = mockProduct;
    component.ngOnInit();

    component.productForm.patchValue({ name: 'Updated Product' });

    const hasChanges = component.compareValues();
    expect(hasChanges).toBe(true);
  });

  it('should return false when compareValues detects no changes', () => {
    component.product = mockProduct;
    component.ngOnInit();

    const hasChanges = component.compareValues();
    expect(hasChanges).toBe(false);
  });

  it('should return false when validateForm is called with no changes in update mode', () => {
    component.action = 'update';
    component.product = mockProduct;
    component.ngOnInit();

    const isValid = component.validateForm();
    expect(isValid).toBe(false);
  });

  it('should return true when validateForm is called with changes in update mode', () => {
    component.action = 'update';
    component.product = mockProduct;
    component.ngOnInit();

    component.productForm.patchValue({ name: 'Updated Product' });

    const isValid = component.validateForm();
    expect(isValid).toBe(true);
  });
});