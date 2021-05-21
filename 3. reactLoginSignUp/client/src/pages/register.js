import React, { useEffect, useState } from 'react'
import axios from 'axios'
import laptop from '../Images/laptop.jpg'
import { Link } from 'react-router-dom'

function Register() {

    const apiUrl = "http://localhost:5000/users/"
    const [message, setMessage] = useState('')
    const [rFirstname, rSetFirstname] = useState('')
    const [rLastname, rSetLastname] = useState('')
    const [rEmail, rSetEmail] = useState('')
    const [rPassword, rSetPassword] = useState('')

    function registerApi(e) {
        e.preventDefault();
        if(rFirstname.trim().length < 1) {
            setMessage("Firstname must be greater than 1 letters")
            document.getElementById('message').style.color = "red"
        }
        else if(rLastname.trim().length < 1) {
            setMessage("Lastname must be greater than 1 letters")
            document.getElementById('message').style.color = "red"
        }
        else if(rEmail.trim().length < 4) {
            setMessage("Email must be greater than 4 letters")
            document.getElementById('message').style.color = "red"
        }
        else{
            axios.post(apiUrl+'register', {
                firstname: rFirstname,
                lastname: rLastname,
                email: rEmail,
                password: rPassword
            }).then(res => {
                if(res.data.success) {
                    setMessage(res.data.msg)
                    document.getElementById('message').style.color = "green"
                    rSetFirstname("")
                    rSetLastname("")
                    rSetEmail("")
                    rSetPassword("")
                }
                else {
                    setMessage(res.data.msg)
                    document.getElementById('message').style.color = "red"
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="main-container">
            <div className="formcontent">
                <h2 className="form-title">Member Signup</h2>
                <form  onSubmit={(e)=>{registerApi(e)}} className="form-register">
                    <input type="text" placeholder="First Name"  onChange={e => {rSetFirstname(e.target.value)}} />
                    <input type="text" placeholder="Last Name"  onChange={e => {rSetLastname(e.target.value)}} />
                    <input type="email" placeholder="Email"  onChange={e => {rSetEmail(e.target.value)}} />
                    <input type="password" placeholder="password" onChange={e => {rSetPassword(e.target.value)}}  />

                    <button className="signup">Sign Up</button>

                    <div className="forgot">
                        <span>If you have already registered than </span> <span className="login"><Link to="/login">Login</Link></span>
                    </div>
                    <p id="message">{message}</p>
                </form>
            </div>
            <div className="imagecontent">
                <img src={laptop} alt="laptop" />
                <h3 className="imagetitle">DIGITAL PRODUCTS <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;MARKET PLACE
                </h3>
                <h6 className="imagetitletwo">&nbsp;Your perfect place to <br />
                      buy and sell digital goods
                </h6>

            </div>
        </div>
    );
}

export default Register;