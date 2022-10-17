import React, {useState, useEffect} from 'react'

import './index.css';
import "./fonts/fonts.css"

import {ReactComponent as AddIcon} from "./sources/icons/add.svg"
import {ReactComponent as CupIcon} from "./sources/icons/cup.svg"
import {ReactComponent as MainIcon} from "./sources/icons/main.svg"
import {ReactComponent as MainYellowIcon} from "./sources/icons/mainYellow.svg"

import MainPage from "./routes/MainPage/MainPage.js"
import CardPage from "./routes/CardPage/CardPage.js"
import ProfilePage from "./routes/ProfilePage/ProfilePage.jsx"
import АuthorizationPage from "./routes/АuthorizationPage/АuthorizationPage.js"

import SearchBar from "./components/searchBars/searchBar/SearchBar.js"
import Loader from "./components/loader/Loader"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import DiaryCardPage from './routes/DiaryCardPage/DiaryCardPage';
import LoginPageTesting from './routes/LoginPageTesting/LoginPageTesting';
import PostTest from "./routes/PostTest/PostTest"
import Directual from 'directual-api';
import { useAuth } from './auth';
import LoginPage from './routes/LoginPage/LoginPage';

function App() {
  const api = new Directual({appID: "f486a45f-2546-4f15-9c4e-1cdb98762ed3"})
  const auth = useAuth();
  const [user, setUser] = useState(null)
  
  const [preloader, setPreloader] = useState(null)
  function showPreloader() {
    setPreloader(<Loader />)
    setTimeout(() => {
      document.querySelector(".main_loader_container").classList.add("unactive")
      document.querySelector(".app-wrapper").classList.remove("unactive")
    }, 2000)
    setTimeout(() => {
      setPreloader(null)
    }, 3500)
  }
  useEffect(() => {
		localStorage.clear()
    showPreloader()

  }, [])
  
  
  
  
  
  
  //...
  const dataStructure = 'WebUser' // todo: insert here Sysname of your data structure
  const endpoint = 'create_user' // todo: insert here Method name of your API-endpoint
  //...
  // Auth context:
  // auth.user // returns user ID
  // auth.sessionID // returns user session ID
  // auth.isAutorised() // returns true if user is authorised
  // auth.hasRole('role') // returns true if user.role == 'role' (see user management further)
  //...
  function createUser(username, email, password) {
    let payload = {} // Request payload
    api
    // Name of Data structure (table) in the Database
    .structure(dataStructure)
    // POST request + payload + query params
    .setData(endpoint, {id: email, firstName: username, password: password})
    .then((response) => {
      // handling response
      auth.login(email, password)
    })
    .catch((e) => {
      // handling errors
      console.error("!!!!!!!!!!!!!!!!!!!" + e)
    })
  }
  
  function getUser(email, password) {
      auth.login(email, password)
      .then((res) => {
        api
        // Name of Data structure (table) in the Database
        .structure(dataStructure)
        // POST request + payload + query params
        .getData(endpoint, {email: email})
        .then((response) => {
          // handling response
          setUser(response.payload[0])
          console.log(response.payload[0])
        })
        .catch((err) => {
          // handling errors
          console.error("!!!!!!!!!!!!!!!!!!!" + err)
        })
        
      })
      .catch(err => {
        console.error("!!!!!!!!!!!!!!!!!!!" + err)
      })
  }









  const [focusVar, setFocusVar] = useState(false)
  document.addEventListener('keydown', function(event) {
    if(event.key === "Escape") {
      setAuthorizationBlock(null)
    }
  });

  // 
  
  // hideFunctions
  let hideAuth = () => setAuthorizationBlock(null);
  let hideLogin = () => setAuthorizationBlock(null);
  function changeValidationPage(page) {
    if(page === "authpage") {
      setAuthorizationBlock(<LoginPage getUser={getUser} hideLogin={hideLogin} changeValidationPage={changeValidationPage} />)
    }
    else if(page === "loginpage") {
      setAuthorizationBlock(<АuthorizationPage createUser={createUser} hideAuth={hideAuth} changeValidationPage={changeValidationPage} />)
    }
  }
  
  // authBlock
  const [authorizationBlock, setAuthorizationBlock] = useState(<АuthorizationPage createUser={createUser} hideAuth={hideAuth} changeValidationPage={changeValidationPage} />)
  function revealAuth() {
    setAuthorizationBlock(<АuthorizationPage createUser={createUser} hideAuth={hideAuth} changeValidationPage={changeValidationPage} />)
  }

  return (
    <div className="app app-container">
      {!auth.isAuthorized ? authorizationBlock : ""}
      {preloader}
      <div className="app-wrapper unactive">
        <Router>
          <Routes>
              <Route path="/" element={<MainPage user={user} isFocused={focusVar} revealAuth={revealAuth}/>} />
              <Route path="/add" element={<h1 style={{color: "#fff", fontSize: "5vmin", position: "absolute", top: "50%", transform: "translateY: -50%"}} className="headerOne-font">Page in progress</h1>} />
              {user !== null ? <Route path="/profile" element={<ProfilePage auth={auth} user={user} />} /> : <Route path="/" element={<MainPage user={user} isFocused={focusVar} revealAuth={revealAuth}/>} />}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App