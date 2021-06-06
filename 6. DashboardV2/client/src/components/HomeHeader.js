import React from 'react'
import { Link } from 'react-router-dom'
import LoginRegNav from './LoginRegNav';
import LogoutNav from './LogoutNav';

export default function HomeHeader({page}){
    return(
        <div id="headContainer">
            <div id="mainHeader">
                <p className={((page == 'Home') ? 'active' : '')}><Link to="/">Home</Link></p>
                {(! localStorage.getItem('bToken') ? <LoginRegNav page={page}/> : <LogoutNav /> )}
            </div>
        </div>
    )
}