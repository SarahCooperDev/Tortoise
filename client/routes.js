import React from 'react';
import { Route, Switch, IndexRoute} from 'react-router';
import Main from './modules/App/App';
import Auth from './modules/Auth/Auth';

export default (
    <div>
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/auth' component={Auth}/>
        </Switch>
    </div>
);