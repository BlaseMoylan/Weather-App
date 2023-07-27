import React, { useContext } from 'react';

import AuthContext from '../../../../context/AuthContext';
import useCustomForm from '../../../../hooks/useCustomForm';
import './Login.scss'

const Login = ({signup}) => {

    const { loginUser } = useContext(AuthContext)

    const defaultValues = {email: "", password: ""}
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, loginUser)

    return (
        <form className='authenticate' onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label>Email</label>
                <input type='email' name='email' value={formData.email} onChange={handleInputChange} autoComplete='off' required />
            </div>

            <div>
                <label>Password</label>
                <input type='password' name='password' value={formData.password} onChange={handleInputChange} autoComplete='off' required />
            </div>

            <div className='login-btn-area'>
                <button className='forgot-password'>Forgot Password</button>
                <button onClick={signup}>Sign-up</button>
            </div>

            <input type='submit' />
        </form>
    );
}

export default Login;
