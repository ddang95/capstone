import React, {useEffect, useState } from "react";
import IncidentService from "../services/incident.service";
import CategoryService from "../services/category.service";
import plus from '../plus.png';
import ExitButton from "./ExitButton";
import DropdownMenu from "./DropdownMenu";

function NewIncident(props) {

    const imgStyle = {
        height: '30px',
        width: '30px',
    }

    const buttonStyle = {
        float: 'right',
        marginRight: '5px',
        padding: '5px',
        height: '45px',
        backgroundColor: 'white',
        border: '1px solid white',
        cursor: 'pointer',
    }

    const h3Style = {
        marginBottom: '0px',
        fontWeight: 'bold',
        fontSize: '20px',
        marginLeft: '10px'
    }

    const spanStyle = {
        color: 'red',
    }

    const idStyle = {
        fontSize: '25px',
        color: 'green',
        margin: '10px',
        fontWeight: 'bold',
        float: 'center',
    }
    
    const dateStyle = {
        display: 'inline-block',
        float: 'right',
        height: '15px',
        width: '75%',
        resize: 'none',
        padding: '5px',
        borderRadius: '4px',
        marginRight: '10px',
        border: '1px solid',
    }

    const descriptionStyle = {
        display: 'inline-block',
        float: 'right',
        minHeight: '40px',
        minWidth: '75%',
        borderRadius: '4px',
        padding: '5px',
        marginRight: '10px',
        border: '1px solid',
    }

    const saveStyle = {
        float: 'right',
        backgroundColor: '#0088ff',
        color: 'white',
        borderRadius: '4px',
        border: '2px solid #0088ff',
        fontSize: '16px',
        padding: '5px 30px',
        marginRight: '10px',
        cursor: 'pointer',
    }

    const pStyle = {
        marginTop: '0px',
        marginBottom: '30px',
        marginLeft: '10px'
    }

    const initialIncidentState = {
        descript: "",
        inc_date: "",
        cat_id: "",
        cat_type:"",
        inc_owner: "",
    }

    const [incident, setIncident] = useState(initialIncidentState);
    const [save, setSave] = useState(false);
    const [categories, setCategories] = useState([]);
    const [catIds, setCatIds] = useState([]);
    const [catObjects, setCatObjects] = useState([]);
    const [incidentID, setIncidentID] = useState();

    

    useEffect(() => {
        retrieveCategories();
      }, []);

    const handleInputChange = event => {
        let { name, value } = event.target;

        setIncident({ ...incident, [name]: value });
 
    };

    var owner = localStorage.getItem("username");
    
    

    const newIncident = () => {
        setIncident(initialIncidentState);
        setSave(false);
    };

    // IncidentService.insert(incident).then((response) => {
    //     if (response.data[1] == 1)
    //     {
    //         setIncidentID(response.data[0]);
    //     }
        
    //     console.log(response)
    //     ;
    // }).catch((e) => {
    //     console.log(e);
    // });

    const retrieveCategories = () => {
        CategoryService.getCategoryTypes()
            .then(response => {
                const cats = [""];
                const tempCatIds = [];
                const tempCatArray = [];
                response.data.forEach(cat => {
                    cats.push(cat.cat_type);
                    tempCatIds.push(cat.id);
                    tempCatArray.push(cat);
                })
                setCategories(cats);
                setCatIds(tempCatIds);
                setCatObjects(tempCatArray);
                // incident.cat_type = cats[0];
            })
            .catch(e => {
                console.log(e);
            });
    };

    const saveIncident = (event) => {
        event.preventDefault();
        const catId = catObjects.find((object) => object.cat_type == incident.cat_type);
        console.log(incident.cat_type);
        var data = {
            descript: incident.descript,
            inc_date: incident.inc_date,
            cat_id: catId.id,
            inc_owner: owner,
        };
        console.log(data);
       
        IncidentService.create(data)
        .then(response => {
            setIncident ({
                descript: response.data.descript,
                inc_date: response.data.inc_date,
                cat_id: response.data.cat_id,
                inc_owner: response.data.owner,
            });
        setSave(true);
        console.log(response.data);
        setIncidentID(response.data.id)
        document.getElementById('addIncident').reset();
       })
       .catch(e => { 
        console.log(e);
      });
    };

    function clearForm() {
        document.getElementById('addIncident').reset();
        setSave(false);
    }

    const CatDropdown = () => {
        // const handleChange = (event) => {
        //     setSelectedUnit(event.target.value);
        // }

        const catStyle ={
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid',
        }

        const spanStyle = {
            float: 'right',
            width: '76.9%',
        }
        const catLabelStyle = {
            marginBottom: '0px',
            fontWeight: 'bold',
            fontSize: '20px',
            marginLeft: '10px'
        }

        return (
            <>
            <label style={catLabelStyle}>Category: </label> 
            <span style={spanStyle}>
            <select style={catStyle} onChange={handleInputChange} value={incident.cat_type} required label='Category' name='cat_type'>
                {categories.map((element) => <option value={element}>{element}</option>)}
            </select>
            </span>
            </>
        )
    }
    
    return (
        <div>
            <div>
                <h1 style={{marginBottom: '40px'}}>New Incident Information 
                    <span>
                        <button style={buttonStyle}><img src={plus} style={imgStyle} onClick={clearForm}/></button>
                    </span>
                </h1>
            </div>

            <form onSubmit={saveIncident} id ='addIncident'>
                {/*CATEGORY*/}
                {/* <DropdownMenu 
                    label='Category'
                    name='cat_type'
                    options= {categories}
                    handleChange={handleInputChange} /> */}
                    <CatDropdown />
                    

                {/* Incident */}
                <h4 style= {h3Style}>Incident ID</h4 > 
                {save ? <span><p style= {idStyle}>Saved! ID is {incident.cat_id}-{incidentID}</p></span> : <p style={pStyle}>(assigned on save)</p>
                }

                {/* DATE */}
                <div> 
                <label style={h3Style}>Date</label><span style= {spanStyle}>*</span>
                <input 
                    required
                    id="inc_date" 
                    onChange= {handleInputChange} 
                    name="inc_date" 
                    // value={incident.date} 
                    type="date" 
                    // placeholder= 'mm/dd/yyyy' 
                    style= {dateStyle} 
                    
                />
                <p style= {pStyle}>(required)</p>
                </div>

                {/* DESCRIPTION */}
                <div> 
                <label style={h3Style}>Description</label><span style= {spanStyle}>*
                <input 
                required
                id="descript" 
                onChange= {handleInputChange} 
                name="descript" 
                // value={incident.descript}
                type="text" 
                style= {descriptionStyle} 
                
                />
                </span>
                <p style={pStyle}>(required)</p>
                </div>

                <button style= {saveStyle} type="submit">Save</button>

            </form>

            
            <ExitButton setOnMainMenu={props.setOnMainMenu} onMainMenu = {props.onMainMenu}/>

        </div>
    );
};

export default NewIncident;