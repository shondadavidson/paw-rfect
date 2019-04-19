import React, { Component } from 'react';
import './App.css';
import routes from './Routes/Routes'
import { withRouter } from 'react-router-dom'
import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'
import BackButton from './Components/BackButton/BackButton'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
        <Header />
          <div className='col-12'>
            
            <BackButton location={this.props.location} />
            <Menu location={this.props.location} />
            <div className='routes'>{routes}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
