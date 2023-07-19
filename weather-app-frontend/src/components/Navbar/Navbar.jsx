import { useState, useEffect } from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import './Navbar.scss'

const Navbar = (setLong, setLat) => {

    const [location, setLocation] = useState([]);

    useEffect(() => {
        let [long, lat] = location.features[0].geometry.coordinates
        setLong(long)
        setLat(lat)
    }, [location]);

    return (
        <nav>
            <div className='search-area'>
                <SearchBox onRetrieve={(result) => setLocation(result) } value='' theme={{variables:{boxShadow:'none', padding: '0px'}}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
            </div>
            <h1>MySkies</h1>
            <a href='#'>login/sign-up</a>
        </nav>
    );
}

export default Navbar;