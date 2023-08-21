import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

function Fav() {

    const history = useHistory();
    var [quotes, setQuotes] = useState([]);
    const [quote,setQuote] =  
    useState({id: 0, text : "", author: ""});
    
    useEffect(()=>{
        favquotes();
    }, [])

    
    var all =()=>{
        history.push("/home");
    }
    
    var fav =()=>{
        history.push("/fav");
    }

    var unFavQuote = (quoteId)=>{
        var id = window.sessionStorage.getItem("id");
        var details = {"userid": id , "quoteid" : quoteId};
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () =>{
            if(helper.readyState == 4 && helper.status == 200){
                favquotes();
            }
            else{
                console.log("Something is Wrong");
            }
        }
        helper.open('POST',`http://127.0.0.1:9999/quote/unfavquote`);
        helper.setRequestHeader("Content-type", "application/json");
        helper.send(JSON.stringify(details));
    }


    function favquotes(){
        var id = window.sessionStorage.getItem("id");
        var details = {"userid":id}
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
          if(helper.readyState == 4 && helper.status == 200){
            var responseReceived = JSON.parse(helper.responseText);
            setQuotes(responseReceived);
          }
          else{
              console.log("Something is wrong");
          }
        }
        helper.open('POST',`http://127.0.0.1:9999/quote/favquote`);
        helper.setRequestHeader("Content-type", "application/json");
        helper.send(JSON.stringify(details));
    }


    return (<>
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
                        debugger;
                        unFavQuote(quote.quotes_id)
                    }}>UnLike</button>
                    </td>
                </tr>
            })
        }
        </tbody>
            </table>
        }
        </div>
    </div>
    </>);
}

export default Fav;