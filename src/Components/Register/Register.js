import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from './../../ducks/reducer'
import '../CSS/Dashboard.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
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
            password: this.state.password,
            name: this.state.name
        }
        try {
            const { email, password, name } = this.state
            if(email && password && name) {
            let res = await axios.post('/auth/register', user)
            this.props.updateUser(res.data)
            this.props.history.push('/home')
        } else {
            alert('Please fill out the registration form')
        }
     }  catch (err) {
            alert('This Email is already registered')
        }
    }

    render() {
        const { email, password, name } = this.state
        return (
            <div className='Login'>
                <div className=''>
                    <input
                        className='input'
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={e => this.handleChange('name', e.target.value)}
                    />
                    <input
                        className='input'
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={e => this.handleChange('email', e.target.value)}
                    />
                    <input
                        className='input'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={e => this.handleChange("password", e.target.value)}
                    />
                    <button
                        className='login-button'
                        type='button'
                        onClick={this.register}>Register</button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)