import { useContext } from 'react';

import AuthContext from '../../../../context/AuthContext';
import useCustomForm from '../../../../hooks/useCustomForm';

const Register = ({login}) => {

    const { registerUser } = useContext(AuthContext)

    const defaultValues = {email: "", password: "", verifyPassword: "", phoneNumber: ""}
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, registerUser)

    return (
        <form className='authenticate' onSubmit={handleSubmit}>
            <h2>Sign-up</h2>

            <div>
                <label>Email</label>
                <input type='email' name='email' value={formData.email} onChange={handleInputChange} autoComplete='off' required />
            </div>

            <div>
                <label>Password</label>
                <input type="password" name='password' value={formData.password} onChange={handleInputChange} autoComplete='off' required />
            </div>

            <div>
                <label>Verify Password</label>
                <input type="password" name='verifyPassword' value={formData.verifyPassword} onChange={handleInputChange} autoComplete='off' required />
            </div>

            <div>
                <label>Phone Number (optional)</label>
                <input type="tel" name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} autoComplete='off' />
            </div>

            <button onClick={login}>Login</button>

            <input type='submit' />
        </form>
    );
}

export default Register;