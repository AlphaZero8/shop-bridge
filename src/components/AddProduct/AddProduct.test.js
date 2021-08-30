import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "../../../test/testUtils";

import AddProduct from "./AddProduct";

jest.mock('../../store/productsSlice', () => ({
    addProduct: () => ({ type: 'add_product' }),
}));

describe('<AddProduct />', () => {
    beforeEach(() => {
        render(<AddProduct />);
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
            addBtn: screen.getByText(/add/i),
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

        afterAll(() => {
            jest.useRealTimers();
        });

        it('highlights requiredness when form is submitted with empty fields', async () => {
            const addBtn = screen.getByText(/add/i);
            userEvent.click(addBtn);

            const errors = await screen.findAllByText(/.+?(?=required)/i);

            expect(errors.length).toBe(4);
        });

        it('shows success message when form is correctly filled and submitted', async () => {
            fillAndSubmitForm();

            const successMessage = await screen.findByText(/product added successfully/i);
            expect(successMessage).toBeVisible();
        });

        it('clicking add button clears the form', async () => {
            fillAndSubmitForm();

            const nameField = await screen.findByLabelText(/name/i);
            const manufacturerField = await screen.findByLabelText(/manufacturer/i);
            const priceField = await screen.findByLabelText(/price/i);
            const descriptionField = await screen.findByLabelText(/description/i);

            [nameField, manufacturerField, priceField, descriptionField]
                .forEach((field) => {
                    expect(field.textContent).toBe('');
                });
        });

        it('disables all form fields and buttons while submission', async () => { });

        it('Shows circular spinner in submit button while submission', () => { });
    });
});