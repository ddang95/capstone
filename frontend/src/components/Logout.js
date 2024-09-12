function Logout(props) {

    const logStyle = {
        float: 'left',
        backgroundColor: '#a8a8a8',
        color: 'white',
        borderRadius: '4px',
        border: '2px solid #a8a8a8',
        padding: '5px 30px',
        marginTop: '10px',
        cursor: 'pointer',
    }

    const handleClick = () => {
        props.setLoggedIn(false)
    }
    return (
        <>
            <br></br>
            <button style={logStyle} onClick={handleClick}>Log Out</button>
        </>
    );
}

export default Logout;