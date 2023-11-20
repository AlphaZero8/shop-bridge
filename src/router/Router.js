import { Redirect, Route, Switch } from 'react-router-dom';

import PaginatedTable from '../components/PaginatedTable/PaginatedTable';
import ShopBridgeSummary from '../components/ShopBridgeSummary/ShopBridgeSummary';
import AddProduct from '../components/AddProduct/AddProduct';
import EditProduct from '../components/EditProduct/EditProduct';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={() => <Redirect to="/home" />} />
            <Route path="/home" component={ShopBridgeSummary} />
            <Route path="/new-product" component={AddProduct} />
            <Route exact path="/products" component={PaginatedTable} />
            <Route path="/products/:productId" component={EditProduct} />
        </Switch>
    );
};

export default Router;