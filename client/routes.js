import React from 'react';
import { Route, Switch, IndexRoute} from 'react-router';
import Main from './modules/App/App';
import Auth from './modules/Auth/Auth';
import Dashboard from './modules/Dashboard/Dashboard';
import Project from './modules/Project/Project';

export default (
    <div>
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/project/:projectId' component={Project}/>
        </Switch>
    </div>
);