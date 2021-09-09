import userEvent from '@testing-library/user-event';
import { screen, render, within } from '../test/testUtils';

import App from './App';

describe('<HomePage />', () => {
    describe('render', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            render(<App />);
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
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
    describe.only('routing', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            render(<App />);
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('lands on the summary page', () => {
            const summary = screen.getByText(/welcome to shop bridge/i);

            expect(summary).toBeInTheDocument();
        });

        it('takes user to the summary page if logo is clicked from any other page', () => {
            // navigate to add product page
            const addProductBtn = screen.getByRole('button', { name: /add product/i });
            userEvent.click(addProductBtn);

            // click the logo at top-left
            const logo = screen.getByText(/shop bridge/i);
            userEvent.click(logo);

            const summary = screen.getByText(/welcome to shop bridge/i);

            expect(summary).toBeInTheDocument();
        });

        describe('View Products button is clicked', () => {
            beforeEach(() => {
                const viewProductsBtn = screen.getByRole('button', { name: /view products/i });
                userEvent.click(viewProductsBtn);
            });

            // afterAll(() => {
            //     const logo = screen.getByText(/shop bridge/i);
            //     userEvent.click(logo);
            // });

            it('shows the table', () => {
                const table = screen.getByTestId('component-paginated-table');

                expect(table).toBeInTheDocument();
            });

            describe('Add Product button is clicked', () => {
                beforeEach(() => {
                    const table = screen.getByTestId('component-paginated-table');
                    // screen.debug(table);
                    const addProductBtn = within(table).getByRole('button', { name: /add product/i });
                    userEvent.click(addProductBtn);
                });

                it.skip('navigates to form to add a new product', () => {
                    const addProductForm = screen.findAllByTestId('form-add-product');

                    expect(addProductForm).toBeInTheDocument();
                });

                it('clicking Cancel takes back to the previous page', () => { });
            });

            describe('Edit icon is clicked for a particular record', () => {
                it('shows the edit product form', () => { });

                it('takes the user to the previous page if Cancel button is clicked', () => { });
            });
        });

        it('shows form to add a new product when Add Product button is clicked', () => { });
    });

    // @TODO
    describe('integration tests', () => {
        describe('server is running', () => {
            it('shows the table', () => { });

            it('shows the newly added product in the table', () => { });

            it('shows the updated value against a successfully updated product', () => { });

            it('removes the deleted product from the table', () => { });
        });

        describe('server is down', () => {
            it('shows the error instead of table', () => { });

            it('shows the error when product is trying to be added', () => { });

            it('shows the error when product is trying to be updated', () => { });

            it('shows the error when product is trying to be deleted', () => { });
        });
    });
});
