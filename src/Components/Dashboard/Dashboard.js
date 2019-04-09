import React, { Component } from 'react';
import Login from '../Login/Login'
import Register from '../Register/Register'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    }
  }
  showLoginBox() {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    })
  }

  showRegisterBox() {
    this.setState({
      isRegisterOpen: true,
      isLoginOpen: false
    })
  }
  render() {
    return (
      <div>
        <div
         className={"controller " + (this.state.isLoginOpen
            ? "selected-controller"
            : "")}
            onClick={this
                .showLoginBox
                .bind(this)}>
         Login
                {this.state.isLoginOpen && <Login history={this.props.history}/>}
       </div>
       <div
         className={"controller " + (this.state.isRegisterOpen
            ? "selected-controller"
            : "")}
            onClick={this
                .showRegisterBox
                .bind(this)}>
         Register
       </div>
       {this.state.isRegisterOpen && <Register history={this.props.history}/>}
      </div>
    );
  }
}

export default withRouter(Dashboard)
