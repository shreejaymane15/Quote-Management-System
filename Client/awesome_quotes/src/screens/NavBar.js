import { useHistory } from "react-router-dom";
import MyQuotes from "./MyQuotes";

function NavBar(){

    const history = useHistory();
    var Home = ()=>{
        history.push("/home");
    }

    var My_Quotes = ()=>{
        history.push("/myquotes");
    }


    var Profile = ()=>{
        history.push("/profile");
    }

    var LogOut = () =>{
        window.sessionStorage.clear("Token");
        window.sessionStorage.clear("id");
        history.push("/");
    }


    return(<>
        <nav className="navbar navbar-default">
        <div className="container-fluid">
        
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" onClick={Home}>Home</a>
        </div>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" onClick={My_Quotes}>My Quotes</a>
        </div>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" onClick={Profile}>Profile</a>
        </div>
        
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
            <li><a onClick={LogOut}>LogOut</a></li>
            </ul>
        </div>
        </div>
        </nav>
    </>)

}


export default NavBar;
