import NavBar from "./NavBar";
import "../css/Home.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Home(){

    const [quotes,setQuotes] =  useState([]);
    const [quote,setQuote] =  
            useState({id: 0, text : "", author: ""});
    const history = useHistory();
    useEffect(()=>{
        allquotes();
    }, [])

    function allquotes()
    {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
          if(helper.readyState == 4 && helper.status == 200){
            debugger; 
            var responseReceived = JSON.parse(helper.responseText);
            setQuotes(responseReceived);
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open('GET',"http://127.0.0.1:9999/quote");
        helper.send();
    }

    var all =()=>{
        history.push("/home");
    }
    
    var fav =()=>{
        history.push("/fav");
    }

    function LikeQuote(quoteId){
        var id = window.sessionStorage.getItem("id");
        var details = {"quoteid" : quoteId, "userid": id};
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
          if(helper.readyState == 4 && helper.status == 200){
            var responseReceived = JSON.parse(helper.responseText);
            allquotes();
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open('POST',`http://127.0.0.1:9999/quote/likequote`);
        helper.setRequestHeader("Content-type", "application/json");
        helper.send(JSON.stringify(details));
        

    }

    debugger;
    return(<>
        <NavBar></NavBar>
        <div className="container">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'top'}}>
            <h1>Quotes Around The World</h1>
        </div>  
        <div style={{display: 'flex',justifyContent:'end'}}>
            <a onClick={all}><h2>All</h2></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a onClick={fav}><h2>Favorites</h2></a>
        </div>
         <div style={{padding:"6rem"}}>{
             <table className="table table-bordered table-responsive">
                <tbody>
                    <tr style={{textAlign:"Center"}}>
                        <td><h3>Quote</h3></td>
                        <td><h3>Author</h3></td>
                    </tr>
            { quotes.map((quote)=>{
                return <tr key={quote.id} style={{textAlign:"Center"}}>
                    <td><h3>{quote.text}</h3></td>
                    <td style={{textAlign:"Center"}}><h3>{quote.author}</h3></td>
                    <td>
                    <button  className="btn btn-primary" onClick={()=>{
                        LikeQuote(quote.quotes_id)
                    }}>Like</button>
                    </td>
                </tr>
            })
        }
        </tbody>
            </table>
        }
        </div>
        </div>
    </>)
}

export default Home;