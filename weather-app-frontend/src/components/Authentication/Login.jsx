import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';
import './Authenticate.scss';

const Login = () => {

    const emailRef = useRef()

    const { loginUser } = useContext(AuthContext)

    const defaultValues = {email: "", password: ""}
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, loginUser)

    useEffect(() => {
        emailRef.current.focus()
    }, []);

    return (
        <div className={'full-height center'} >
            <form className='auth-form' onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className='auth-group'>
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

                <div className='auth-group'>
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

                <div className='auth-links-container'>
                    <Link className='auth-link' to={'/forgotpassword'}>Forgot Password</Link>
                    <Link className='auth-link' to={'/register'}>Sign-up</Link>
                </div>

                <input type='submit' />
            </form>
        </div>
    );
}

export default Login;