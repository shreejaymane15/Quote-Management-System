import { useEffect, useState } from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import {React} from "react-router-dom";
import { useHistory } from 'react-router-dom';




function Register(){
    const history = useHistory();
    var [id,setid]=useState("");
    var [mobile,setmobile]=useState("");
    var [firstname,setfirstname]=useState("");
    var [lastname,setlastname]=useState("");
    var [email,setemail]=useState("");
    var [password,setPassword]=useState("");
    var user={'id':0,'firstname':'firstname','lastname':'lastname','email':'email','password':'password'} 

    const store=()=>{
      var helper=new XMLHttpRequest();
      helper.onreadystatechange =() => {
        if(helper.readyState == 4 && helper.status == 200){
           history.push('/');
        }
        else{
            console.log("Something went wrong");
        }
      }
      helper.open("POST", 'http://127.0.0.1:9999/user/register');
      helper.setRequestHeader("Content-type","application/json")
      helper.send(JSON.stringify(user));
    }

    const onClick=()=>{
        user = {'id':0,'firstname':firstname,'lastname':lastname,'email' : email,'mobile':mobile, 'password' : password};
        store();
    }

    const Login = () =>{
        history.push('/');
    }

    function getfirstname(args){
        setfirstname(args.target.value);
     }
     function getlastname(args){
        setlastname(args.target.value);
     }
     function getemail(args){
        setemail(args.target.value);
     }
     function getmobile(args){
        setmobile(args.target.value);
     }
     function getpassword(args){
        setPassword(args.target.value);
     }

    return(<>
    <form>
        <div className="container" style={{marginTop:'20rem', alignItems:'center'}} >
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><h1>Register</h1></div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input type="text" className="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="Enter First Name" onChange={getfirstname}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp" placeholder="Enter Last Name"onChange={getlastname} />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={getemail}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Mobile Number</label>
            <input type="text" className="form-control" id="exampleInputMobileNumber" aria-describedby="emailHelp" placeholder="Enter Mobile" onChange={getmobile}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" onChange={getpassword}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Verify Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Verify Password" onChange={getpassword}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onClick}>Register</button>
        <div>
        <p className="mb-0">Already have an account? <a className="text-white-50 fw-bold" onClick={Login}>Login</a>
        </p>
        </div>
        </div>

    </form>
            </>);
}

export default Register;