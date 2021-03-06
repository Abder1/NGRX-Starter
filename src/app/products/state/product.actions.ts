import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProduct = createAction (
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction (
    '[Product] Set Current Product',
    props<{ product: Product }>()
);

export const clearCurrentProduct = createAction (
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction (
    '[Product] Initialize Current Product'
);

export const loadProducts = createAction (
    '[Product] Load'
);

export const loadProductsSuccess = createAction (
    '[Product] Load success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction (
    '[Product] Load Failed',
    props<{ error: string }>()
)