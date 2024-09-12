import Login from './components/Login';
import MainMenu from './components/MainMenu';
import AddResource from './components/AddResource';
import { Link, Route, Routes, BrowserRouter, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import NewIncident from "./components/NewIncident";
import ResourceReport from "./components/ResourceReport";
import Banner from './components/Banner';
import Logout from './components/Logout';
import SearchResource from './components/SearchResource';




function App() {

  const [loggedIn, setLoggedIn]  = useState(false);

  const [onMainMenu, setOnMainMenu] = useState(false);

  const [userData, setUserData] = useState({});

  // useEffect(
  //   () => {},
  //   [loggedIn, onMainMenu]
  // )


  return (
    <>      
      {loggedIn && <Banner userData={userData}/>}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={loggedIn == false ? <Login setLoggedIn={setLoggedIn} setUserData={setUserData}/> : <Navigate to="/MainMenu" />}/>
          <Route path="/MainMenu" element={loggedIn == true ? <MainMenu/> : <Navigate to="/"/>}/>
          <Route path="/AddResource" element={loggedIn == true ? <AddResource/> : <Navigate to="/"/>}/>
          <Route path="/Incident" element={loggedIn == true ? <NewIncident/> : <Navigate to="/"/>}/>
          <Route path="/SearchResource" element={loggedIn == true ? <SearchResource/> : <Navigate to="/"/>}/>
          <Route path="/ResourceReport" element={loggedIn == true ? <ResourceReport/>: <Navigate to="/"/>}/>
          <Route path="*" element={loggedIn == false ? <Navigate to="/"/> : <Navigate to="/MainMenu" />}/>
        </Routes>
      </BrowserRouter>

      {loggedIn && <Logout setLoggedIn={setLoggedIn} />}
    </>
  );
}

export default App;
