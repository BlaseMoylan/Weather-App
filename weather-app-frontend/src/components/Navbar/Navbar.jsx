import { useState } from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import './Navbar.scss'

const Navbar = ({setLong, setLat}) => {

    const [value, setValue] = useState('');

    function choosenLocation(data){
        let [long, lat] = data.features[0].geometry.coordinates
        setValue(data.features[0].properties.name)
        setLong(long)
        setLat(lat)
    }

    return (
        <nav>
            <SearchBox value={value} onChange={(change)=>setValue(change)} onRetrieve={(result) => choosenLocation(result)} theme={{variables:{boxShadow:'none', padding: '0px'}}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
            <h1>MySkies</h1>
            <a href='#'>login/sign-up</a>
        </nav>
    );
}

export default Navbar;