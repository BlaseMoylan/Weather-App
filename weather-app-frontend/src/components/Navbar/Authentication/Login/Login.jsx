import './Login.scss'

const Login = ({signup}) => {
    return (
        <>
            <h2>Login</h2>

            <div>
                <label>Email</label>
                <input type='email' required />
            </div>

            <div>
                <label>Password</label>
                <input type='password' required />
            </div>

            <div className='login-btn-area'>
                <button>Forgot Password</button>
                <button onClick={signup}>Sign-up</button>
            </div>
        </>
    );
}

export default Login;
