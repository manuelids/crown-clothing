import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    console.log('CartIcon got Rendered!');

    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => ({
        itemCount: selectCartItemsCount(state)
});

// const mapStateToProps = ({ cart: { cartItems } }) => {
//     console.log('I\'m being called');
//     return {
//         itemCount: 
//             cartItems.reduce(
//                 (accumulatedQuantity, cartItem) => 
//                     accumulatedQuantity + cartItem.quantity
//                     , 0
//             )
//     }
// };

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CartIcon);