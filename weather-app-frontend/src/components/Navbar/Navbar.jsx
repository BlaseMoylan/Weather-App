import { useContext, useEffect, useState } from 'react';
import { SearchBox } from '@mapbox/search-js-react';

import Authenticate from './Authentication/Authenticate';
import AuthContext from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import './Navbar.scss'

const Navbar = ({setLong, setLat}) => {

    const {user, logoutUser} = useContext(AuthContext)
    const [value, setValue] = useState('');
    const [showLoginSignup, setShowLoginSignup] = useState(false);

    useEffect(() => {
        setShowLoginSignup(false)
    }, [user]);

    //sets the new Longitude and Latitude
    function chosenLocation(data){
        let [long, lat] = data.features[0].geometry.coordinates
        setValue(data.features[0].properties.name)
        setLong(long)
        setLat(lat)
    }

    return (
        <>
            <nav>

                <div className='search-area'>
                    <SearchBox value={value} onChange={(change)=>setValue(change)} onRetrieve={(result) => chosenLocation(result)} theme={{variables:{boxShadow:'none'}}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
                </div>

                <div>
                    <h1>MySkies</h1>
                </div>

                {user ? <button onClick={logoutUser}>{user.email}</button> : <button className='login-signup' onClick={()=>setShowLoginSignup(!showLoginSignup)}>login/sign-up</button>}

            </nav>
            <Modal close={()=>setShowLoginSignup(!showLoginSignup)} show={showLoginSignup}>
                <Authenticate />
            </Modal>
        </>
    );
}

export default Navbar;