import ExitButton from "./ExitButton";

const body = {
    textAlign:'center',
    float: "middle",
    width: '100%',
    margin: '40px auto'    
}
const borderStyle = {
    borderWidth: '1px',
}

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
}

const topRow = {
    padding: '20px',
    backgroundColor: "#EEEEEE",
    border: "1px solid #EEEEEE",
    height: '50px',
}

const trStyle = {
    border: "1px solid #EEEEEE",
    height: '50px',
}

function ResourceResults(props) {
    return (
        <div style={body}>
            <h1 style={borderStyle}>Results</h1>
            <table style={tableStyle}>
                <tr style={topRow}>
                    <th>Resource ID</th>
                    <th>Resource Name</th>
                    <th>Owner</th>
                    <th>Cost/Unit</th>
                    <th>Distance</th>
                </tr>
                {props.results.map(result => {
                    return[
                        <tr style={trStyle}>
                            <td>{result.id}</td>
                            <td>{result.res_name}</td>
                            <td>{result.res_owner}</td>
                            <td>{result.price}/{result.unit}</td>
                            <td>{result.distance}</td>
                        </tr>
                    ]
                })}
            </table>
        </div>

        
    );
}

export default ResourceResults;