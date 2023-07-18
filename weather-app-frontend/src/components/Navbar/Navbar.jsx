import { SearchBox } from '@mapbox/search-js-react';
import './Navbar.scss'

const Navbar = () => {
    return (
        <nav>
            <div className='search-area'>
                {/* <SearchBox value='' theme={{variables:{boxShadow:'none', padding}, cssText:'.SearchBox{width:250px}'}}  options={{types:'city', language:'en'}} accessToken='pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ' /> */}
            </div>
            <h1>MySkies</h1>
            <a href='#'>login/sign-up</a>
        </nav>
    );
}

export default Navbar;