

const Login = ({signup}) => {
    return (
        <>
            <div>
                <label>Email</label>
                <input type='email' required />
            </div>

            <div>
                <label>Password</label>
                <input type='password' required />
            </div>

            <div>
                <button>Forgot Password</button>
                <button onClick={signup}>Sign-up</button>
            </div>
        </>
    );
}

export default Login;
