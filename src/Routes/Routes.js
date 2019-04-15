import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import Home from '../Components/Home/Home';
import Splash from '../Components/Splash/Splash';
import OwnerProfile from '../Components/OwnerProfile/OwnerProfile';
import AddDog from '../Components/AddDog/AddDog';
import ProviderProfile from '../Components/ProviderProfile/ProviderProfile';
import ServiceProviderList from '../Components/ServiceProviderList/ServiceProviderList';
import DetailedServiceProvider from '../Components/ServiceProviderList/DetailedServiceProvider';
import ClientList from '../Components/ClientList/ClientList';
import SearchForProvider from '../Components/SearchForProvider/SearchForProvider';
import Faq from '../Components/Faq/Faq';
import Contact from '../Components/Contact/Contact';
import ImageUpload from '../Components/ImageUpload/ImageUpload'
import Chat from '../Components/Chat/Chat'
import PendingClientList from '../Components/ClientList/PendingClientList'


export default (
    <Switch>
        <Route exact path='/' component={Splash} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/home' component={Home} />
        <Route path='/ownerprofile' component={OwnerProfile} />
        <Route path='/adddog' component={AddDog} />
        <Route path='/providerprofile' component={ProviderProfile} />
        <Route path='/serviceProviders' component={ServiceProviderList} />
        <Route path='/detailedProvider/:provider_id' component={DetailedServiceProvider} />
        <Route path='/clientlist' component={ClientList} />
        <Route path='/pendingclients' component={PendingClientList} />
        <Route path='/searchProviders' component={SearchForProvider} />
        <Route path='/faq' component={Faq} />
        <Route path='/contact' component={Contact} />
        <Route path='/imageupload' component={ImageUpload} />
        <Route path='/chat/:userId/:providerId' component={Chat} />
    </Switch>
)