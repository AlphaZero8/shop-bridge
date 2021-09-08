import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import * as productsApi from "../api/productsApi";

const initialProductsState = {
    products: [],
    loading: 'idle',
    loadingError: null,
    adding: 'idle',
    updating: 'idle',
    deleting: 'idle',
};

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        productsLoading: (state) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        },

        productsReceived: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.products = action.payload;
            }
        },

        productsLoadingFailed: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.loadingError = action.payload;
            }
        },

        productAdding: (state) => {
            if (state.adding === 'idle') {
                state.adding = 'pending';
            }
        },

        productAdded: (state, action) => {
            if (state.adding === 'pending') {
                state.adding = 'idle';
                state.products = state.products.concat(action.payload);
            }
        },

        productAddFailed: (state) => {
            if (state.adding === 'pending') {
                state.adding = 'idle';
            }
        },

        productUpdating: (state) => {
            if (state.updating === 'idle') {
                state.updating = 'pending';
            }
        },

        productUpdated: (state, action) => {
            if (state.updating === 'pending') {
                const { payload } = action;
                const { id } = payload;
                const indexOfUpdatedProduct = state.products.findIndex(product => product.id === id);
                state.updating = 'idle';
                state.products.splice(indexOfUpdatedProduct, 1, payload);
            }
        },

        productUpdateFailed: (state) => {
            if (state.updating === 'pending') {
                state.updating = 'idle';
            }
        },

        productDeleting: (state) => {
            if (state.deleting === 'idle') {
                state.deleting = 'pending';
            }
        },

        productDeleted: (state, action) => {
            if (state.deleting === 'pending') {
                state.deleting = 'idle';
                state.products = state.products.filter(product => product.id !== action.payload);
            }
        },

        productDeleteFailed: (state) => {
            if (state.deleting === 'pending') {
                state.deleting = 'idle';
            }
        },
    },
});

export const {
    productsLoading,
    productsReceived,
    productsLoadingFailed,
    productAdding,
    productAdded,
    productAddFailed,
    productUpdating,
    productUpdated,
    productUpdateFailed,
    productDeleting,
    productDeleted,
    productDeleteFailed,
} = productsSlice.actions;

const timeout = (ms) => {
    // console.log('in timeout');
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchProducts = () => async (dispatch, getState) => {
    console.log('in fetchProducts');
    dispatch(productsLoading());
    const state = await getState();
    const products = state.products.products;
    console.log(products);

    if (products.length) {
        return dispatch(productsReceived(products));
    } else {
        console.log('no products found -> in else');
        // setTimeout(async () => {
            try {
                await timeout(3000);
                const response = await productsApi.getProducts();
                console.log('fetchProducts response', response);

                dispatch(productsReceived(response.data));
            } catch (err) {
                console.log('error', err);
                dispatch(productsLoadingFailed(err));

                return Promise.reject(err);
            }
        // }, 3000);
    }
};

export const addProduct = (inputData) => async (dispatch, getState) => {
    dispatch(productAdding());
    const state = await getState();
    const products = state.products.products;

    const isDuplicate = products.some(product => (
        product.name === inputData.name
        && product.manufacturer === inputData.manufacturer)
    );

    if (isDuplicate) {
        dispatch(productAddFailed());

        return Promise.reject({
            duplicateProductError: {
                name: `This name exists with the manufacturer ${inputData.manufacturer}. Please change the manufacturer or edit the existing product.`,
                manufacturer: `This manufacturer has the product ${inputData.name}. Please change the name or edit the existing product.`,
            },
            apiError: null,
        });
    } else {
        inputData.id = uuidv4();

        // setTimeout(() => {
        try {
            await timeout(2000);
            const response = await productsApi.addProduct(inputData);
            dispatch(productAdded(response.data));
            // .then((response) => {
            //     return setTimeout(() => {
            //     }, 2000);
            // })
            // .catch(err => {
            //     dispatch(productAddFailed());

            //     return Promise.reject({ duplicateNameEror: null, ...err });
            // });
            // is it needed to return this?
            return response.data;
        } catch (err) {
            dispatch(productAddFailed());

            return Promise.reject({ duplicateNameEror: null, ...err });
        };
    }
};

export const editProduct = (productId, inputData) => async (dispatch, getState) => {
    dispatch(productUpdating());

    const state = await getState();
    const products = state.products.products;

    console.log('products in state', products);
    console.log('productId received in params', productId);
    console.log('inputData received in params', inputData);

    const isDuplicate = products.some(product => (
        product.name === inputData.name
        && product.manufacturer === inputData.manufacturer
        && product.id !== productId
    ));

    console.log('isduplicate', isDuplicate);

    if (isDuplicate) {
        dispatch(productUpdateFailed());

        return Promise.reject({
            duplicateProductError: {
                name: `This name exists with the manufacturer ${inputData.manufacturer}. Please change the manufacturer.`,
                manufacturer: `This manufacturer has the product ${inputData.name}. Please change the name.`,
            },
            apiError: null,
        });
    } else {
        try {
            await timeout(2000);
            const response = await productsApi.updateProduct(productId, inputData);
            dispatch(productUpdated(response.data));
        } catch (err) {
            dispatch(productUpdateFailed());

            return Promise.reject({ duplicateNameError: null, ...err });
        }
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch(productDeleting());
    try {
        await productsApi.deleteProduct(productId);
        dispatch(productDeleted(productId));
    } catch (err) {
        dispatch(productDeleteFailed());
        return Promise.reject(err);
    }
};

export default productsSlice.reducer;