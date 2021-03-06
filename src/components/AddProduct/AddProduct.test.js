import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "../../../test/testUtils";

import AddProduct from "./AddProduct";

jest.mock('../../store/productsSlice', () => ({
    addProduct: () => ({ type: 'add_product' }),
}));

describe('<AddProduct />', () => {
    beforeEach(() => {
        render(<AddProduct />);
    });

    describe('render', () => {
        it('shows the page title - Add a new product', () => {
            const pageTittle = screen.getByText(/add a new product/i);

            expect(pageTittle).toBeInTheDocument();
        });

        it('shows the form', () => {
            const form = screen.getByTestId('form-add-product');

            expect(form).toBeInTheDocument();
        });
    });

    describe('form input', () => {
        const touchAndSkip = (field) => {
            fireEvent.focus(field);
            fireEvent.blur(field);
        };

        it('shows error when name field is touched and skipped', async () => {
            const nameField = screen.getByLabelText(/name/i);
            touchAndSkip(nameField);

            const nameFieldError = await screen.findByText(/name is required/i);

            expect(nameFieldError).toBeInTheDocument();
        });

        it('shows error when manufacturer field is touched and skipped', async () => {
            const manufacturerField = screen.getByLabelText(/manufacturer/i);
            touchAndSkip(manufacturerField);

            const manufacturerFieldError = await screen.findByText(/manufacturer is required/i);

            expect(manufacturerFieldError).toBeInTheDocument();
        });

        it('shows error when price field is touched and skipped', async () => {
            const priceField = screen.getByLabelText(/price/i);
            touchAndSkip(priceField);

            const priceFieldError = await screen.findByText(/price is required/i);

            expect(priceFieldError).toBeInTheDocument();
        });

        it('shows error when description field is touched and skipped', async () => {
            const descriptionField = screen.getByLabelText(/description/i);
            touchAndSkip(descriptionField);

            const descriptionFieldError = await screen.findByText(/description is required/i);

            expect(descriptionFieldError).toBeInTheDocument();
        });

        it('shows error for negative values in price field', async () => {
            const priceField = screen.getByLabelText(/price/i);
            userEvent.type(priceField, '-1');
            fireEvent.blur(priceField);

            const negativeValueError = await screen.findByText(/price should be a positive number/i);

            expect(negativeValueError).toBeInTheDocument();
        });
    });

    describe('form submission', () => {
        const getAllFields = () => ({
            nameField: screen.getByLabelText(/name/i),
            manufacturerField: screen.getByLabelText(/manufacturer/i),
            priceField: screen.getByLabelText(/price/i),
            descriptionField: screen.getByLabelText(/description/i),
            addBtn: screen.getByText('Add'),
            cancelBtn: screen.getByText(/cancel/i),
        });

        const fillAndSubmitForm = () => {
            const {
                nameField,
                manufacturerField,
                priceField,
                descriptionField,
                addBtn,
            } = getAllFields();

            userEvent.type(nameField, 'name');
            userEvent.type(manufacturerField, 'manufacturer');
            userEvent.type(priceField, '1');
            userEvent.type(descriptionField, 'description');

            userEvent.click(addBtn);
        };

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('highlights requiredness when form is submitted with empty fields', async () => {
            const addBtn = screen.getByText('Add');
            userEvent.click(addBtn);

            const errors = await screen.findAllByText(/.+?(?=required)/i);

            expect(errors.length).toBe(4);
        });

        it('shows success message when form is correctly filled and submitted', async () => {
            fillAndSubmitForm();

            const successMessage = await screen.findByText(/product added successfully/i);
            expect(successMessage).toBeVisible();

            await waitFor(() => {
                expect(successMessage).not.toBeInTheDocument();
            });
        });
        
        it.skip('clicking add button clears the form', async () => {
            fillAndSubmitForm();
            
            const nameField = await screen.findByLabelText(/name/i);
            const manufacturerField = await screen.findByLabelText(/manufacturer/i);
            const priceField = await screen.findByLabelText(/price/i);
            const descriptionField = await screen.findByLabelText(/description/i);
            
            [nameField, manufacturerField, priceField, descriptionField]
            .forEach((field) => {
                expect(field.textContent).toBe('');
            });

            // waitForElementToBeRemoved(() => screen.findByText(/product added successfully/i));
        });

        it('disables all form fields and buttons while submission', async () => { });

        it('Shows circular spinner in submit button while submission', () => { });
    });

    describe.skip('during form submission', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        const getAllFields = () => ({
            nameField: screen.getByLabelText(/name/i),
            manufacturerField: screen.getByLabelText(/manufacturer/i),
            priceField: screen.getByLabelText(/price/i),
            descriptionField: screen.getByLabelText(/description/i),
            addBtn: screen.getByText('Add'),
            cancelBtn: screen.getByText(/cancel/i),
        });

        const fillAndSubmitForm = () => {
            const {
                nameField,
                manufacturerField,
                priceField,
                descriptionField,
                addBtn,
            } = getAllFields();

            userEvent.type(nameField, 'name');
            userEvent.type(manufacturerField, 'manufacturer');
            userEvent.type(priceField, '1');
            userEvent.type(descriptionField, 'description');

            userEvent.click(addBtn);
        };

        it('disables name field', () => {
            fillAndSubmitForm();

            const nameField = screen.getByLabelText('name');
            expect(nameField).toBeDisabled();

            waitFor(() => {
                expect(screen.getByLabelText('name')).toHaveTextContent('');
            });
        });

        it('disables manufacturer field', () => {
            fillAndSubmitForm();

            const manufacturerField = screen.getByLabelText('manufacturer');
            expect(manufacturerField).toBeDisabled();

            waitFor(() => {
                screen.getByLabelText('manufacturer').textContent = '';
            });
        });

        it('disables price field', () => {
            fillAndSubmitForm();

            const priceField = screen.getByLabelText('price');
            expect(priceField).toBeDisabled();

            waitFor(() => {
                screen.getByLabelText('price').textContent = '';
            });
        });

        it('disables description field', () => {
            fillAndSubmitForm();

            const descriptionField = screen.getByLabelText('description');
            expect(descriptionField).toBeDisabled();

            waitFor(() => {
                screen.getByLabelText('description').textContent = '';
            });
        });

        it.skip('disables Add button', async () => {
            fillAndSubmitForm();

            // await waitFor(() => {
            //     expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();
            // });

            const addBtn = screen.getByText('Add');
            expect(addBtn).toBeDisabled();

            waitForElementToBeRemoved(() => {
                screen.getByRole(/progressbar/i);
            });
            // waitForElementToBeRemoved(() => {
            //     screen.getByText(/product added successfully/i);
            // });
            // waitFor(() => {
            //     screen.getByLabelText('description').textContent = '';
            //         // screen.getByText(/product added successfully/i);
            // });
        });

        it.skip('disables Cancel button', () => {
            fillAndSubmitForm();

            const cancelBtn = screen.getByText('Cancel');
            expect(cancelBtn).toBeDisabled();

            waitFor(() => {
                screen.getByText(/product added successfully/i);
            });
        });
    });
});