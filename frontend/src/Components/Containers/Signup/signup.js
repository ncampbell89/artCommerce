import React, { Component } from 'react';
import { handleSignUpAPI } from '../API/userAPI';

export default class Signup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: null,
        signedUp: null
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    redirectToSignin = () => {
        setTimeout(() => {
            this.props.history.push('/signin')
        }, 2000);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        handleSignUpAPI(this.state)
        .then(result => {
            // let successMessage = 'You can now sign in'
            // console.log(successMessage);
            this.redirectToSignin();
            this.setState({
                signedUp: true
            })
        })
        .catch(error => {
            // console.log(error.response) // this gets the RESPONSE of the ERROR

            let errorMessage = error.response.data.message;
            console.log(errorMessage);
            
            this.setState({
                error: true,
                errorMessage
            })
        })
    }

  render() {
      let message;

      if(this.state.error === true) {
          message = (
            <span className="alert alert-danger">{this.state.errorMessage}</span>
          )
      }

    return (
        <div className="container w-50 mt-3 mb-3 p-4 rounded border border-dark">
        <form method="POST" onSubmit={this.handleSubmit}>
            <h3 className="text-center">Sign Up</h3>

            <div className="form-group">
                <label htmlFor="email">First Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="firstName" 
                    onChange={this.handleInput}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Last Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="lastName" 
                    onChange={this.handleInput} 
                />
            </div>

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
            <br />
            {message}
        </form>
    </div>
    )
  }
}
