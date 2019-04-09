import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from './../../ducks/reducer'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.register = this.register.bind(this)
    }
    componentDidMount() {
        this.checkUser()
    }

    checkUser = async () => {
        const { id } = this.props
        if (!id) {
            try {
                let res = await axios.get('api/current')
                this.props.updateUser(res.data)
                this.props.history.push('/home')
            } catch (err) {

            }
        } else {
            this.props.history.push('/home')
        }
    }
    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    async register() {
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/register', user)
            this.props.updateUser(res.data)
            this.props.history.push('/home')
        } catch (err) {
            alert('This Email is already registered')
        }
    }

    render() {
        const { email, password } = this.state
        return (
            <div>
                <input type="text"
                placeholder='Email'
                value={email}
                onChange={ e => this.handleChange('email', e.target.value)}
                />
                <input type="password"
                placeholder='Password'
                value={password}
                onChange={e => this.handleChange("password", e.target.value)}
                />
                <button 
                type='button'
                className='login-btn'
                onClick={this.register}>Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps) (Register)