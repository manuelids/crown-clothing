import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';

//Reducers
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //this.props is passed via HOC connect(mapDispatchToProps)
    const { setCurrentUser } = this.props;
  
    //Whenever an auth state is executed this delegate will be called
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //user is logged in
      if (userAuth) {
        //Get the user from the firestore
        const userRef = await createUserProfileDocument(userAuth);
        
        //onSnapshot will trigger once we get the data queried
        userRef.onSnapshot(snapshot => {
          //set the state when we get the snapshot object
          setCurrentUser({ 
            id: snapshot.id, //snapshot document id
            ...snapshot.data() //snapshot data
          });
        });        
      }

      //Current user will be the signed in user until we get it from the data store 
      setCurrentUser(userAuth); 
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    //Unsubscribe from the auth
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />        
        {/* Switch + Routes are holding the "view" */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* This route will be applicable only if the current user is not null */}
          {/* else it'll return a redirect to home page */}
          <Route exact 
            path='/signin' 
            render={() => this.props.currentUser 
              ? (<Redirect to="/" />) 
              : (<SignInAndSignUpPage />)} 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

//mapDispatchToProps will execute the initial states for each action that is specified
const mapDispatchToProps = (dispatch) => ({ 
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);