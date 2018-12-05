import React, { Component } from 'react'
import './Login.css'
import axios from 'axios';
import history from '../../history'


class login extends Component {
    state = {
        email: '',
        password: '',
        redirect: null
    }

    componentDidMount() {
        // console.log("[LOGIN]: COMPONENT DID MOUNT")
        // console.log(this.props.userId)
        if (this.props.userId) {
            localStorage.removeItem('Authorization')
            localStorage.removeItem('userId')
            this.props.loginCheck()
            // console.log('LOGGED OUT')
        } 
    }

    componentWillMount() {
        if (this.props.userId !== false) {
            localStorage.removeItem('Authorization')
            localStorage.removeItem('userId')
            this.props.loginCheck()
            // console.log('LOGGED OUT')
        } 
    }

    loginButtonHandler(state) {
        axios({
            method: 'post',
            url: 'http://localhost:3000/user/login',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((res) => {
                const newToken = 'bearer ' + res.data.token
                localStorage.removeItem('Authorization')
                localStorage.removeItem('userId')
                localStorage.setItem('Authorization', newToken)
                localStorage.setItem('userId', res.data.userId)
                this.props.loginCheck(res.data.userId)
                history.goBack()
            })
            .catch((err) => {
                localStorage.removeItem('Authorization')
                console.log(err)
            })
    }


    render () {
        return (
            <div style={{textAlign: 'center'}}>
                {this.state.redirect}
                <div className="users_login_container">    
                    <div className="login_header">
                        <h2>Login</h2>
                    </div>
                
                    <div className="users_login_form_container">
                        <form>
                            <label>Email:</label>
                            <input type="text" name="email" onChange={event => this.setState({email: event.target.value})}></input>
                            
                            <label>Password:</label> 
                            <input type="password" name="password" onChange={event => this.setState({password: event.target.value})}></input>

                            <button type='button' style={{textAlign: 'left'}} onClick={() => this.loginButtonHandler(this.state)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>   
        )
    }
}


export default login