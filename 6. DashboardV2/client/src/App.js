import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';
import Register from './pages/Register';

function App() {
    return ( 
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/myOrders" exact component={MyOrders} />
            </Switch>
        </Router>
    );
}

export default App;