import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Router from './components/../router/Router';
import ProductsImage from './components/ProductsImage/ProductsImage';
import { fetchProducts } from './components/../store/productsSlice';

import './constants/scss/colors.scss';

export default function App() {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

  return (
    <div data-test="component-app" className="App">
      <BrowserRouter>
        <div data-testid="component-header">
          <Header />
        </div>
        <div data-testid="component-products-image">
          <ProductsImage />
        </div>
        <div data-testid="component-router">
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}
