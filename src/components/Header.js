import { Link } from 'react-router-dom';
import Nav from './Nav';
import { useState } from 'react';

function Header() {
    const [navOpen, setNavOpen] = useState(false)
    function handleShow() {
        setNavOpen(!navOpen)
    }

    return (
        <header className="top-bar" >
            <h1><Link to='/'>Upload Image</Link></h1>
            <button onClick={handleShow} href="#menu" className="btn-menu">
                <span className="button-content">
                    <span className="text">Menu</span>
                    <span className="bar"></span>
                </span>
            </button>
            <Nav style={{ display: navOpen && "block" }} />
        </header>
    )
}

export default Header;