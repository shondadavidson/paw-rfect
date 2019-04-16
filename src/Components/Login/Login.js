import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { updateUser } from '../../ducks/reducer'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state ={
            email: '',
            password: ''
        }
    }
    componentDidMount() {
        this.checkUser()
    }

    checkUser = async () => {
        const {id} = this.props
        if(!id) {
            try {
                let res = await axios.get('/api/current')
                this.props.updateUser(res.data)
                this.props.history.push('/home')
            } catch (err) {

            }
        } else {
            this.props.history.push('/dashboard')
        }
    }
    handleChange(prop, val) {
        this.setState({
          [prop]: val
        })
      }

    login = async (e) => {
        console.log('click')
        e.preventDefault()
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/login', user)
            this.props.updateUser(res.data)
            this.props.history.push('/home')
        } catch (err) {
            alert('incorrect email or password')
        }
    }
    render() {
        const { email, password } = this.state
        return (
            <div className='Login'>
                <input 
                    className='input'
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={e => this.handleChange("email", e.target.value)}
                />
                <input 
                    className='input'
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={e => this.handleChange("password", e.target.value)}
                />
                <button className='login-button' onClick={this.login}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      id: reduxState.id
    }
  }
  const mapDispatchToProps = {
    updateUser
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
  