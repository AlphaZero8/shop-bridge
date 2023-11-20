import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { sbTheme } from '../../constants/scss/theme';

import { TEXT_UPDATE } from "../../constants/productConstants";
import { editProduct, fetchProducts } from "../../store/productsSlice";
import ProductForm from "../ProductForm/ProductForm";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
    backDrop: {
        zIndex: sbTheme.zIndex.backDrop,
    },
}));

const EditProduct = () => {
    const [matchingProduct, setMatchingProduct] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const classes = useStyles();

    const dispatch = useDispatch();
    const { productId } = useParams();
    console.log(productId);
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);
    const mountedRef = useRef();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                await dispatch(fetchProducts());
            } catch (err) {
                const { apiError } = err;
                console.log(apiError);

                setSnackbarMessage(apiError);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        };
        loadProducts();
    }, [dispatch]);

    useEffect(() => {
        const match = products.find(product => product.id === productId);
        setMatchingProduct(match);
    }, [products, productId]);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        }
    }, []);

    useEffect(() => {
        if (loading === 'pending') {
            setBackdropOpen(true);
        }
        if (loading === 'idle') {
            setBackdropOpen(false);
        }
    }, [loading]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        console.log(values);
        const matchingProductCopy = { ...matchingProduct };
        delete matchingProductCopy.id;
        const hasChanged = JSON.stringify(matchingProductCopy) !== JSON.stringify(values);

        if (hasChanged) {
                try {
                    await dispatch(editProduct(matchingProduct.id, values));

                    setSnackbarMessage('Product edited successfully! :)');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                } catch (err) {
                    console.log(err);
                    const { duplicateProductError, apiError } = err;
    
                    if (duplicateProductError) {
                        setErrors(duplicateProductError);
                        setSnackbarMessage('Cannot edit to a duplicate product :(')
                    } else {
                        setSnackbarMessage(apiError);
                    }
    
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                } finally {
                    if (mountedRef.current) {
                        setSubmitting(false);
                    }
                }
        } else {
            setSnackbarMessage('Product data hasn\'t changed :(');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);

            if (mountedRef.current) {
                setSubmitting(false);
            }
        }
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    name: matchingProduct?.name || '',
                    manufacturer: matchingProduct?.manufacturer || '',
                    price: matchingProduct?.price || '',
                    description: matchingProduct?.description || '',
                }}
                onSubmit={(values, formikBag) => {
                    handleSubmit(values, formikBag);
                }}
            >
                {props => <ProductForm {...props} submitBtnText={TEXT_UPDATE} />}
            </Formik>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backDrop} open={backdropOpen}>
                <CircularProgress />
            </Backdrop>
        </>
    );
};

export default EditProduct;