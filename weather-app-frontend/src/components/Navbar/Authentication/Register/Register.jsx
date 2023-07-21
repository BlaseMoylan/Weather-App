

const Register = ({login}) => {
    return (
        <>
            <div>
                <label>Email</label>
                <input type="email" required />
            </div>

            <div>
                <label>Password</label>
                <input type="password" required />
            </div>

            <div>
                <label>Verify Password</label>
                <input type="password" required />
            </div>
            <button onClick={login}>Login</button>
        </>
    );
}

export default Register;