import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

if(typeof require.ensure !== 'function'){
    require.ensure = function requireModule(deps, callback){
        callback(require);
    };
}

export default (
    <Route path="/" component={App}>
        <IndexRoute
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/App/App'))
                });
            }}
        />
        <Route
            path="/auth"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                cb(null, require('./modules/Authentication/Authentication').default);
                });
            }}
        />
    </Route>
);