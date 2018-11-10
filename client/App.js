import React, { Component } from "react";
import PropTypes from 'prop-types';
import { BrowserRouter, Route} from 'react-router-dom';
import Main from './modules/App/App';

import routes from './routes';

export default function App(props) {
    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )
}