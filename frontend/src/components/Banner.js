import { useState } from "react";
import CimtDataService from "../services/cimt.service"
import ResourceProviderDataService from "../services/resourceProvider.service"
import AdminDataService from "../services/admin.service"

function Banner(props) {

    const buttonStyle = {
        backgroundColor: 'grey',
        color: 'white',
        float: 'right',
        fontSize: '30px',
    }


    const borderStyle = {
        borderBottomStyle: 'solid',
        borderWidth: '1px',
    }

    const username = props.userData.username;

    const [displayName, setDisplayName] = useState(props.userData.display_name);
    const [info, setInfo] = useState("");

    function displayInfo()
    {
        switch (props.userData.user_role) {
            case "cimt":
                const result = CimtDataService.findByUsernameCimt(username);

                result.then((response) => {
                    const responseResult = response.data[0]; 
                    const phone_num = responseResult.phone_num;
                    const formattedPhoneNum = phone_num.slice(0,3) + "-" + phone_num.slice(3,6) + " " + phone_num.slice(6);
                    setInfo(formattedPhoneNum);
                }).catch(() => {
                    alert("Can't find CIMT");
                });                
                break;
            

                case "rp":
                const resultRp = ResourceProviderDataService.findByUsernameRp(username);

                resultRp.then((response) => {
                    const responseResult = response.data[0]; 
                    const strtAddr = responseResult.strt_addr;
                    setInfo(strtAddr);
                }).catch(() => {
                    alert("Can't find Resource Provider");
                });                
                break;

                case "admin":
                const resultAdmin = AdminDataService.findByUsernameAdmin(username);

                resultAdmin.then((response) => {
                    const responseResult = response.data[0]; 
                    const email = responseResult.email;
                    setInfo(email);
                }).catch(() => {
                    alert("Can't find Admin");
                });                
                break;

        }

        return [displayName, info];
        
    }

    return (
        <>
            <h1>CIMT<span style={{float: 'right', textAlign:'right'}}>{displayInfo()[0]}<br></br>{displayInfo()[1]}</span></h1>
            <br></br>
            <h1 style={borderStyle}> </h1>
        </>
    );
}

export default Banner;