import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile(){

    const [user, setUser] = useState("");
    const [user_id, setUserid] = useState("");
    const [editing, setEditing] = useState({});

    const history = useHistory();
    
    
    useEffect(()=>{
        UserInfo();
        setUserid(window.sessionStorage.getItem("id"));
    }, [])
    


    function UserInfo(){
        var id ={"id": window.sessionStorage.getItem("id")};
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
        if(helper.readyState == 4 && helper.status == 200){
            debugger; 
            var responseReceived = JSON.parse(helper.responseText);
            setUser(responseReceived[0]);
            console.log(user.first_name);
        }
        else{
            console.log("Something went wrong");
        }
        }
        helper.open('POST',`http://127.0.0.1:9999/user/profile/`);
        helper.setRequestHeader("Content-type", "application/json");
        helper.send(JSON.stringify(id));
    }
        
    function editProfile(user_id) {
        setEditing(prevEditing => ({
          ...prevEditing,
          [user_id]: !prevEditing[user_id]
        }));
    }      


    function handleEditChange(e, user_id) {
        setUser(prevUser => ({
          ...prevUser,
          [user_id]: {
            ...prevUser[user_id],
            [e.target.name]: e.target.value
          }
        }));
    }

    function saveProfile(user_id) {
        const editedProfile = user[user_id];
        var details = {
            "user_id": user_id,
            "first_name": editedProfile.first_name,
            "last_name": editedProfile.last_name,
            "mobile": editedProfile.mobile
          };
        var helper=new XMLHttpRequest();
        helper.onreadystatechange =() => {
          if(helper.readyState == 4 && helper.status == 200){
                UserInfo();
          }
          else{
              console.log("Something went wrong");
          }
        }
        helper.open("POST", 'http://127.0.0.1:9999/user/updateprofile');
        helper.setRequestHeader("Content-type","application/json")
        helper.send(JSON.stringify(details));
        // After successfully saving, toggle the editing state
        editProfile(user_id);  
    }


    return(<>
            <NavBar></NavBar>
            <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'top'}}>
                <h1>My Profile</h1>
            </div>
            <div style={{padding:"6rem"}}>{
                <table className="table table-bordered table-responsive">
                <tbody style={{fontSize:"2.5rem", textAlign:"center"}}>
                    <tr>
                        <td>First Name</td>
                    {editing[user_id]?(
                        <td style={{textAlign: "center"}}>
                        <textarea
                            id={user.id}
                            name="first_name"
                            style={{
                                border: "0",
                                width: "100%",
                                fontSize: "2.5rem",
                                resize: "none",
                                textAlign: "center"
                            }}
                            value={user[user_id]?.first_name || ""}
                            onChange={(e) => handleEditChange(e, user_id)}>
                        </textarea></td>
                    ):(
                        <td>{user.first_name}</td>
                    )}
                    </tr>
                    <tr>
                        <td>Last Name</td>
                    {editing[user_id]?(
                        <td style={{textAlign: "center"}}>
                        <textarea
                            id={user.id}
                            name="last_name"
                            style={{
                                border: "0",
                                width: "100%",
                                fontSize: "2.5rem",
                                resize: "none",
                                textAlign: "center"
                            }}
                            value={user[user_id]?.last_name || ""}
                            onChange={(e) => handleEditChange(e, user_id)}>           
                        </textarea></td>
                    ) : (
                        <td>{user.last_name}</td>
                    )}
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Mobile</td>
                    {editing[user_id]?(
                        <td style={{textAlign: "center"}}>
                        <textarea
                            id={user.id}
                            name="mobile"
                            style={{
                                border: "0",
                                width: "100%",
                                fontSize: "2.5rem",
                                resize: "none",
                                textAlign: "center"
                            }}
                            value={user[user_id]?.mobile || ""}
                            onChange={(e) => handleEditChange(e, user_id)}>    
                        </textarea></td>
                    ) : (
                        <td>{user.mobile}</td>
                    )}
                    </tr>
                </tbody>
            </table>
        }
        </div>  
        <div style={{display: 'flex',  justifyContent:"space-evenly", alignItems:'top'}}>
        {editing[user_id]?(
            <button className="btn btn-primary"
                    onClick={()=>{saveProfile(user_id)}}>
                Save
            </button>):(
            <button className="btn btn-warning" 
                    onClick={()=>{editProfile(user_id)}}
                    >
                Edit
            </button>)}
        </div>
        </div>
    </>)
}

export default Profile;