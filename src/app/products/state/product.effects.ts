import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductsActions from './product.actions';


@Injectable()
export class ProductEffects {
    constructor (private productService: ProductService, private actions$: Actions){

    }

    loadProducts$ = createEffect(() => {
        return this.actions$
                    .pipe(
                        ofType(ProductsActions.loadProducts),
                        mergeMap(() => this.productService.getProducts()
                            .pipe(
                                map(products => ProductsActions.loadProductsSuccess({ products }))
                            ))
                    )
    })
}