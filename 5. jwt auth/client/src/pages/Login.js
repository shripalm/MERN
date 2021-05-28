import { useState } from 'react'
import Menu from '../components/Menu'
import { loginUser } from '../networks/UserApi';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function loginFormSubmit(e) {
        e.preventDefault();
        var res = await loginUser({ email, password })
        if (res.data.success) {
            await localStorage.setItem('token', res.data.token)
            alert("You have successfully logged in.")
        } else {
            alert(res.data.msg)
        }
    }
    return(
        <>
            <Menu />
            <form onSubmit={e=>{loginFormSubmit(e)}}>
                <label>Email: </label>
                <input type="email" required value={email} onChange={e=>{setEmail(e.target.value)}} /><br />
                <label>Password: </label>
                <input type="password" required value={password} onChange={e=>{setPassword(e.target.value)}} /><br />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login