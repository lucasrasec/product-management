import { Component, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { EventEmitter } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { take } from 'rxjs';

@Component({
  selector: 'product-list',
  imports: [MatTableModule, CurrencyPipe, MatIconModule, MatTooltip, DatePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public  readonly displayedColumns: string[] = ['name', 'description', 'category', 'price', 'createdAt', 'featured', 'actions'];
  @Input() products: Product[] = [];
  @Output() emitAction = new EventEmitter<Product>();

  constructor(private productService: ProductsService) {}

  public updateAction(product: Product) {
    this.emitAction.emit(product)
  }

  public deleteAction(product: Product) {
    this.deleteProduct(product)
  }

  public deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).pipe(take(1)).subscribe(() => {
      this.emitAction.emit()
    });
  }
}
