import React from 'react';
import logo from '../../Images/big_rmp_logo.41f961d.svg'
import './footer.css';

const Footer = () => {

    return (
        <nav className="footer">
            <div className='footer-logo'>
                <img src={logo} alt="RateMyRevature Logo"/>
            </div>
            <div>
                <span className='footer-user-vic'>--------------------------</span>
            </div>
            <div >
                <span className='footer-user-pic'>© Inc. All Rights Reserved</span>
            </div>
        </nav>
    );
};

export default Footer;