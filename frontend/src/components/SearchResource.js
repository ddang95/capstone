import React, {useEffect, useState} from 'react';
import DropdownMenu from './DropdownMenu'
import ResourceService from '../services/resource.service';
import ResourceResults from './ResourceResults';
import FunctionDataService from '../services/function.service';
import ExitButton from './ExitButton';
import plus from '../plus.png';

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

function SearchResource(props) {    

    const labelStyle = {
        marginBottom: '0px',
        fontWeight: 'bold',
        fontSize: '20px',
        marginLeft: '10px',
    }

    const spanStyle = {
        float: 'right',
        width:' 78.2%',
    }

    const inputStyle ={
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid',
        width: '300px',
        marginRight: '10px',
        marginLeft: '10px',
    }

    const searchButton ={
        display: 'inline-flex',
        justifyContent: 'space-around',
        backgroundColor: '#0088ff',
        color: 'white',
        borderRadius: '4px',
        border: '2px solid #0088ff',
        fontSize: '16px',
        padding: '5px 30px',
        marginLeft: '10px',
        cursor: 'pointer',
    }

    const pStyle ={
        marginLeft: '10px',
        marginTop: '5px',
        marginBottom: '20px'
    }

    const[formValue, setFormValue] = useState({
        keyword: '',
        primFunc: '',
        distance: '',
    });
    const[funcOpts, setFuncOpts] = useState([]);
    const[showResults, setShowResults] = useState(false);
    const[results, setResults] = useState([]);

    useEffect(()=> {
        getFunctions();
    },[]);

    //Retrieves list of functions from db
    function getFunctions () {
        FunctionDataService.getAllFuncs()
            .then(response => {
                const functions = ['']
                response.data.forEach(func => {
                    functions.push(`${func.func_num}-${func.func_name}`);                    
                });
                setFuncOpts(functions);
            })
            .catch (e => {
                console.log(e);
            });
    };

    function handleChange(e) {
        let {name, value} = e.target;
        if (name == 'primFunc') {
            value = value.charAt(0);
        }
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]:value,
            };
        });
    };

    /*Collects form inputs, builds SQL statement, then renders resource results*/
    function handleSubmit(e){
        e.preventDefault();
        let data = {}
        if (formValue.keyword !== '') {
            data.keyword = formValue.keyword;
        } 
        if(formValue.primFunc !== '') {
            data.primFunc = formValue.primFunc;
        }
        if(formValue.distance !== ''){
            data.distance = formValue.distance;
        } 
        
        ResourceService.findResource(data)
            .then(response => {
                console.log(response.data);
                setResults(response.data);
                setShowResults(true);
            })
            .catch(e => {
                console.warn(e);
            });
    }

    function clearForm() {
        document.getElementById('search').reset();
    }

    return (    
        <div>
        <h1>Search Resources
            <span>
                <button style={buttonStyle}><img src={plus} style={imgStyle} onClick={clearForm}/></button>
            </span>
        </h1>
        <form id= 'search' action ='' method = 'get' onSubmit = {handleSubmit}>
            <label style= {labelStyle} for = 'keyword'>Keyword </label>
            <span style= {spanStyle} >
            <input style= {inputStyle} type = 'text' id = 'keyword' name = 'keyword' onChange={handleChange}></input> <br></br>
            </span>
            <p style={pStyle}>(optional)</p>
            <DropdownMenu
                label='Primary Function'
                name = 'primFunc'
                options={funcOpts}
                handleChange={handleChange}/>
            <p style={pStyle}>(optional)</p>
            <label style= {labelStyle} for = 'distance'>Distance </label>
            <span style= {spanStyle}>
            <input style= {inputStyle} type = 'text' id = 'distance' name = 'distance' onChange={handleChange}></input><br></br>
            </span>
            <p style={pStyle}>(optional)</p>
        </form>

        <button style= {searchButton} type='submit' form='search' >Search</button> 
        { showResults && <ResourceResults results={results}/>}
        <ExitButton setOnMainMenu={props.setOnMainMenu} onMainMenu={props.onMainMenu} /> 
        </div>  
          
    );
}

export default SearchResource;