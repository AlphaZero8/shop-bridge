import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test/testUtils';

import Header from './Header';

describe('<Header />', () => {
    beforeEach(() => {
        render(<Header />);
    });

    describe('app heading', () => {
        it('displays app heading', () => {
            const appHeading = screen.getByText(/shop bridge/i);

            expect(appHeading).toBeVisible();
        });
    });

    describe('add product button', () => {
        it('displays the button', () => {
            const addProductButton = screen.getByText(/add product/i);

            expect(addProductButton).toBeVisible();
        });
    });

    describe('view products button', () => {
        it('displays the button', () => {
            const viewProductsButton = screen.getByText(/view products/i);

            expect(viewProductsButton).toBeVisible();
        });
    });

    describe('hamburger icon', () => {
        let hamburgerIcon;

        beforeEach(() => {
            window.innerWidth = 600;
            hamburgerIcon = screen.getByTestId(/icon-hamburger/i);
        });

        it('displays the icon when page is viewed through mobile', () => {
            expect(hamburgerIcon).toBeVisible();
        });

        describe('hamburger icon is clicked', () => {
            it('shows option to add a product', () => {
                userEvent.click(hamburgerIcon);
                const addProductOption = screen.getByText(/add product/i);

                expect(addProductOption).toBeVisible();
            });

            it('shows option to view products', () => {
                userEvent.click(hamburgerIcon);
                const viewProductsOption = screen.getByText(/view products/i);

                expect(viewProductsOption).toBeVisible();
            });

            it('hides the drawer when hamburger icon is clicked again', () => {
                userEvent.click(hamburgerIcon);
                userEvent.click(hamburgerIcon);
                const options = screen.queryAllByTestId(/drawer-option/i);

                expect(options).toEqual([]);
            });
        });
    });
});
