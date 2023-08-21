import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from '@mapbox/search-js-react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import './Navbar.scss'

const Navbar = ({setLong, setLat}) => {

    const {user, logoutUser} = useContext(AuthContext)
    const [value, setValue] = useState('');
    const navigate = useNavigate()

    //sets the new Longitude and Latitude
    function chosenLocation(data){
        let [long, lat] = data.features[0].geometry.coordinates
        setValue(data.features[0].properties.name)
        setLong(long)
        setLat(lat)
        navigate('/home')
    }

    return (
        <>
            <nav>

                <div className='search-area'>
                    <SearchBox value={value} onChange={(change)=>setValue(change)} onRetrieve={(result) => chosenLocation(result)} theme={{variables:{boxShadow:'none'}}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
                </div>

                <div>
                    <Link to={'/home'}>
                        <h1>MySkies</h1>
                    </Link>
                </div>

                {user ?
                    <button onClick={logoutUser}>{user.email}</button>
                :
                    <div>
                        <Link className='login-signup' to={'/login'}>login</Link>
                        <Link className='login-signup' to={'/register'}>sign-up</Link>
                    </div>
                }

            </nav>
        </>
    );
}

export default Navbar;