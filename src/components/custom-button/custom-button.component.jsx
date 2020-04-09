import React from 'react';

import './custom-button.styles.scss';

/** Spread Operator used to pass all other params **/
const CustomButton = ({ children, ...otherProps }) => (
   <button className="custom-button" {...otherProps}>
      {children}
   </button>
);

export default CustomButton;