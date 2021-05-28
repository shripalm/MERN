import { Link } from 'react-router-dom'


function Menu(params) {
    return (
        <div>
            <ul type="square">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    )
}

export default Menu;