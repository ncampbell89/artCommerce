import React, { Component } from 'react';
import Nav from './Nav/Nav';
import LoggedInNav from './Nav/LoggedInNav';
import { handleSignOutAPI } from './API/userAPI';
import authContext from '../AuthContext/authContext';

export default class Signout extends Component {

    static contextType = authContext;

    state = {
        signedIn: true,
        error: null
    }

    toggleAuth = (data) => {
        this.setState(userState => {
          return {
            isAuth: userState.isAuth, 
            userProfileInfo: null 
          }
        })
    }

    handleLogout = () => {
        handleSignOutAPI()
        .then(() => {
            this.setState({
                signedIn: null
            })
            console.log('signed out');
            console.log(this.context.isAuth);
        })
        .catch(() => {
            this.setState({
                error: true
            })
            console.log('could not sign out');
            console.log(this.context.isAuth);
        })
    }

  render() {
    return (
      <div>
          Signed out
      </div>
    )
  }
}
