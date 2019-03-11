import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Nav from './Components/Containers/Nav/Nav';
import LoggedInNav from './Components/Containers/Nav/LoggedInNav';

import Home from './Components/Containers/Home/Home';
import About from './Components/Containers/About/about';
import Support from './Components/Containers/Support/support';
import Cart from './Components/Containers/Cart/cart';
import Signup from './Components/Containers/Signup/signup';
import Signin from './Components/Containers/Signin/signin';
// import Signout from './Components/Containers/signout';

import AddProduct from './Components/Containers/addProduct/addProduct';

// import { Nav, Home, About, Support, Cart, Signup, Signin } from './Components/Containers';

import authContext from './Components/AuthContext/authContext';

import { JWTexpirationAndLogin } from './Components/Containers/API/userAPI';

class App extends Component {

  static contextType = authContext;

  state = {
    isAuth: false,
    userProfileInfo: null,
    signedIn: null
  }

  componentDidMount() {
    JWTexpirationAndLogin()
      .then(result => {
        this.toggleAuth(result)
      })
      .catch(loggedOut => {
        this.toggleAuth(loggedOut)
      })
  }

  toggleAuth = (data) => {
    this.setState(userState => {
      return {
        isAuth: !userState.isAuth, // isAuth: true, the user will be authenticated
        userProfileInfo: data // the user's data will show
      }
    })
  }

  render() {
    return (
      <authContext.Provider value={{
        isAuth: this.state.isAuth,
        userProfileInfo: this.state.userProfileInfo,
        toggleAuth: this.toggleAuth
      }}>

      <Router>
        <div>
          { this.state.isAuth ? <LoggedInNav /> : <Nav /> }
          {/* <Nav /> */}
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/support" component={Support}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>

            <Route exact path="/addProduct" component={AddProduct}></Route>
          </Switch>
        </div>
      </Router>

      </authContext.Provider>
    );
  }
}

export default App;
