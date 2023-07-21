import { useState } from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import './Navbar.scss'

const Navbar = ({setLong, setLat}) => {

    const [value, setValue] = useState('');
    const [showLoginSignup, setShowLoginSignup] = useState(false);

    //sets the new Longitude and Latitude
    function choosenLocation(data){
        let [long, lat] = data.features[0].geometry.coordinates
        setValue(data.features[0].properties.name)
        setLong(long)
        setLat(lat)
    }

    return (
        <nav>

            <div className='search-area'>
                <SearchBox value={value} onChange={(change)=>setValue(change)} onRetrieve={(result) => choosenLocation(result)} theme={{variables:{boxShadow:'none'}}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
            </div>

            <div>
                <h1>MySkies</h1>
            </div>

            <div>
                <button className='login-signup' onClick={()=>setShowLoginSignup(!showLoginSignup)}>login/sign-up</button>
            </div>

        </nav>
    );
}

export default Navbar;