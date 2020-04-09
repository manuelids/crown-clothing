import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ email: '', password: '' });
    }

    handleChange = (event) => {
        event.preventDefault();

        const { value, name } = event.target;
        
        //By using [propName] we set the propery X based on event.target.name
        //since the input is named as email or password it'll find it in the 
        //set state and set the current value after it changes
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    {/* Custom Form Input */}
                    <FormInput 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label="Email"
                    />
                    
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    
                    <div className="buttons">
                        {/* Custom Button */}
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
            </div>
        )
    };
}

export default SignIn;