import { render, screen } from '../../../test/testUtils';

import ProductTableHeader from './ProductTableHeader';

describe('<ProductTableHeader />', () => {
    describe('render', () => {
        beforeEach(() => {
            render(<ProductTableHeader />);
        });

        it('displays table title', () => {
            const tableTitle = screen.getByText(/products/i);

            expect(tableTitle).toBeInTheDocument();
        });

        it('displays add product button', () => {
            const addProductBtn = screen.getByRole('button', { name: /add product/i });

            expect(addProductBtn).toBeInTheDocument();
        })
    });
});