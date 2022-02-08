import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  signOut } from '../userAuth'

import { deleteUser } from '../features/user/userSlice';

const Nav = ({ style }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    return (
        <nav className="main-nav" style={style}>
            <ul>
                <li><NavLink to="/" >Home</NavLink></li>
                {user ? <li><button className="btn-signout" onClick={() => { signOut(); navigate("/login"); dispatch(deleteUser());}}>Sign Out</button></li> :
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                    </>}
            </ul>
        </nav>
    );

};
export default Nav;