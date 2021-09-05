import { render, screen } from '../../../test/testUtils';
import EditProduct from './EditProduct';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'unique #1',
    }),
}));

// jest.mock('../../store/productsSlice', () => ({
//     ...(jest.requireActual('../../store/productsSlice')),
//     fetchProducts: () => ({ type: 'fetch_products' }),
//     editProduct: () => ({ type: 'edit_product' }),
// }));

describe('<EditProduct />', () => {
    describe('render', () => {
        const products = [
            {
                id: 'unique #1',
                name: 'p1',
                manufacturer: 'm1',
                price: 100,
                description: 'd1',
            },
            {
                id: 'unique #2',
                name: 'p2',
                manufacturer: 'm2',
                price: 200,
                description: 'd2',
            },
        ];

        const preloadedState = {
            products: { products },
        };

        beforeEach(() => {
            jest.useFakeTimers();
            render(<EditProduct />, { preloadedState });
        });
    
        afterAll(() => {
            jest.useRealTimers();
        });
    
        it('shows the title as Edit <product_name>', () => {
            
        });

        it('shows correct name field', async () => {
            const nameField = await screen.findByDisplayValue(/p1/i);

            expect(nameField).toBeInTheDocument();
        });

        // @TODO
        it('shows correct manufacturer field', () => {});

        // @TODO
        it('shows correct price field', () => {});

        // @TODO
        it('shows correct description field', () => {});
    });

    describe('updating and submitting the fields', () => {
        // @TODO
        it('shows error if no update\'s being made', () => {});

        // @TODO
        it('shows success if product is updated successfully', () => {});

        // @TODO
        it('shows error if the product is updated to an already existing product', () => {});

        // @TODO
        it('shows error if there is api failure', () => {});
    });

    // @TODO
    // test backdrop when page is refreshed
});