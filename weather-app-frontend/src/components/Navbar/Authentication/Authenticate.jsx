import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import './Authenticate.scss'

const Authenticate = () => {

    const [login, setLogin] = useState(true);

    function handleSubmit(event){
        event.preventDefault()
    }

    return (
        <form className='authenticate' onSubmit={(event)=>handleSubmit(event)}>

            {login ? <Login signup={()=>setLogin(!login)} /> : <Register login={()=>setLogin(!login)} />}

            <input type='submit' />
        </form>
    );
}

export default Authenticate;