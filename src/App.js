import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Alert from '@material-ui/lab/Alert';

import Header from './components/Header/Header';
import Router from './components/../router/Router';
import ProductsImage from './components/ProductsImage/ProductsImage';
import { fetchProducts } from './components/../store/productsSlice';

import './App.scss';

export default function App() {
  const [showLoadingError, setShowLoadingError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowLoadingError(false);
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts());
      } catch {
        setShowLoadingError(true);
      }
    };
    loadProducts();
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
        {showLoadingError && (
          <div className="sb-network-error">
            <Alert
              severity="error"
            >
              You're offline
            </Alert>
          </div>
        )}
        <div data-testid="component-router">
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}
