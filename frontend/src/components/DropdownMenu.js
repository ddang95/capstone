import React from 'react';

function DropdownMenu (props) {

    const spanStyle = {
        float: 'right',
        width:' 78.2%',
    }
    const labelStyle ={
        marginBottom: '0px',
        fontWeight: 'bold',
        fontSize: '20px',
        marginLeft: '10px'
    }

    const selectStyle= {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid',
        width: '300px',
        marginRight: '10px',
        marginLeft: '10px',
    }
    return(
        <div>
            <label style= {labelStyle} for ={props.name}> {props.label} </label> 
            <span style={spanStyle}>
            <select style= {selectStyle} id = {props.name} name = {props.name} onChange={props.handleChange}>
                {props.options.map(option => (
                    <option value ={option}>{option}</option>
                ))}
            </select>
            </span>
        </div>
    )    
}

export default DropdownMenu;