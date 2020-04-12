import React from 'react';

import './custom-button.styles.scss';

/** Spread Operator used to pass all other params **/
const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
   <button 
      className={`
         ${inverted ? 'inverted' : ''} 
         ${isGoogleSignIn ? 'google-sign-in' : ''} 
         custom-button`} 
      {...otherProps}>
      {children}
   </button>
);

export default CustomButton;