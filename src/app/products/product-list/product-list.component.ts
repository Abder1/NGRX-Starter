import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import * as ProductActions from '../state/product.actions';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getProducts, getShowProductCode } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<any>, private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());

    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProduct());
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
