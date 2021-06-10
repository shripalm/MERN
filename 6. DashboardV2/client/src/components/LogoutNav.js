import React from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function LogoutNav({page}){
    const history = useHistory();
    function logout() {
        localStorage.removeItem('bToken')
        alert('Logout Success')
        history.push('/')
    }
    return(
        <>
            <p className={((page === 'My orders') ? 'active' : '')}><Link to="/myOrders">My orders</Link></p>
            <p onClick={e=>{logout()}}><i className="fa fa-sign-out" data-toggle="tooltip" title="Logout"></i></p>
        </>
    )
}