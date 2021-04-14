import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Agendamento from './pages/Agendamento';
import Home from './pages/Home';
import Lista from './pages/Lista';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Switch>
                <Route className="homePage" path='/' exact component={Home}/>
                <Route path='/user' exact component={Agendamento}/>
                <Route path='/list' exact component={Lista}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
