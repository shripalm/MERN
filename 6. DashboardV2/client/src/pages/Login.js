import React, { useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { loginUser } from '../functions/Api';
import { useHistory } from "react-router-dom";

export default function Login(){
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    async function loginApi(e) {
        e.preventDefault();
        let response = await loginUser({email,password})
        if(! response.data.success) setMsg(response.data.msg)
        else{
            localStorage.setItem('bToken', response.data.token)
            setMsg(response.data.msg)
            setTimeout(() => {
                history.push('/')
            }, 1000);
        }
    }
    return(
        <>
            <HomeHeader page="Login"/>
            <div className="row justify-content-center mt-5 p-1">
                <div className="col-md-4 mt-5 p-2 shadow rounded">
                    <center className="title pb-2">Login</center>
                    <br />
                    <form className="my-5" onSubmit={e=>{loginApi(e)}}>
                        <div className="row mt-1">
                            <div className="col-4 align-items-center d-flex">Email :</div> 
                            <div className="col-8">
                                <input type="email" onChange={e=>{setEmail(e.target.value)}} value={email} className="form-control" placeholder="Enter Your Email Here" />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-4 align-items-center d-flex">Password :</div> 
                            <div className="col-8">
                                <input type="password" onChange={e=>{setPassword(e.target.value)}} value={password} className="form-control" placeholder="Enter Your Password Here" />
                            </div>
                        </div>
                        <div className="row mt-1 text-right">
                            <div className="col-12 justify-content-end d-flex">
                                {msg}
                            </div>
                            <div className="col-12 justify-content-end d-flex">
                                <button type="submit" className="px-5 my-2 btn btn-primary">Login</button> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}