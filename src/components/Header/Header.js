import { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { APP_HEADING } from '../../constants/appConstants';
import { TEXT_ADD_PRODUCT, TEXT_VIEW_PRODUCTS } from '../../constants/productConstants';
import { sbTheme } from '../../constants/scss/theme';
import './Header.scss';

const useStyles = makeStyles(() => ({
    appBar: {
        zIndex: sbTheme.zIndex.appBar,
    },
    drawer: {
        zIndex: sbTheme.zIndex.drawer,
    },
    regular: {
        [sbTheme.breakpoints.down('xs')]: {
            minHeight: '40px',
        },
        [sbTheme.breakpoints.between('xs', 'sm')]: {
            minHeight: '48px',
        },
    },
}));

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const classes = useStyles();

    const toggleDrawer = (newDrawerState) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(newDrawerState);
    };

    const getListItemWithLink = (itemText, link) => (
        <Link
            className="sb-link"
            to={link}
            onClick={toggleDrawer(false)}
            data-testid="drawer-option"
        >
            <ListItem button key={itemText}>
                <ListItemText primary={itemText} />
            </ListItem>
        </Link>
    );

    const list = (
        <List className="sb-drawer">
            {getListItemWithLink(TEXT_ADD_PRODUCT, '/new-product')}
            {getListItemWithLink(TEXT_VIEW_PRODUCTS, '/products')}
        </List>
    );

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar className={`${classes.regular} sb-header-container`}>
                    <div data-testid="icon-hamburger" className="sb-hamburger-icon-container">
                        <MenuIcon
                            className="sb-hamburger-icon"
                            onClick={toggleDrawer(true)}
                        />
                    </div>
                    <Link to="/home" className="sb-link">
                        <Typography className="sb-heading" variant="h4">
                            {APP_HEADING}
                        </Typography>
                    </Link>
                    <span className="sb-action-button-group">
                        <Link to="/new-product" className="sb-link">
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                {TEXT_ADD_PRODUCT}
                            </Button>
                        </Link>
                        <Link to="/products" className="sb-link">
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                {TEXT_VIEW_PRODUCTS}
                            </Button>
                        </Link>
                    </span>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                anchor="top"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {list}
            </Drawer>
        </div>
    );
};

export default Header;