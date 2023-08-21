import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/Login.js"
import ProtectedRoute from "./ProtectedRoute.js";
import { Switch } from "react-router-dom";
import Home from "./Home.js";
import MyQuotes from "./MyQuotes.js";
import Profile from "./Profile.js";
import Register from "./Register.js";
import Fav from "./Fav.js";
import AddQuotes from "./AddQuotes.js";

function Controller(){
    return(<Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute> 
                    <ProtectedRoute exact path="/myquotes" component={MyQuotes}></ProtectedRoute> 
                    <ProtectedRoute exact path="/profile" component={Profile}></ProtectedRoute> 
                    <ProtectedRoute exact path="/fav" component={Fav}></ProtectedRoute> 
                    <ProtectedRoute exact path="/addquotes" component={AddQuotes}></ProtectedRoute> 
                </Switch>
            </Router>)
}

export default Controller;