import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from '../../../test/testUtils';
import { rest } from 'msw';

import { server } from '../../mocks/server';
import EditProduct from './EditProduct';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'unique #1',
    }),
}));

describe('<EditProduct />', () => {
    describe('render', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            render(<EditProduct />);
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('shows the title as Edit <product_name>', async () => {
            const title = await screen.findByText(/edit p1/i);

            expect(title).toBeInTheDocument();
        });

        it('shows correct name field', async () => {
            const nameField = await screen.findByDisplayValue(/p1/i);

            expect(nameField).toBeInTheDocument();
        });

        it('shows correct manufacturer field', async () => {
            const manufacturerField = await screen.findByDisplayValue(/m1/i);

            expect(manufacturerField).toBeInTheDocument();
        });

        it('shows correct price field', async () => {
            const priceField = await screen.findByDisplayValue(/100/i);

            expect(priceField).toBeInTheDocument();
        });

        it('shows correct description field', async () => {
            const descriptionField = await screen.findByDisplayValue(/d1/i);

            expect(descriptionField).toBeInTheDocument();
        });
    });

    describe('updating and submitting the fields', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            render(<EditProduct />);
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
            cleanup();
        });

        it('shows error if no update\'s being made', async () => {
            // console.log('TEST1 start');
            await waitFor(() => {
                screen.getByDisplayValue(/p1/i);
            });
            const updateBtn = screen.getByRole('button', { name: 'Update' });

            userEvent.click(updateBtn);

            const errorMessage = await screen.findByText(/product data hasn't changed/i);

            expect(errorMessage).toBeInTheDocument();

            await waitFor(() => {
                expect(errorMessage).not.toBeInTheDocument();
            });
            // console.log('TEST1 end');
        });

        it('shows success if product is updated successfully', async () => {
            // console.log('TEST2 start');
            await waitFor(() => {
                screen.getByDisplayValue(/p1/i);
            });

            const nameField = screen.getByLabelText(/name/i);
            userEvent.clear(nameField);
            userEvent.type(nameField, 'p3');

            const updateBtn = screen.getByRole('button', { name: 'Update' });
            userEvent.click(updateBtn);

            const successMessage = await screen.findByText(/product edited successfully/i);

            expect(successMessage).toBeInTheDocument();

            await waitFor(() => {
                expect(successMessage).not.toBeInTheDocument();
            });
            // console.log('TEST2 end');
        });

        it('shows error if the product is updated to an already existing product', async () => {
            await waitFor(() => {
                screen.getByDisplayValue(/p1/i);
            });

            const nameField = screen.getByLabelText(/name/i);
            userEvent.clear(nameField);
            userEvent.type(nameField, 'p2');

            const manufacturerField = screen.getByLabelText(/manufacturer/i);
            userEvent.clear(manufacturerField);
            userEvent.type(manufacturerField, 'm2');

            const updateBtn = screen.getByRole('button', { name: 'Update' });
            let errorMessage;

            userEvent.click(updateBtn);
            errorMessage = await screen.findByText(/cannot edit to a duplicate product/i);

            expect(errorMessage).toBeInTheDocument();

            await waitFor(() => {
                expect(errorMessage).not.toBeInTheDocument();
            });
        });

        it.skip('shows error if there is api failure', async () => {
            // const preloadedState = {
            //     products: {
            //         products: [{
            //             id: 'unique #1',
            //             name: 'p1',
            //             manufacturer: 'm1',
            //             price: 100,
            //             description: 'd1',
            //         }],
            //     },
            // };
            // render(<EditProduct />, { preloadedState });
            server.use(
                rest.post('http://localhost:5000/products', (req, res, ctx) => {
                    throw new Error('Something went wrong while processing the request');
                    // return Promise.reject({
                    //         message: 'Something went wrong while processing the request',
                    // })
                    // res.once(
                    //     ctx.status(404),
                    //     ctx.json({
                    //         message: 'Something went wrong while processing the request',
                    //     })
                    // );
                })
            );

            await waitFor(() => {
                screen.getByDisplayValue(/p1/i);
            });

            const nameField = screen.getByLabelText(/name/i);
            userEvent.clear(nameField);
            userEvent.type(nameField, 'p3');

            const updateBtn = screen.getByRole('button', { name: 'Update' });
            userEvent.click(updateBtn);

            const errorMessage = await screen.findByText(/something went wrong while processing the request/i);

            expect(errorMessage).toBeInTheDocument();

            await waitFor(() => {
                expect(errorMessage).not.toBeInTheDocument();
            });
        });
    });

    // @TODO
    // test backdrop when page is refreshed
});