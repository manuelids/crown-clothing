import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //Whenever an auth state is executed this delegate will be called
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //user is logged in
      if (userAuth) {
        //Get the user from the firestore
        const userRef = await createUserProfileDocument(userAuth);
        
        //onSnapshot will trigger once we get the data queried
        userRef.onSnapshot(snapshot => {
          //set the state when we get the snapshot object
          this.setState({
            currentUser: { 
              id: snapshot.id, //snapshot document id
              ...snapshot.data() //snapshot data
            }
          });

          console.log(this.state);
        });

      }

      //Current user will be the signed in user until we get it from the data store 
      this.setState({ currentUser: userAuth }); 
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />        
        {/* Switch + Routes are holding the "view" */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;