import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Switch>
                <Route path='/' exact component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
