import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import pagesReducer from './pagesSlice';

const makeStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            pages: pagesReducer,
            products: productsReducer,
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
};

export default makeStore;