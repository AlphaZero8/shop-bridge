import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import pagesReducer from './pagesSlice';
console.log(productsReducer);

const makeStore = (preloadedState = {}) => {
    console.log('in makeStore()', preloadedState);
    return configureStore({
        reducer: {
            pages: pagesReducer,
            products: productsReducer,
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
};

console.log(makeStore().getState());

export default makeStore;