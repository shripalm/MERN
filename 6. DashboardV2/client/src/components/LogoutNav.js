import React from 'react'
import { useHistory } from "react-router-dom";

export default function LogoutNav(){
    const history = useHistory();
    function logout() {
        localStorage.removeItem('bToken')
        alert('Logout Success')
        history.push('/')
    }
    return(
        <>
            <p onClick={e=>{logout()}}><i className="fa fa-sign-out" data-toggle="tooltip" title="Logout"></i></p>
        </>
    )
}