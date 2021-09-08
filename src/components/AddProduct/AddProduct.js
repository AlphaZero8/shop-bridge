import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import * as yup from 'yup';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";

import { addProduct } from "../../store/productsSlice";
import ProductForm from "../ProductForm/ProductForm";
import { TEXT_ADD } from "../../constants/productConstants";
import { useEffect, useRef, useState } from 'react';

import './AddProduct.scss';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AddProduct = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const dispatch = useDispatch();
    const mountedRef = useRef();

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    const handleSubmit = async (inputData, { resetForm, setErrors, setSubmitting }) => {
        setSubmitting(true);
        try {
            await dispatch(addProduct(inputData));
            setSnackbarMessage('Product added successfully! :)');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            if (mountedRef.current) {
                resetForm();
                setSubmitting(false);
            }
        } catch (err) {
            const { duplicateProductError, apiError } = err;

            if (duplicateProductError) {
                setErrors(duplicateProductError);
                setSnackbarMessage('Cannot add duplicate product :(');
            } else {
                setSnackbarMessage(apiError);
            }

            setSnackbarSeverity('error');
            setSnackbarOpen(true);

            if (mountedRef.current) {
                setSubmitting(false);
            }
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        manufacturer: yup.string().required('Manufacturer is required!'),
        price: yup.number()
            .required('Price is required!')
            .positive('Price should be a positive number!'),
        description: yup.string().required('Description is required'),
    });

    return (
        <>
        <Typography variant="h5" className="sb-sub-heading">
            Add a new product
        </Typography>
        <div data-testid="form-add-product">
            <Formik
                initialValues={{
                    name: '',
                    manufacturer: '',
                    price: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
            >
                {props => (
                    <ProductForm {...props} submitBtnText={TEXT_ADD} />
                )}
            </Formik>
        </div>
            <Snackbar
                key={snackbarMessage}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddProduct;