import { useEffect, useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import MainMenu from "./MainMenu";
import UserDataService from "../services/user.service"

function Login(props) 
{
    // css style for submit button
    const buttonStyle = {
        backgroundColor: '#2986CC',
        color: 'white',
    }

    const formStyle = {
        textAlign: 'center'
    }

    const bannerStyle = {
        textAlign: 'center',
        borderStyle: 'solid',
        paddingTop: '20px',
        backgroundColor: '#EEEEEE',
    }

    const errorMessageStyle = {
        color: 'red',
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        
        const result = UserDataService.findByUsername(username);
        var userData = {};  

        result.then((response) => {
            userData = response.data[0]; 
            // console.log(userData);
            if (password != userData.pass)
            {
                alert("Wrong Password!");
            }
            else
            {
                localStorage.setItem("onMainMenu", "true");
                props.setLoggedIn(true);
                props.setUserData(userData);
            }
        }).catch(() => {
            alert("Wrong Username!");
        });
    }

    return (
        
        <>
            
            <div style={bannerStyle}>
                <h1>Welcome to the CERT Incident Management Tool (CIMT)</h1>
                <p>The CIMT is an online web application that manages available resources and their assignments to various emergency incidents that may have already occured, are happening or may happen in the future in and around the Pasadena City College campus. Emergency incidents may include, but are not limited to, hazardous waste spills, acts of terrorism, nuclear incident, campus shooting, car crashes with fatalities, flooding, fire, etc.</p>
            </div>
            
            <form style={formStyle} id="login" onSubmit={handleSubmit}>
                <label><h1>Login</h1></label>

                <label>Username</label><br></br>
                
                <input onChange={e => setUsername(e.target.value)}></input><br></br>
                
                <label>Password</label><br></br>
                
                <input type='password' onChange={e => setPassword(e.target.value)}></input><br></br>
                
                <button type="submit" style={buttonStyle}>Submit</button>

               
            </form>
            
        </>
        
    );
}

export default Login;