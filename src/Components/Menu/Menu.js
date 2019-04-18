import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUser, clearUser, toggleMenu, hideMenu } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { MenuList, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'

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
    this.checkNewMessageCount()
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

  checkNewMessageCount = () => {
    console.log('hit new message')
    axios.get(`/api/getNewMessageCount/${this.props.id}`).then(res => {
      this.setState({ newMessageCount: res.data })
    })
  }

  render() {
    const { name } = this.props
    if (this.props.location.pathname !== '/' && this.props.location.pathname !== '/dashboard') {
      return (
        <div>
          <h5>Welcome {name}</h5>
          <div className='toggle'
            // onClick={() => this.toggle()} //old toggle that uses state
            onClick={() => this.props.toggleMenu()}
          >
            <i className="fa fa-bars"></i>
          </div>
          {/* <MenuList className={ this.state.show ? 'menu show': 'menu'}> // old menu that uses state
                  <MenuItem component={ Link } to='/home'>Home</MenuItem>
                  <MenuItem component={ Link } to='/ownerprofile'>Owner's Profile</MenuItem>
                  <MenuItem component={ Link } to='/providerprofile'>Provider Profile</MenuItem>
                  <MenuItem component={ Link } to='/contact'>Contact Us</MenuItem>
                  <MenuItem component={ Link } to='/faq'>FAQ</MenuItem>
                  <MenuItem><Button onClick={this.logout}>Log Out</Button></MenuItem>
                </MenuList> */}


          <MenuList className={this.props.show ? 'menu show' : 'menu'} onClick={() => this.props.toggleMenu()}>
            <MenuItem component={Link} to='/home'>Home</MenuItem>
            <MenuItem component={Link} to='/ownerprofile'>Owner's Profile</MenuItem>
            <MenuItem component={Link} to='/providerprofile'>Provider Profile</MenuItem>
            <MenuItem component={Link} to='/contact'>Contact Us</MenuItem>
            <MenuItem component={Link} to='/faq'>FAQ</MenuItem>
            <MenuItem><Button onClick={this.logout}>Log Out</Button></MenuItem>
          </MenuList>
          <Link to={`/inbox`}>
            <p>you have {this.state.newMessageCount.count} unread messages</p>
          </Link>
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
  clearUser,
  toggleMenu,
  hideMenu
};
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu));