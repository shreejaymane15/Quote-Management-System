import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

function Login(){

   var [email, setEmail] = useState("");
   var [password, setPassword] = useState("");
   const history = useHistory();
//    var [users, setUsers] = useState({'email': '', 'password':''});
   var user = {'email': '', 'password':''};

   const validate = () =>{
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () =>{
            if(helper.readyState == 4 && helper.status == 200){
                var responseReceived = JSON.parse(helper.responseText);

                if(responseReceived != null){
                    sessionStorage.setItem("Token", responseReceived.token);
                    sessionStorage.setItem("id", responseReceived.user_id);
                    history.push('/home');
                }
                else{
                    history.push('/login');
                }
            }
        }
        helper.open('POST', "http://127.0.0.1:9999/login");
        helper.setRequestHeader("Content-type", "application/json");
//        console.log(JSON.stringify(user));
        helper.send(JSON.stringify(user));
    }

    const onClick = ()=>{
        user = {'email' : email, 'password' : password};
        validate();
    }

    var SignUp = () =>{
        history.push("/register");
    } 
    function getEmail(args){
        setEmail(args.target.value);
        // console.log(args.target.value);
    }
    function getPassword(args){
        setPassword(args.target.value);
    }
    

    return (<>
            <section className="vh-100 gradient-custom">
                <div className="container" style={{marginTop:'25rem', marginLeft:'70rem'}}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" border="border-radius: 1rem;">
                        <div className="card-body p-5 text-center">
            
                        <div className="mb-md-5 mt-md-4 pb-5" style={{justifyContent:'center', alignItems:'center'}}>
            
                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>
            
                            <div className="form-outline form-white mb-4">
                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                            <input type="email" id="typeEmailX" className="form-control form-control-lg" name="email" onChange={getEmail}/>
                            </div>
            
                            <div className="form-outline form-white mb-4"><br></br>
                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                            <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" onChange={getPassword}/>
                            
                            </div>
                            <br></br>
                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={onClick}>Login</button>
                        </div>
                        <div>
                            <p className="mb-0">Don't have an account? <a className="text-white-50 fw-bold" onClick={SignUp}>Sign Up</a>
                            </p>
                        </div>

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
    </>)
}


export default Login;