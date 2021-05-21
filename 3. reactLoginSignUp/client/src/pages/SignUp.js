import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'


export default function SignUp() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {

    }, [])

    function submit(e) {
        e.preventDefault();
        var data = {
            firstname: fname,
            lastname: lname,
            email: email,
            password: password
        }
        axios.post('http://127.0.0.1:5000/users/register', data).then(res => {
            if (res.data.success) {
                alert(res.data.msg)
            } else {
                alert(res.data.msg)
            }
            setEmail("")
            setPassword("")
            setFname("")
            setLname("")
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div>
            <Nav />
            <form onSubmit={e => { submit(e) }}>
                firstName  : <input type="text" value={fname} onChange={e => { setFname(e.target.value) }} />
                <br />
                lastName  : <input type="text" value={lname} onChange={e => { setLname(e.target.value) }} />
                <br />
                Email : <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} />
                <br />
                Password : <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <span>Already a member please <Link to="/login">login</Link></span>
        </div>
    );
}
