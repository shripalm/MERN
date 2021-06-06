import React, { useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { registerUser } from '../functions/Api';
import { useHistory } from "react-router-dom";



export default function Register(){
    const history = useHistory();
    const [userName, setUserName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    async function registerApi(e) {
        e.preventDefault();
        let response = await registerUser({userName,number,email,password})
        if(! response.data.success) setMsg(response.data.msg)
        else{
            setMsg(response.data.msg)
            setTimeout(() => {
                history.push('/login')
            }, 1000);
        }
    }
    return(
        <>
            <HomeHeader page="Register"/>
            <div className="row justify-content-center mt-5 p-1">
                <div className="col-md-4 mt-5 p-2 shadow rounded">
                    <center className="title pb-2">Register</center>
                    <br />
                    <form className="my-5" onSubmit={e=>{registerApi(e)}}>
                        <div className="row mt-1">
                            <div className="col-4 align-items-center d-flex">User Name :</div> 
                            <div className="col-8">
                                <input type="text" onChange={e=>{setUserName(e.target.value)}} value={userName} className="form-control" placeholder="Enter Your Name Here" />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-4 align-items-center d-flex">Number :</div> 
                            <div className="col-8">
                                <input type="number" onChange={e=>{setNumber(e.target.value)}} value={number} className="form-control" placeholder="Enter Your Number Here" />
                            </div>
                        </div>
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
                                <button type="submit" className="px-5 my-2 btn btn-primary">Register</button> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}