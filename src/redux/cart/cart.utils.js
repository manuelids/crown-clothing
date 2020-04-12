export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItems = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    //cart item exists in the array
    if (existingCartItems) {
        //Return a new version of the array so the state knows it needs to render again
        //find the cartitem that is duplicated so we increaste the quantity
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } //cart item is found, increase the quantity
            : cartItem //item is not matched, return the object as is
        );
    }
    
    //Cart item was not found in the array (it's new)
    //return all cart items + a new object of the cart item to add with a base quantity to 1
    //quantity prop gets defined the first time
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}