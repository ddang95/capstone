import { useNavigate } from "react-router-dom";


function ExitButton(props) {

    const buttonStyle = {
        float: 'right',
        backgroundColor: '#727472',
        color: 'white',
        borderRadius: '4px',
        border: '2px solid #727472',
        fontSize: '16px',
        padding: '5px 30px',
        marginRight: '10px',
        cursor: 'pointer',
    }

    const navigate = useNavigate();

    const backToMainMenu = () => {
        localStorage.setItem("onMainMenu", true);
        // props.setOnMainMenu(true);
        navigate('/MainMenu');
    }

    return (
        <button style={buttonStyle} onClick={backToMainMenu}>Main Menu</button>
    );
}

export default ExitButton;