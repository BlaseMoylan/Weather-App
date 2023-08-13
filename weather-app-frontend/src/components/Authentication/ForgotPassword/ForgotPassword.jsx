import { useContext, useEffect, useRef } from 'react'

import AuthContext from '../../../context/AuthContext'
import useCustomForm from '../../../hooks/useCustomForm'
import '../Authenticate.scss'
import './ForgotPassword.scss'

const ForgotPassword = () => {

    const { forgotPassword } = useContext(AuthContext)

    const emailRef = useRef()

    const defaultValues = {email: ""}
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, forgotPassword)

    useEffect(() => {
        emailRef.current.focus()
    }, []);

    return (
        <div className='authenticate' onSubmit={handleSubmit}>
            <form className='authentication-form forgot-password'>

                <h2>Forgot Password</h2>

                <p className='message'>Input the email that is attached to the account. An email will be sent if an account is found.</p>

                <div className='form-group'>
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

                <input type='submit' />

            </form>
        </div>
    );
}

export default ForgotPassword;