import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUser, clearUser } from '../../ducks/reducer'

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
        return(
            <div>
                <h5>Welcome{name}</h5>
                <div className='toggle' onClick={() => this.toggle()}>
                    <i className="fa fa-bars"></i>
                </div>
                <ul className={ this.state.show ? 'menu show': 'menu'}>
                    <li>Home</li>
                    <li>Owner's Profile</li>
                    <li>Walker's Profile</li>
                    <li>Payment</li>
                    <li>Contact Us</li>
                    <li>FAQ</li>
                    <button onClick={this.logout}>Logout</button>
                    {/* <li>Log Out</li> */}
                </ul>
            </div>
        )
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