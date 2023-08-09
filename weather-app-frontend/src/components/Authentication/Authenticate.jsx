import { useState } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';
import './Authenticate.scss'

const Authenticate = () => {

    const [login, setLogin] = useState(true);

    return (
        <>
            {login ? <Login signup={()=>setLogin(!login)} /> : <Register login={()=>setLogin(!login)} />}
        </>
    );
}

export default Authenticate;