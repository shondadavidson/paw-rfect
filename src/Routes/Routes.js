import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import Home from '../Components/Home/Home'

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/home' component={Home} />
    </Switch>
)