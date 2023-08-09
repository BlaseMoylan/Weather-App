import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../context/AuthContext';
import useCustomForm from '../../../hooks/useCustomForm';
import '../Authenticate.scss';
import './Login.scss';

const Login = () => {

    const emailRef = useRef()

    const { loginUser } = useContext(AuthContext)

    const defaultValues = {email: "", password: ""}
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, loginUser)

    useEffect(() => {
        emailRef.current.focus()
    }, []);

    return (
        <form className='authenticate' onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    ref={emailRef}
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete='off'
                    required
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete='off'
                    required
                />
            </div>

            <div className='login-btn-area'>
                <Link className='forgot-password' to={'/forgotpassword'}>Forgot Password</Link>
                <Link to={'/register'}>Sign-up</Link>
            </div>

            <input type='submit' />
        </form>
    );
}

export default Login;
