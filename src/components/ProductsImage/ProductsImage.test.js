import { render, screen } from '../../../test/testUtils';

import ProductsImage from './ProductsImage';

describe('<ProductsImage />', () => {
    it('renders an image', () => {
        render(<ProductsImage />);
        const image = screen.getByAltText('electronic items');

        expect(image).toBeInTheDocument();
    });
});