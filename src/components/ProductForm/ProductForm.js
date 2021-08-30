import { useHistory } from "react-router-dom";
import { Form, Field } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TEXT_CANCEL, TEXT_SUBMIT } from '../../constants/productConstants';
import './ProductForm.scss';

const ProductForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    submitBtnText = TEXT_SUBMIT,
    cancelBtnText = TEXT_CANCEL,
}) => {
    const { goBack } = useHistory();
    return (
        <div>
            <Form className="sb-product-form">
                <Field
                    data-testid="form-field"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'name' }}
                    type="text"
                    value={values.name}
                    as={TextField}
                    className="sb-product-form-field"
                    name="name"
                    label="Name"
                    placeholder="Please enter the product name"
                    error={!!(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    disabled={isSubmitting}
                />
                <Field
                    data-testid="form-field"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'manufacturer' }}
                    type="text"
                    as={TextField}
                    className="sb-product-form-field"
                    name="manufacturer"
                    label="Manufacturer"
                    placeholder="Please enter the product manufacturer"
                    error={!!(touched.manufacturer && errors.manufacturer)}
                    helperText={touched.manufacturer && errors.manufacturer}
                    disabled={isSubmitting}
                />
                <Field
                    data-testid="form-field"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'price' }}
                    type="number"
                    as={TextField}
                    className="sb-product-form-field"
                    name="price"
                    label="Price"
                    placeholder="Please enter the product price"
                    error={!!(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                    disabled={isSubmitting}
                />
                <Field
                    data-testid="form-field"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    type="text"
                    as={TextField}
                    className="sb-product-form-field"
                    name="description"
                    label="Description"
                    placeholder="Please describe the product..."
                    error={!!(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    disabled={isSubmitting}
                />
                <div className="sb-form-button-group">
                    <div className="sb-submit-button-wrapper">
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {submitBtnText}
                        </Button>
                        {isSubmitting && <CircularProgress size={24} className="sb-button-progress" />}
                    </div>
                    <div>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => goBack()}
                            disabled={isSubmitting}
                        >
                            {cancelBtnText}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ProductForm;