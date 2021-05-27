import React, { useState } from 'react'
import { loginUser } from '../networks/Api'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        var res = await loginUser({ email, password })
        if (res.data.success) {
            await localStorage.setItem('token', res.data.token)
            alert("You have successfully logged in.")
        } else {
            alert(res.data.msg)
        }
    }

    return (
        <div>
            <form onSubmit={e => { onSubmit(e) }}>
                Email : <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} /><br />
                Password : <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} /><br />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}
