import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUser, clearUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { MenuList, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }

    componentDidMount() {
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
          const { name } = this.props
          if (this.props.location.pathname !== '/' && this.props.location.pathname !=='/dashboard') {
        return(
            <div>
                <h5>Welcome {name}</h5>
                <div className='toggle' onClick={() => this.toggle()}>
                    <i className="fa fa-bars"></i>
                </div>
                <MenuList className={ this.state.show ? 'menu show': 'menu'}>
                  <MenuItem component={ Link } to='/home'>Home</MenuItem>
                  <MenuItem component={ Link } to='/ownerprofile'>Owner's Profile</MenuItem>
                  <MenuItem component={ Link } to='/providerprofile'>Provider Profile</MenuItem>
                  <MenuItem component={ Link } to='/contact'>Contact Us</MenuItem>
                  <MenuItem component={ Link } to='/faq'>FAQ</MenuItem>
                  <MenuItem><Button onClick={this.logout}>Log Out</Button></MenuItem>
                </MenuList>
            </div>
        )
      } return null
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
  };
  const mapDispatchToProps = {
    updateUser,
    clearUser
  };
  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu));