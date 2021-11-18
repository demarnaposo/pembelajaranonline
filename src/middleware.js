import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import App from './App';
import LoginUser from './components/AuthUsers/Login';
import RegistrasiUser from './components/AuthUsers/Registrasi';
import ListUser from './components/ListUser';
import ListVideoAdmin from './components/ListVideoAdmin.js';
import Login from './components/Login';
import ListVideoUser from './components/PageListVideoUser';
import Skor from './components/Skor/Skor';
import SoalQuiz from './components/SoalQuiz';


const Middleware = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <LoginUser/>} />
                <Route exact path="/login-admin" render={() => <Login/>} />
                <Route exact path='/list-video-admin' render={() => <ListVideoAdmin/>} />
                <Route exact path='/list-user' render={() => <ListUser/>} />
                <Route exact path='/registrasi-user' render={() => <RegistrasiUser/>} />
                <Route exact path='/list-video-user' render={() => <ListVideoUser/>} />
                <Route exact path='/quiz' render={() => <SoalQuiz/>} />
                <Route exact path='/skor' render={() => <Skor/>} />

            </Switch>
        </Router>

    )
}
export default Middleware;