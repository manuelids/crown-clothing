import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';

import store from './redux/store';

ReactDOM.render(
    /* Everything will be under the Provider for Redux then Browser Router for the react router SPA  */
    <Provider store={store}> {/* Configuring the redux store */}
        <BrowserRouter> {/* Configuring the react-router for SPA */}
            <App/> {/* The APP to be rendered */}
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);