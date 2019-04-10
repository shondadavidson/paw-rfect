import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import Home from '../Components/Home/Home'
import ServiceProviderList from '../Components/ServiceProviderList/ServiceProviderList'
import DetailedServiceProvider from '../Components/ServiceProviderList/DetailedServiceProvider'
import ClientList from '../Components/ClientList/ClientList';
import SearchForProvider from '../Components/SearchForProvider/SearchForProvider';
import Splash from '../Components/Splash/Splash'


export default (
    <Switch>
        <Route exact path='/' component={Splash} />
        <Route  path='/dashboard' component={Dashboard} />
        <Route path='/home' component={Home} />
        <Route path='/serviceProviders' component={ServiceProviderList} />
        <Route path='/detailedProvider/:provider_id' component={DetailedServiceProvider} />
        <Route path='/clientlist' component={ClientList} />
        <Route path='/searchProviders' component={SearchForProvider} />
    </Switch>
)