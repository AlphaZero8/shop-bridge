import { screen, render } from '../test/testUtils';

import App from './App';

describe('<HomePage />', () => {
  beforeEach(() => {
      render(<App />);
  });

  it('renders `<Header />` component', () => {
      const headerComponent = screen.getByTestId('component-header');

      expect(headerComponent).toBeInTheDocument();
  });

  it('renders `<ProductsImage />` component', () => {
      const productsImageComponent = screen.getByTestId('component-products-image');

      expect(productsImageComponent).toBeInTheDocument();
  });

  it('renders `<Router />` component', () => {
      const routerComponent = screen.getByTestId('component-router');

      expect(routerComponent).toBeInTheDocument();
  });
});
