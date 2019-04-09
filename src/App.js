import React, { Component } from 'react';
import './App.css';
import routes from './Routes/Routes'
import { withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className='routes'>{routes}</div>
      </div>
    );
  }
}

export default withRouter(App);
