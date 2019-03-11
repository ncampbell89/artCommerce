import React, { Component } from 'react';
import { handleSignInAPI, JWTexpirationAndLogin } from '../API/userAPI';
import authContext from '../../AuthContext/authContext';
import './signin.css';

export default class Signup extends Component {

    // make 'static contextType = AuthContext' available to this class using this.context
    static contextType = authContext;

    state = {
        email: '',
        password: '',
        signedIn: null,
        error: null,
        errorMessage: ''
    }

    componentDidMount() {
        JWTexpirationAndLogin()
        .then(result => {
            // is calling the function toggleAuth on App.js
            this.context.toggleAuth(result);
            // console.log(this.context.toggleAuth());
            this.props.history.push('/');
        })
        .catch(loggedout => {
            this.context.toggleAuth(loggedout);
            // console.log(this.context.toggleAuth());
            this.props.history.push('/signin')
        })
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        handleSignInAPI(this.state)
        .then(result => {
            this.context.toggleAuth(result);

            this.setState({
                error: false,
                errorMessage: ''
            })
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(JSON.stringify(error))
        })
        this.form.reset();
    }

  render() {
    return (
        <div className="container w-50 mt-3 mb-3 p-4 rounded border border-dark">
            <form method="POST" onSubmit={this.handleSubmit} ref={(node) => this.form = node}>
                <h3 className="text-center">Sign In</h3>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="email" 
                        onChange={this.handleInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="password"
                        onChange={this.handleInput} 
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
  }
}
