
import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as ProductActions from './product.actions';


export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector (
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector (
  getProductFeatureState,
  state => state.products
);

export const productReducer = createReducer(
  { showProductCode: true } as ProductState,
  on(ProductActions.toggleProduct, (state): ProductState => {
    console.log('original state : ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),

  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    }
  }),

  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    }
  }),

  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    }
  }),

  on(ProductActions.loadProductsSuccess, (state,action): ProductState => {
    return {
      ...state,
      products: action.products
    }
  })
);

