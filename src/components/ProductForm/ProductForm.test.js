import { Formik } from "formik";
import { render, screen } from "../../../test/testUtils";

import ProductForm from "./ProductForm";

describe('render', () => {
    const props = {
        values: {},
        errors: {},
        touched: {},
        isSubmitting: false,
    };

    beforeEach(() => {
        render(
            <Formik>
                <ProductForm {...props} />
            </Formik>
        );
    });

    it('displays the product name field', () => {
        const nameField = screen.getByLabelText(/name/i);

        expect(nameField).toBeInTheDocument();
    });

    it('displays the product manufacturer field', () => {
        const manufacturerField = screen.getByLabelText(/manufacturer/i);

        expect(manufacturerField).toBeInTheDocument();
    });

    it('displays the product price field', () => {
        const priceField = screen.getByLabelText(/price/i);

        expect(priceField).toBeInTheDocument();
    });

    it('displays the product description field', () => {
        const descriptionField = screen.getByLabelText(/description/i);

        expect(descriptionField).toBeInTheDocument();
    });

    it('displays the Submit button', () => {
        const submitBtn = screen.getByText(/submit/i);

        expect(submitBtn).toBeInTheDocument();
    });
    
    it('displays the Cancel button', () => {
        const cancelBtn = screen.getByText(/cancel/i);

        expect(cancelBtn).toBeInTheDocument();
    });
});