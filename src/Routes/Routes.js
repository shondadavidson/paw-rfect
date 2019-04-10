import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import Home from '../Components/Home/Home';
import Splash from '../Components/Splash/Splash';
import OwnerProfile from '../Components/OwnerProfile/OwnerProfile';
import AddDog from '../Components/AddDog/AddDog';
import ProviderProfile from '../Components/ProviderProfile/ProviderProfile';

export default (
    <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/ownerprofile' component={OwnerProfile} />
        <Route exact path='/adddog' component={AddDog} />
        <Route exact path='/providerprofile' component={ProviderProfile} />

    </Switch>
)