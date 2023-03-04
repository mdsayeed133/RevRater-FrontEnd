import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Stores/authSlice';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import './navBar.css';

const NavBar = () => {
    const loginUser = useSelector((state)=> state.auth.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };

    return (
        <nav className="navbar">
            <div className='navbar-logo'>
                RavRater
            </div>
            <ul className="navbar-menu">
                <li className="navbar-menu-li">
                    <Link className="navbar-menu-link" to="/">Home</Link>
                </li>
                <li className="navbar-menu-li">
                    <Link className="navbar-menu-link" to="/login">Login</Link>
                </li>
                <li className="navbar-menu-li">
                    <Link className="navbar-menu-link" to="/register">Register</Link>
                </li>
            </ul>
            <div >
                {loginUser && 
                    <span >
                        <Link className="navbar-user-pic" to='/'>{loginUser.firstName} {loginUser.lastName} </Link>
                        <IconButton
                            size="medium"
                            onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </span>
                }
            </div>
        </nav>
    );
};

export default NavBar;

