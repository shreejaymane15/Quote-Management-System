import { useDebugValue, useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function MyQuotes(){

    const [editing, setEditing] = useState({});
    const [quotes,setQuotes] =  useState([]);
    const [quote,setQuote] =  
            useState({id: 0, text : "", author: ""});
    const history = useHistory();
    const ref = useRef(null);

    useEffect(()=>{
        myquotes();
    }, [])

    function myquotes()
    {
        var id ={"id": window.sessionStorage.getItem("id")};
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
          if(helper.readyState == 4 && helper.status == 200){
            var responseReceived = JSON.parse(helper.responseText);
            setQuotes(responseReceived);
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open('POST',`http://127.0.0.1:9999/quote/myquotes/`);
        helper.setRequestHeader("Content-type", "application/json");
        helper.send(JSON.stringify(id));
    }

    function EditQuote(quoteId) {
        setEditing(prevEditing => ({
          ...prevEditing,
          [quoteId]: !prevEditing[quoteId]
        }));
    }      


    function handleEditChange(e, quoteId) {
        const { name, value } = e.target;
        const updatedQuotes = quotes.map((quote) => {
          if (quote.quotes_id === quoteId) {
            return { ...quote, [name]: value };
          }
          return quote;
        });
        setQuotes(updatedQuotes);
      }


    function saveEdit(quoteId) {
        const editedQuote = quotes.find((quote) => quote.quotes_id === quoteId);
        var user_id = window.sessionStorage.getItem("id");
        var details = {"quoteid": quoteId, "quote": editedQuote.text, "author": editedQuote.author, "userid": user_id};
        var helper=new XMLHttpRequest();
        helper.onreadystatechange =() => {
          if(helper.readyState == 4 && helper.status == 200){
             history.push('/myquotes');
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open("POST", 'http://127.0.0.1:9999/quote/updatequote');
        helper.setRequestHeader("Content-type","application/json")
        helper.send(JSON.stringify(details));
        // After successfully saving, toggle the editing state
        EditQuote(quoteId);
    }

    function DeleteQuote(quoteId)
    {
        console.log(quoteId);
        var id = {"id" : quoteId};
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
          if(helper.readyState == 4 && helper.status == 200){
            var responseReceived = JSON.parse(helper.responseText);
            myquotes();
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open('POST',`http://127.0.0.1:9999/quote/deletequote`);
        helper.setRequestHeader("Content-type", "application/json");
        helper.send(JSON.stringify(id));
    }

    function Add(){
        history.push("/addquotes");
    }

    return(<>
            <NavBar></NavBar>
            <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'top'}}>
                <h1>My Quotes</h1>
            </div>
            <div style={{display: 'flex',justifyContent:'end'}}>
                <button className="btn btn-primary" style={{fontSize:"2rem", paddingLeft:"2rem", paddingRight:"2rem" }} onClick={Add}>Add</button>
            </div>
            <div ref={ref} id="MainDiv" style={{padding:"6rem"}}>
    <table className="table table-bordered table-responsive">
        <tbody>
            <tr style={{textAlign:"Center"}}>
                <td><h3>Quote</h3></td>
                <td><h3>Author</h3></td>
            </tr>
                {quotes.map((quote) => (
                <tr key={quote.quotes_id}>
                    <td style={{textAlign: "center"}}>
                    {editing[quote.quotes_id] ? (
                        <textarea
                        name="text"
                        id={quote.quotes_id}
                        style={{
                            border: "0",
                            width: "100%",
                            fontSize: "2.5rem",
                            resize: "none",
                            textAlign: "center"
                        }}
                        value={quote.text}
                        onChange={(e) => handleEditChange(e, quote.quotes_id)}
                        ></textarea>
                    ) : (
                        <h3>{quote.text}</h3>
                    )}
                    </td>
                    <td style={{ textAlign: "Center" }}>
                    {editing[quote.quotes_id] ? (
                        <textarea
                        name="author"
                        id={quote.quotes_id}
                        style={{
                            border: "0",
                            width: "100%",
                            fontSize: "2.5rem",
                            resize: "none",
                            textAlign: "center"
                        }}
                        value={quote.author}
                        onChange={(e) => handleEditChange(e, quote.quotes_id)}
                        ></textarea>
                    ) : (
                        <h3>{quote.author}</h3>
                    )}
                    </td>
                    <td>
                    {editing[quote.quotes_id] ? (
                        <button className="btn btn-success" onClick={() => saveEdit(quote.quotes_id)}>Save</button>
                    ) : (
                        <button className="btn btn-warning" onClick={() => EditQuote(quote.quotes_id)}>Edit</button>
                    )}
                    <button className="btn btn-danger" onClick={() => DeleteQuote(quote.quotes_id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
    </table>
</div>
    </div>
            </>)    
}
export default MyQuotes;