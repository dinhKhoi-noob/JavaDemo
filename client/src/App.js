import {BrowserRouter as Router} from 'react-router-dom'
import {Switch,Route} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import './App.css';
import UploadFileContextProvider from './contexts/UploadFileContext';
import FilmContextProvider from './contexts/FilmContext';
import AuthContextProvider from './contexts/AuthContext'
import Landing from './views/Landing'
import ManageFilmSite from './components/adminSites/ManageFilmSite';
import ManageStaffSite from './components/adminSites/ManageStaffSite';
import AdminRoute from './routings/AdminRoute';
import StaffRoute from './routings/SuperUserRoute';
import Cart from './views/Cart';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
    <Router>
      <Switch>
        <AuthContextProvider>
          <FilmContextProvider>
            <UploadFileContextProvider>
              <CartContextProvider>
                <Route path="/" exact component = {Dashboard}/>
                <Route exact path="/login" 
                render = {props=><Landing {...props} authRoute = "login"/>}
                />
                <Route exact path="/register" 
                render = {props=><Landing {...props} authRoute = "register"/>}
                />
                <Route path="/cart" exact component = {Cart}/>
                <AdminRoute exact path="/ad-film" component = {ManageFilmSite}/>
                <AdminRoute exact path="/ad-staff" component = {ManageStaffSite}/>
                <StaffRoute exact path="/staff-film" component = {ManageFilmSite}/>
              </CartContextProvider>
            </UploadFileContextProvider>
          </FilmContextProvider>
        </AuthContextProvider>
      </Switch>
    </Router>
  );
}

export default App;