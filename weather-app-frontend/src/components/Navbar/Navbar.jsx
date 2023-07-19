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

            <div className='search-area'>
                <SearchBox value={value} onChange={(change)=>setValue(change)} onRetrieve={(result) => choosenLocation(result)} theme={{variables:{boxShadow:'none'}}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' />
            </div>

            <div>
                <h1>MySkies</h1>
            </div>

            <div>
                <a href='#'>login/sign-up</a>
            </div>

        </nav>
    );
}

export default Navbar;