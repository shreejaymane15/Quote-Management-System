import { useState } from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddQuotes() {

    var history = useHistory();
    var [author, setAuthor] = useState("");
    var [quote, setQuote] = useState("");
    

    function getauthorname(args){
        setAuthor(args.target.value);
    }

    function getquote(args){
        setQuote(args.target.value);
    }

    function GoToMyQuotes(){
        var user_id = window.sessionStorage.getItem("id");
        var details = {"author": author, "quote": quote, "id":user_id};
        var helper=new XMLHttpRequest();
        helper.onreadystatechange =() => {
          if(helper.readyState == 4 && helper.status == 200){
             history.push('/myquotes');
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open("POST", 'http://127.0.0.1:9999/quote/addquote');
        helper.setRequestHeader("Content-type","application/json")
        helper.send(JSON.stringify(details));
    }

    return (<>
        <NavBar/>
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'top', marginBottom:"5rem"}}>
                <h1>Add Quote</h1>
            </div>
            <div>
                <div className="form-group">
                    <input style={{height:"5rem"}}type="text" className="form-control"  placeholder="Author" onChange={getauthorname} />
                </div><br></br>
                <div className="form-group">
                    <input style={{height:"10rem"}} type="text" className="form-control"  placeholder="Quote here" onChange={getquote} />
                </div>
                <button className="btn btn-primary" style={{paddingLeft:"2rem", paddingRight:"2rem"}} onClick={GoToMyQuotes}>Add</button>
            </div>
        </div>
    </>  );
}

export default AddQuotes;