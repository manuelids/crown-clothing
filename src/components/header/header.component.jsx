import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //This is a higher order component
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'


//current User comes from the HOC connected at the bottom
const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/shop">
                CONTACT
            </Link>
            {
                currentUser 
                ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                : <Link className="option" to="/signin">SIGN IN</Link>
            }
            <CartIcon />
            </div>
        {
            hidden ? null : <CartDropdown />
        }
    </div>
);

//State is the rootState from the root reducer that maps all the user-reducers
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

//Higher order component to connect the state value to this component
export default connect(mapStateToProps)(Header);