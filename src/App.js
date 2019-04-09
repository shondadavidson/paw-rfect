import React, { Component } from 'react';
import './App.css';
import ServiceProviderList from './Components/ServiceProviderList/ServiceProviderList'

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Welcome to paw-rfect</h1>
      <ServiceProviderList />
      </div>
    );
  }
}

export default App;
