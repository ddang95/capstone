import { useEffect, useState } from "react"
import ExitButton from "./ExitButton";
import UnitDataService from "../services/unit.service"
import FunctionDataService from "../services/function.service"
import ResourceService from '../services/resource.service';
import plus from '../plus.png';

function AddResource(props) 
{
    const imgStyle = {
        height: '30px',
        width: '30px',
        
    }

    const plusButtonStyle = {
        float: 'right',
        marginRight: '5px',
        padding: '5px',
        height: '45px',
        backgroundColor: 'white',
        border: '1px solid white',
        cursor: 'pointer',
    }

    const nameStyle = {
        display: 'inline-block',
        float: 'right',
        height: '15px',
        width: '75.7%',
        resize: 'none',
        padding: '10px',
        borderRadius: '4px',
        marginRight: '10px',
        border: '1px solid',
    }

    const spanStyle ={
        float: 'right',
        width:' 78.2%',
    }

    const divStyle ={
        marginBottom: '100px',
    }

    const descriptionStyle ={
        display: 'inline-block',
        float: 'right',
        height: '15px',
        width: '75.7%',
        resize: 'none',
        padding: '10px',
        borderRadius: '4px',
        marginRight: '10px',
        border: '1px solid',
    }

    const addStyle ={
        float:' right',
        backgroundColor: 'rgb(0, 136, 255',
        color: 'white',
        borderRadius: '4px',
        border: '2px solid rgb(0, 136, 255)',
        fontSize: '16px',
        padding: '7px 30px',
        marginRight: '10px',
        cursor: 'pointer',
    }

    const capBoxStyle = { 
        height: '15px',
        width: '67.5%',
        resize: 'none',
        padding: '10px',
        borderRadius: '4px',
        marginRight: '10px',
        border: '1px solid',
        float: 'right',
    }

    const distanceStyle ={
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid',
        width: '450px',
    }

    const costStyle ={
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid',
        width: '300px',
        marginRight: '10px',
        marginLeft: '10px',
    }

    const perStyle  = {
        color: 'red',
        marginRight: '10px',
    }

    const formStyle = {
        textAlign: 'left'
    }

    const labelStyle = {
        fontWeight: 'bold',
        marginLeft: '10px'
    }

    const requiredInputStyle = {
        color: 'red',
    }

    const capabilitiesStyle = {
        color: 'green',
        fontWeight: 'bold'
    }

    const saveButtonStyle = {
        backgroundColor: 'rgb(0, 136, 255)',
        color: 'white',
        borderRadius: '4px',
        border: '2px solid rgb(0, 136, 255)',
        fontSize: '16px',
        padding: '5px 30px',
        marginTop: '10px',
        marginLeft: '10px',
        cursor: 'pointer',
    }

    const successStyle = {
        fontWeight: 'bold',
        color: 'green',
        fontSize: '50px',
    }

    const pStyle = {
        marginLeft: '10px',
    }
    
    
    const [displayUnits, setDisplayUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [unitObjects, setUnitObjects] = useState([]);

    const [displayFunctions, setDisplayFunctions] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState("");
    const [funcObjects, setFuncObjects] = useState([]);

    const [selectedSecondFunc, setSelectedSecondFunc] = useState("");
    const [resourceName, setResourceName] = useState("");
    const [description, setDescription] = useState("");
    const [distance, setDistance] = useState(null);
    
    // state to hold single capability to add to capabilities array
    const [capability, setCapability] = useState("");

    const [capabilities, setCapabilities] = useState([]);
    const [cost, setCost] = useState(null);

    const [success, setSuccess] = useState(false);
    const [resourceID, setResourceID] = useState();

    const [newInsert, setNewInsert] = useState({});
    const [searchID, setSearchID] = useState();

    // const [reset, setReset] = useState(false);

    
    useEffect(() => {
        // fetches Units data from database
        UnitDataService.findAllUnits().then((response) =>
            {
                const unitSet = new Set();
                const unitObjectsSet = new Set();
                response.data.map((element, index) => {
                    unitSet.add(element.unit_name);
                    unitObjectsSet.add(element);

                    // setSelectedUnit("");
                    // if (index == 0)
                    // {
                    //     setSelectedUnit(element.unit_name);                   
                    // }
                });
                setDisplayUnits(Array.from(unitSet));
                setUnitObjects(Array.from(unitObjectsSet));
                
            }
        ).catch((e) => console.log("error getting units"))
    
        // fetches functions data from database
        FunctionDataService.findAllFunctions().then((response) => {
            const functionSet = new Set();
            const funcObjectsSet = new Set();
            response.data.map((element, index) => {
                functionSet.add(element.func_name);
                funcObjectsSet.add(element);
                if (index == 0)
                {
                    setSelectedFunction(element.func_name);
                    
                }
            });
                setDisplayFunctions(Array.from(functionSet));
                setFuncObjects(Array.from(funcObjectsSet));
        }
        ).catch((e) => console.log(e));

        setSelectedUnit(displayUnits[0]);
    }, [])


    // units dropdown menu component
    const UnitsDropdown = () => {

        const unitStyle = {
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid',
        }
        const handleChange = (event) => {
            setSelectedUnit(event.target.value);
        }

        return (
            <select style= {unitStyle} onChange={handleChange} value={selectedUnit} required><option></option>
                {displayUnits.map((element) => <option value={element}>{element}</option>)}
            </select>
        )
    }

    // functions dropdown menu component
    const FunctionsDropdown = () => {

        const funcStyle ={
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid',
        }
        const changeSelectedFunc = (event) => {
            setSelectedFunction(event.target.value);          
        }

        return (
            <select style= {funcStyle} onChange={changeSelectedFunc} value={selectedFunction}>
                {displayFunctions.map((element, index) => {
                    return (<option key={index} value={element}>{element}</option>)
                    
                } 
            )}
            </select>
        )
    }

    // secondary functions dropdown component
    const SecondaryFunctionsDropdown = (props) => {

        const formStyle ={
            float: 'right',
            width: '78.2%',
        }
        
        useEffect(() => {           
        }, [selectedFunction]);


        const handleChange = (event) => {
            setSelectedSecondFunc(event.target.value);
        }
        
        return (
            <form style={formStyle}>
            {displayFunctions.map((element, index) => {
                    if (element != props.selectedFunction)
                    {
                        return <><label><input type="radio" value={element} onChange={handleChange}></input>{element}</label><br></br></>
                    }
            })}
            </form>
        )
    }

    
    const handleCapabilities = (e) => {
        e.preventDefault();
        let tempArr = [...capabilities];
        tempArr.push(capability)
        setCapabilities([...tempArr]);
    }

    const Capabilities = () => {

        return (
        <>
        
        {capabilities.length > 0 && 
            <table><tr style={capabilitiesStyle}>Capabilities</tr> 
        { 
            capabilities.map((element, index) => {
                return <tr><td style= {capabilitiesStyle}>{index + 1}. {element}</td></tr>
            }
        )
        }
            </table>}
        </>)
    }
   
    const clearForm = () => {
    setResourceName("");
    setSuccess(false);
    setResourceID(null);
    setDescription("");
    setCapability("");
    setCapabilities([]);
    setDistance(null);
    setCost("");

    // if (reset == false)
    //     setReset(true);
    // else
    //     setReset(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner = localStorage.getItem("username");

        const selectedUnitID = unitObjects.find((o) => o.unit_name == selectedUnit);

        var unitID = selectedUnitID.id;

        const primaryFuncID = funcObjects.find((o) => o.func_name == selectedFunction);

        var secondaryFuncID = null;
        var secFuncNum = null;
        if (selectedSecondFunc != "")
        { 
            secondaryFuncID = funcObjects.find((o) => o.func_name == selectedSecondFunc);
            var secFuncNum = secondaryFuncID.func_num;
        } 


        var capabilitiesStr = "";
        if (capabilities.length > 0)
        {
            capabilities.map((element, index) => {
                if(index == capabilities.length - 1)
                {
                    capabilitiesStr += element    
                }
                else
                {
                    capabilitiesStr += element + ", ";
                }
            })
        }
        else
        {
            capabilitiesStr = "";
        }



        const resource = {
            res_owner: owner,
            res_name : resourceName,
            prim_func_num: primaryFuncID.func_num,
            price: cost,
            unit_id: unitID,
            descript: description,
            distance: distance,
            sec_func_num: secFuncNum,
            capabilities: capabilitiesStr
        }
        // console.log(resource);

       

        ResourceService.insert(resource).then((response) => {
            if (response.data[1] == 1)
            {
                setSuccess(true);
                setResourceID(response.data[0]);
            }
            
            console.log(response)
            ;
        }).catch((e) => {
            setSuccess(false);
            console.log(e);
        });

        // displayData();
    }

    // function displayData() {
    //     console.log("309");

    //     ResourceService.findByID(resourceID).then((response) => {
    //         console.log(response)
    //     }).catch((e) => console.log(e))
    // }


    function clearFormButton() {
        document.getElementById('addResource').reset();
    }

    return (
        <>
            <h1>New Resource Information
                <span>
                    <button style={plusButtonStyle}><img src={plus} style={imgStyle} onClick={clearFormButton}/></button>
                </span>
            </h1>
            

            {success && <><label style={successStyle}>Resource Saved! New Resource ID is {resourceID}</label><br></br><br></br></>}
            
            <form style={formStyle} id="addResource" onSubmit={handleSubmit} onReset={clearForm}>
                <label style={labelStyle}>Resource ID: </label>{success && <label style={capabilitiesStyle}>{resourceID}</label> }
                {/* display resource id generated by the database here */}
                <br></br>
                <label style={pStyle}>(assigned on save)</label>

                {/* <span> */}
                    {/* <button style={plusButtonStyle}><img src={plus} style={imgStyle} type="reset"/></button> */}
                {/* </span> */}
                

                <br></br>
                <br></br>

                <label style={labelStyle}>Resource Name: </label>
                <label style={requiredInputStyle}>*</label>
                <input style={nameStyle} type={"text"} required onChange={(e) => setResourceName(e.target.value)} value={resourceName} />
                <br></br>
                <label style={pStyle}>(required)</label>

                <br></br>
                <br></br>

                <label style={labelStyle}>Primary Function: </label>
                <span style={spanStyle}>
                <FunctionsDropdown />
                </span>
                <br></br>

                <br></br>
                <br></br>
                
                <div style={divStyle}>
                <label style={labelStyle}>Secondary Function: </label>
                <SecondaryFunctionsDropdown selectedFunction = {selectedFunction} />
                </div>

                <br></br>
                <br></br>

                <label style={labelStyle}>Description: </label>
                <input style={descriptionStyle} type={"text"} onChange={(e) => setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label style={pStyle}>(optional)</label>

                
                <br></br>
                <br></br>
                
                
                    <label style={labelStyle}>Capabilities: </label>
                    <button style={addStyle} onClick={handleCapabilities}>Add</button>
                    <input style= {capBoxStyle} type={"text"} onChange={e => setCapability(e.target.value)} value={capability}/>
                    <br></br>
                    <label style={pStyle}>(optional)</label>
                    
               
            
                
                {capabilities.length > 0 && <Capabilities />}

                <br></br>
                <br></br>
                <label style={labelStyle}>Distance from PCC: </label>
                <span style={spanStyle}>
                <input style= {distanceStyle} type="number" step = ".1" min="0.1" max="999" onChange={(e) => setDistance(e.target.value)} value={distance}></input>
                <label> miles</label>
                </span>
                <br></br>
                <label style={pStyle}>(optional)</label>

                <br></br>
                <br></br> 

                <label style={labelStyle}>Cost      </label>
                <span style={spanStyle}>
                <label style={labelStyle}>$</label>
                <label style={requiredInputStyle}>*</label>
                <input style= {costStyle} required type="number" onChange={(e) => setCost(e.target.value)} step = ".01" min="0.01" value={cost}></input>
                
                <label style={labelStyle}>Per      </label>
                <label style={perStyle}>*</label>
                
                <UnitsDropdown/>
                </span>
                <br></br>
                <label style={pStyle}>(required)</label>

                <br></br>
                <br></br>
                <span>
                <button  form="addResource" type="submit" style={saveButtonStyle}>Save</button>
                <ExitButton setOnMainMenu={props.setOnMainMenu} onMainMenu = {props.onMainMenu}/>
                </span>
                <br></br>
            </form>

            
        </>
    );
}

export default AddResource;