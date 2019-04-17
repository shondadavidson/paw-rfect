import React, { Component } from 'react';
import './App.css';
import routes from './Routes/Routes'
import { withRouter } from 'react-router-dom'
import Menu from './Components/Menu/Menu'
import BackButton from './Components/BackButton/BackButton'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='col-11'>
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
