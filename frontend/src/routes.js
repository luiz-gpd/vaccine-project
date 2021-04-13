import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Agendamento from './pages/Agendamento';
import Lista from './pages/Lista';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Switch>
                <Route path='/' exact component={Agendamento}/>
                <Route path='/list' exact component={Lista}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
