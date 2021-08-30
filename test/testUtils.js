import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import makeStore from '../src/store/index';

function render(
    ui,
    {
        preloadedState,
        store = makeStore(preloadedState),
        ...renderOptions
    } = {}
) {
    console.log(preloadedState);
    console.log(store.getState());
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };