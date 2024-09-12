import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import AddResource from "./AddResource";
import ExitButton from "./ExitButton";
import NewIncident from "./NewIncident";
import ResourceReport from "./ResourceReport";

function MainMenu(props) 
{
    const menuStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const divStyle = {
        alignItems: 'center',
        textAlign:'center',
    }

    return (
        <>
            
                <>
                    <h2 style={menuStyle}>Main Menu</h2>
                    <div style={divStyle}>
                        <Link to="/AddResource">Add Available Resource</Link>
                        <br></br>
                        <Link to="/Incident">Add New Incident</Link>
                        <br></br>
                        <Link to="/SearchResource">Search Resources</Link>
                        <br></br>
                        <Link to="/ResourceReport">Generate Resource Report</Link>
                        <br></br>   
                    </div>
                </>
            
        </>
    );
}

export default MainMenu;