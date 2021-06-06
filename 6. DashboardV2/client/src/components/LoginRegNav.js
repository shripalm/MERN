import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginHeadSec({page}){
    return(
        <>
            <p className={((page == 'Login') ? 'active' : '')}><Link to="/login">Login</Link></p>
            <p className={((page == 'Register') ? 'active' : '')}><Link to="/register">Register</Link></p>
        </>
    )
}