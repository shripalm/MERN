import React from 'react';
import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <nav>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/login">Login Page</Link></li>
            <li><Link to="/signup">SignUp Page</Link></li>
        </nav>
    );
}

export default Nav;
