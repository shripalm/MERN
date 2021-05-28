import Menu from '../components/Menu'
import React, { useState } from 'react'
import { signUpUser } from '../networks/UserApi'

function Signup() {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    

    async function signUpFormSubmit(e) {
        e.preventDefault()
        var res = await signUpUser({ userName, email, password })
        if (res.data.success) {
            alert("You have successfully registered.")
        } else {
            alert(res.data.msg)
        }
    }

    return(
        <>
            <Menu />
            <form onSubmit={e=>{signUpFormSubmit(e)}}>
                <label>User Name: </label>
                <input type="text" required  value={userName} onChange={e => { setUserName(e.target.value) }}  /><br />
                <label>Email: </label>
                <input type="email" required value={email} onChange={e => { setEmail(e.target.value) }}   /><br />
                <label>Password: </label>
                <input type="password" required  value={password} onChange={e => { setPassword(e.target.value) }}  /><br />
                <button type="submit">Sign up</button>
            </form>
        </>
    )
}

export default Signup