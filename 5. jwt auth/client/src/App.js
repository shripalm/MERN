import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
    return ( 
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
            </Switch> 
        </Router>
    );
}

export default App;