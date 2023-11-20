import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Toast = ({
    open = false,
    autoHideDuration = null,
    onClose,
    severity,
    variant = 'standard',
    action,
    message,
}) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
            <Alert severity={severity} variant={variant} onClose={onClose} action={action}>
                {message}
            </Alert>
        </Snackbar>
    );
};

Toast.propTypes = {
    open: PropTypes.bool,
    autoHideDuration: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    severity: PropTypes.oneOf(['success', 'info', 'warning', 'error', '']).isRequired,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard', '']),
    action: PropTypes.element,
    message: PropTypes.string.isRequired,
};

export default Toast;