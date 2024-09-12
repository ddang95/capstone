import ExitButton from "./ExitButton";
import { useState, useEffect } from "react";
import ResourceService from '../services/resource.service';
import FunctionDataService from '../services/function.service';

function ResourceReport(props) {
    const body = {
        textAlign: 'center',
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
        float: "middle",
        marginBottom: '20px'
    }

    const topRow = {
        padding: '20px',
        backgroundColor: "#EEEEEE",
        border: "1px solid #EEEEEE",
        height: '50px',
    }

    const info = {
        float: 'right',
        fontFamily: "Times New Roman",
        fontWeight: "bold",
        fontSize: '40px',
        marginRight: '10px',
    }

    const trStyle = {
        border: "1px solid #EEEEEE",
        height: '50px',
    }

    const [resources, setResources] = useState([]);
    const [totalResources, setTotalResource] = useState(0);
    const [allFunctions, setAllFunctions] = useState([]);

    useEffect(() => {
        if (resources.length == 0)
        {
            getFunctions();
            findOwnersResources();
        }
        // function resolveFunc() {
        //     return new Promise(resolve => {
        //         console.log("GET FUNCTION")
        //         resolve(getFunctions());
        //     })
        // }
        // async function fetchOwnerResources() {
        //     console.log("WAIT RESOLVE")
        //     const x = await resolveFunc();
        //     if (x) {
        //         console.log(x);
        //         console.log("FIND OWNER RES")
        //         findOwnersResources();
        //     }

        // }
        // fetchOwnerResources();

        //getFunctions().then(findOwnersResources);
    }, [resources]);

    var curr_user = localStorage.getItem("username");

    //Sets resources with all functions in DB
    function getFunctions() {
        FunctionDataService.getAllFuncs()
            .then(response => {
                const rows = [];
                response.data.forEach(row => {
                    let rowObj = {
                        func_num: row.func_num,
                        func_name: row.func_name,
                    }
                    rows.push(rowObj);
                });
                setAllFunctions(rows);
            })
            .catch(e => {
                console.log(e);                
            });
    };

    //Sets the counts of resources owned by user
    const findOwnersResources = () => {
        ResourceService.findOwnersResources(curr_user)
            .then(response => {
                let totalCount = 0;
                const ownerResources = [];
                response.data.forEach(row => {
                    let rowObj = {
                        func_num: row.prim_func_num,
                        count: row.count,
                    }
                    totalCount += row.count;
                    ownerResources.push(rowObj);
                    // console.log(rowObj);
                })
                setTotalResource(totalCount);
                makeTable(ownerResources);


                //setResources((prevState) => {
                // console.log(`this is prev prev ${prevState}`)

                // ownerResources.forEach(ownerResRow => {
                //     let foundMatch = prevState.find((obj) => {
                //         return obj.func_num === ownerResRow.func_num;
                //     })
                //     console.log(`foundMatch Before ${foundMatch.count}`);
                //     foundMatch.count = ownerResRow.count;
                //     console.log(`foundMatch After ${foundMatch}`);
                // prevState.map(obj => {
                //     console.log(obj);
                // ownerResources.forEach(row => {
                //     if (obj.func_num = row.func_num) {
                //         obj.count = row.count
                //     }
                // })
                //});
            })
            .catch(e => {
                console.log(e);
            });
    }

    const makeTable = (ownerResources) => {
        console.log('in make Table')
        console.log(ownerResources);
        let resourceCounts = [];
        console.log(allFunctions);
        allFunctions.forEach(func => {
            console.log(func);
            let foundMatch = ownerResources.find((match) => {
                return match.func_num === func.func_num;
            })
            let counted = 0
            if(foundMatch) {
                counted = foundMatch.count;
            }
            let rowObj = {
                func_num: func.func_num,
                func_name: func.func_name,
                count: counted
            }
            console.log(rowObj);          
            resourceCounts.push(rowObj);
        })
        setResources(resourceCounts);
    }

    return (
        <div style={body}>
            <h1 style={borderStyle}>Resource Report<span style={info}>i</span></h1>

            <table style={tableStyle}>
                <thead>
                    <tr style={topRow}>
                        <th>Primary Function #</th>
                        <th>Primary Function</th>
                        <th>Total Resources</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map(result => {
                        return [
                            <tr style={trStyle}>
                                <td>{result.func_num}</td>
                                <td>{result.func_name}</td>
                                <td>{result.count}</td>
                            </tr>
                        ]
                    })}
                    <tr style={topRow}>
                        <td></td>
                        <td>Total</td>
                        <td>{totalResources}</td>
                    </tr>
                </tbody>
            </table>

            <ExitButton setOnMainMenu={props.setOnMainMenu} onMainMenu={props.onMainMenu} />

        </div>


    );
}

export default ResourceReport;