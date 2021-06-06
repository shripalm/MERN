import React from 'react'
import HomeHeader from '../components/HomeHeader'
import { useHistory } from "react-router-dom";

export default function Home(){
    const history = useHistory();
    if(! localStorage.getItem('bToken')) history.push('/login')
    return(
        <>
            <HomeHeader page="Home"/>
        </>
    )
}