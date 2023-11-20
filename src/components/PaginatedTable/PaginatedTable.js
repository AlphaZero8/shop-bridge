import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import LoadingTable from '../LoadingTable/LoadingTable';
import Toast from '../Toast/Toast';
import { PRODUCT_TABLE_HEADER_DATA } from '../../constants/productConstants';
import ProductTableHeader from '../ProductTableHeader.js/ProductTableHeader';
import { deleteProduct } from '../../store/productsSlice';
import {
    updateActivePageNumber,
    updateRowsPerPage
} from '../../store/pagesSlice';
import './PaginatedTable.scss';

const PaginatedTable = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteToastOpen, setDeleteToastOpen] = useState(false);
    const [deleteToastMessage, setDeleteToastMessage] = useState('');
    const [deleteToastSeverity, setDeleteToastSeverity] = useState('');
    const [loadingErrorToast, setLoadingErrorToast] = useState(false);
    const [productBeingDeleted, setProductBeingDeleted] = useState(null);

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products) || [];
    const loading = useSelector(state => state.products.loading);
    const loadingError = useSelector(state => state.products.loadingError);
    const activePage = useSelector(state => state.pages.activePageNumber);
    const rowsPerPage = useSelector(state => state.pages.rowsPerPage);

    const updatePageNumber = () => {
        if ((products.length - 1) % rowsPerPage !== 0) {
            return;
        }

        const newPageNumber = Math.max(activePage - 1, 0);
        dispatch(updateActivePageNumber(newPageNumber));
    };

    useEffect(() => {
        if (loading === 'idle' && loadingError) {
            setLoadingErrorToast(true);
        } else {
            setLoadingErrorToast(false);
        }
    }, [loading, loadingError]);

    const handleChangePage = (event, newPage) => {
        dispatch(updateActivePageNumber(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(updateRowsPerPage(+event.target.value));
        dispatch(updateActivePageNumber(0));
    };

    const handleDialogOpen = (e, product) => {
        setProductBeingDeleted(product);
        setDeleteDialogOpen(true);
    };

    const handleDialogClose = () => {
        setProductBeingDeleted(null);
        setDeleteDialogOpen(false);
    };

    const handleDeleteClick = async () => {
        setDeleteDialogOpen(false);
        try {
            await dispatch(deleteProduct(productBeingDeleted.id));

            updatePageNumber();

            setDeleteToastMessage('Product deleted successfully! :)');
            setDeleteToastSeverity('success');
            setDeleteToastOpen(true);
        } catch (err) {
            const { apiError } = err;

            setDeleteToastMessage(apiError);
            setDeleteToastSeverity('error');
            setDeleteToastOpen(true);
        } finally {
            setProductBeingDeleted(null);
        }
    };

    const handleSnackbarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDeleteToastOpen(false);
    }

    const handleErrorToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setLoadingErrorToast(false);
    };

    let content;

    if (loading === 'pending') {
        content = <LoadingTable rowCount={rowsPerPage} />;
    } else if (loading === 'idle') {
        content = loadingError ? (
            <Toast
                open={loadingErrorToast}
                onClose={handleErrorToastClose}
                severity="error"
                variant="filled"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setLoadingErrorToast(false)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                message={loadingError.apiError}
            />
        ) : (
            <>
                <TableContainer className="sb-table-container">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {PRODUCT_TABLE_HEADER_DATA.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        colSpan={column.colSpan}
                                        align="center"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length ? (
                                products.slice(activePage * rowsPerPage, activePage * rowsPerPage + rowsPerPage).map((product, index) => (
                                    <TableRow hover key={product.id}>
                                        {PRODUCT_TABLE_HEADER_DATA.map((column) => {
                                            const value = (column.id === 'sr-no') ? (activePage * rowsPerPage) + index + 1 : product[column.id];
                                            return (
                                                column.id === 'actions' ? (
                                                    <Fragment key={column.id}>
                                                        <TableCell width={column.width} align="center">
                                                            <Link
                                                                to={`/products/${product.id}`}
                                                                className="sb-link"
                                                            >
                                                                <EditIcon className="sb-icon" />
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell width={column.width} align="center">
                                                            <DeleteIcon
                                                                className="sb-icon sb-icon-negative"
                                                                onClick={(e) => handleDialogOpen(e, product)}
                                                            />
                                                        </TableCell>
                                                    </Fragment>
                                                ) : (
                                                    <TableCell key={column.id} width={column.width} align="center">
                                                        {value}
                                                    </TableCell>
                                                )
                                            );
                                        })}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Alert severity="info">No products available</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={products.length}
                        rowsPerPage={rowsPerPage}
                        page={activePage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This would delete the product <b>{productBeingDeleted?.name}</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClick} color="secondary">
                            Delete
                        </Button>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Toast
                    open={deleteToastOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    severity={deleteToastSeverity}
                    variant="filled"
                    message={deleteToastMessage}
                />
            </>
        )
    }

    return (
        <div className="sb-paginated-table-container">
            <ProductTableHeader />
            {content}
        </div>
    );
};

export default PaginatedTable;
