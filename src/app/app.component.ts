import { Component, inject } from '@angular/core';
import { ProductListComponent } from './features/product_manager/product-list/product-list.component';
import { ToolbarComponent } from './features/toolbar/toolbar.component';
import { ProductsService } from './core/services/products.service';
import { Product, ProductBody, SearchProductFilter } from './shared/models/product';
import { ProductFormComponent } from './features/product_manager/product-form/product-form.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent, ToolbarComponent, ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public products: Product[] = [];
  public productActionAtive = '';
  public activeProduct!: Product;
  private _snackBar = inject(MatSnackBar);
  public currentFilter!: SearchProductFilter;

  constructor(private productService: ProductsService) {}

  public searchProducts(filter: SearchProductFilter): void {
    this.currentFilter = filter;
    this.loadProducts(filter);
  }
  
  public loadProducts(filter?: SearchProductFilter): void {
    this.productService.fetchProducts(filter).subscribe(data => {
      this.products = data;
    });
  }

  public createProduct(body: ProductBody): void {
    const payload: ProductBody = {
      ...body,
      createdAt: new Date()
    }

    this.productService.createProduct(payload).subscribe(() => {
      this.handleActionFinilize()
    })
  }

  public updateProduct(body: ProductBody): void {
    this.productService.updateProduct(this.activeProduct.id, body).subscribe(() => {
      this.handleActionFinilize()
    })
  }

  public handleActionFinilize() {
    this.handleAction('');
    this.openSnackBar('Produto adicionado com sucesso!');
    this.loadProducts(this.currentFilter);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 3000 });
  }

  public handleAction(action: string): void {
    this.productActionAtive = action;
  }

  public handleFormEvent(data: ProductBody | null): void {
  if (!data) {
    this.handleAction('');
    return;
  }

  switch (this.productActionAtive) {
    case 'create':
      this.createProduct(data);
      break;

    case 'update':
      this.updateProduct(data);
      break;
  }
}

  public handleTableEvent(data: Product): void {
    if (!data) {
      this.loadProducts(this.currentFilter);
      return 
    }
    this.activeProduct = data;
    this.handleAction('update');
  } 
  
  ngOnInit(): void {
    this.loadProducts()
  }
}
