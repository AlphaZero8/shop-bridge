import { screen, render } from '../test/testUtils';

import App from './App';

describe('<HomePage />', () => {
    describe('render', () => {
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

    // @TODO
    describe('routing', () => {
        it('lands on the summary page', () => {});

        it('takes user to the summary page if logo is clicked from any other page', () => {});

        describe('View Products button is clicked', () => {
            it('shows the table', () => {});

            describe('Add Product button is clicked', () => {
                it('navigates to form to add a new product', () => {});
    
                it('clicking Cancel takes back to the previous page', () => {});
            });

            describe('Edit icon is clicked for a particular record', () => {
                it('shows the edit product form', () => {});

                it('takes the user to the previous page if Cancel button is clicked', () => {});
            });
        });

        it('shows form to add a new product when Add Product button is clicked', () => {});
    });

    // @TODO
    describe('integration tests', () => {
        describe('server is running', () => {
            it('shows the table', () => {});

            it('shows the newly added product in the table', () => {});
    
            it('shows the updated value against a successfully updated product', () => {});
    
            it('removes the deleted product from the table', () => {});
        });

        describe('server is down', () => {
            it('shows the error instead of table', () => {});

            it('shows the error when product is trying to be added', () => {});
    
            it('shows the error when product is trying to be updated', () => {});
    
            it('shows the error when product is trying to be deleted', () => {});
        });
    });
});
