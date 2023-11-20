import { cleanup, render, screen } from '../../../test/testUtils';
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
    beforeEach(() => {
        jest.useFakeTimers();
        render(<EditProduct />);
    });

    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('render', () => {
        it('shows correct name field', async () => {
            const nameField = await screen.findByDisplayValue(/p1/i);

            expect(nameField).toBeInTheDocument();
        });
    });
});