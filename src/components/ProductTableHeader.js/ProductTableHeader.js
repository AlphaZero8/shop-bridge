import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
    PRODUCT_TABLE_TITLE,
    TEXT_ADD_PRODUCT,
} from '../../constants/productConstants';
import './ProductTableHeader.scss';

const ProductTableHeader = () => {
    return (
        <div className="sb-table-header">
                <Typography className="sb-heading" variant="h5">
                    {PRODUCT_TABLE_TITLE}
                </Typography>
                <Link to="/new-product" className="sb-link">
                    <Button variant="contained" color="primary">{TEXT_ADD_PRODUCT}</Button>
                </Link>
            </div>
    );
};

ProductTableHeader.propTypes = {
};

export default ProductTableHeader;