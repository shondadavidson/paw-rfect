import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import Home from '../Components/Home/Home'
import Splash from '../Components/Splash/Splash'
import ClientList from '../Components/ClientList/ClientList';

export default (
    <Switch>
        <Route exact path='/' component={Splash} />
        <Route path='/home' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/clientlist' component={ClientList} />
    </Switch>
)