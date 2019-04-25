import React, { Component } from 'react'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUser, clearUser, toggleMenu, hideMenu } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { MenuList, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import '../Menu/Menu.css'
import Dashboard from '../Dashboard/Dashboard';

const styles = theme => ({
  menu: {
    color: 'white',
    fontSize: '20px'
  }
})

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      newMessageCount: {}
    }
  }

  componentDidMount() {
    // console.log({menuProps: this.props})
    this.props.hideMenu()
    this.getUser()

  }
  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/api/current");
        this.props.updateUser(res.data);
      } catch (err) {
        this.props.history.push("/");
      }
    }
  }

  logout = async () => {
    await axios.post("/auth/logout");
    this.props.clearUser();
    this.props.history.push("/");
  };

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  

  render() {
    const { name, classes } = this.props
    if (this.props.location.pathname !== '/' && this.props.location.pathname !== '/dashboard') {
      return (

<nav>
        
          <div className="sub-menu-parent" >
            <span class="nav-show">Menu</span>
            <div className="sub-menu">
            <Link to='/home'><p>Home</p></Link>
            <Link to='/ownerprofile'><p>Owner's Profile</p></Link>
            <Link to='/providerprofile'><p>Provider's Profile</p></Link>
            <Link to='/contact'><p>Contact Us</p></Link>
            <Link to='/faq'><p>FAQs</p></Link>
            <p><button onClick={this.logout}>Log Out</button></p>
            </div>
            </div>
           
         
 </nav>

      )
    } return null
  }
}
Menu.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = reduxState => {
  return reduxState;
};
const mapDispatchToProps = {
  updateUser,
  clearUser,
  toggleMenu, 
  hideMenu
};
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Menu)))