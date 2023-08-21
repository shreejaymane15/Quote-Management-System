import React, { useEffect, useState } from 'react';
import {Route} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import Login from './Login';



function ProtectedRoute(props){
    const [isValidToken, setIsValidToken] = useState(false);

    var history = useHistory();
    useEffect(() => {
      var token = window.sessionStorage.getItem("Token");
      var id = window.sessionStorage.getItem("id");
      var details = {'token': token, 'id': id};
      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () =>{
          if(helper.readyState === 4 &&
              helper.status === 200){
                  var responseReceived = helper.responseText;
                  if(responseReceived === "true") {
                      setIsValidToken(true);
                    } else {
                      setIsValidToken(false);
                      history.push('/');
                    }
              }   
      }
      helper.open('POST', 'http://127.0.0.1:9999/login/validate');
      helper.setRequestHeader('Content-Type', 'application/JSON');
      helper.send(JSON.stringify(details));
    }, []);

    return isValidToken ? (
        <Route exact path={props.path} component={props.component} />
      ) : null;
    

}

export default ProtectedRoute;