import React, {useState, useEffect} from 'react'

import TokenSecond from "../../components/tokens/TokenSecond/TokenSecond.js"
import DiaryCardContainer from '../../containers/DiaryCardPageContainer/DiaryCardPageContainer.jsx'
import DiaryFavCardContainer from '../../containers/DiaryFavCardContainer/DiaryFavCardContainer.js'
import AuthorizationPage from "../АuthorizationPage/АuthorizationPage.js"
import "./ProfilePage.css"

import { ReactComponent as HogIcon } from "../../sources/icons/settings.svg"
import { ReactComponent as AddIcon } from '../../sources/icons/add.svg' 
import { ReactComponent as MainIcon } from '../../sources/icons/main.svg' 
import { ReactComponent as CupYellowIcon } from '../../sources/icons/cupYellow.svg' 
import { ReactComponent as SmileAvatar } from '../../sources/icons/smileAvatar.svg'
import SearchBar from '../../components/searchBars/searchBar/SearchBar.js'
import Adding from '../../components/adding/Adding.js'
import SettingPage from "../SettingsPage/SettingPage.jsx"
import {Link} from "react-router-dom"
export default function ProfilePage(props) {
    if(props?.user) {
        var currentUser = props.user;
        if(currentUser.userName === '' || !currentUser.userName) {
            currentUser.userName = "Чайный гость"
        }
    }
    const [categoryTeasCount, setCategoryTeasCount] = useState(`${currentUser.tastedTeasObj.length} попробовал`)
    const [userTeas, setUserTeas] = useState(null)
    const [tastedTeaContainer, setTastedTeaContainer] = useState(<DiaryCardContainer containerId="tastedTeaContainer" currentTeasContainerCategory='Попробовал' teaObj={currentUser.tastedTeasObj} />)
    const [wantedTeaContainer, setWantedTeaContainer] = useState(<DiaryFavCardContainer containerId="wantedTeaContainer" user={currentUser} currentTeasContainerCategory='Избранное' teaObj={currentUser.wantedTeasObj} />)
    
    const [tasted_option_state, setTasted_option_state] = useState(true)
    const [wanted_option_state, setWanted_option_state] = useState(false)
    var [tastedTeaContainerVar, wantedTeaContainerVar] = [tastedTeaContainer, wantedTeaContainer]
    useEffect(() => {
        if(document.querySelector("#profilePage_teaCategoryInput1:checked")) {
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.backgroundColor = "#E7BB63"
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.borderColor = "#E7BB63"
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.color = "#000"
            document.querySelector(".wantedTeaContainer").classList.add("unactive")
        }
        setUserTeas(tastedTeaContainer)
        
    }, [])
    function changeCategory() {
        if(wanted_option_state === true) {
            setWanted_option_state(false)
            setTasted_option_state(true)
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.backgroundColor = "#E7BB63"
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.borderColor = "#E7BB63"
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.color = "#000"
            document.querySelector("#profilePage_teaCategoryInput2 ~ button").style.backgroundColor = ""
            document.querySelector("#profilePage_teaCategoryInput2 ~ button").style.borderColor = ""
            document.querySelector("#profilePage_teaCategoryInput2 ~ button").style.color = ""
            setCategoryTeasCount(`${currentUser.tastedTeasObj.length} попробовал`)
            document.querySelector(".tastedTeaContainer").classList.remove("unactive")
            document.querySelector(".wantedTeaContainer").classList.add("unactive")
        } else {
            setWanted_option_state(true)
            setTasted_option_state(false)
            document.querySelector("#profilePage_teaCategoryInput2 ~ button").style.backgroundColor = "#E7BB63"
            document.querySelector("#profilePage_teaCategoryInput2 ~ button").style.borderColor = "#E7BB63"
            document.querySelector("#profilePage_teaCategoryInput2 ~ button").style.color = "#000"
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.backgroundColor = ""
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.borderColor = ""
            document.querySelector("#profilePage_teaCategoryInput1 ~ button").style.color = ""
            setCategoryTeasCount(`${currentUser.wantedTeasObj.length} избранное`)
            document.querySelector(".tastedTeaContainer").classList.add("unactive")
            document.querySelector(".wantedTeaContainer").classList.remove("unactive")
            }
        }
        
        function hideAdding() {
            setAddingPage(null)
        }
        
        function collectAddingData() {
            hideAdding()
        }

        const [addingPage, setAddingPage] = useState(null)
        function hideSettings() {
            setSettingPage(null)
        }
        
        function changeUserName(newName) {
            console.log(newName);
            currentUser.userName = newName
            console.log(currentUser)
        }
        
        function changeUserPic(newPic) {
            currentUser.userPicture = newPic
        } 
        const [settingPage, setSettingPage] = useState(null)
    if(currentUser) {
        return (
            <div className='container profilePage_container'>
            {settingPage}
            {addingPage}
            <header className="app-header">
				<h1 className="logo headerTwo-font"><Link to="/">Cha Qi</Link></h1>
				<div className="navigation-section">
                    <div className="searchBar-container"><Link to="/"><SearchBar className="mainpage-searchbar" /></Link></div>
                    <button className="app-header-nav-btn header-nav-btn-add" onClick={() => setAddingPage(<Adding collectAddingData={collectAddingData} hideAdding={hideAdding} />)}> <AddIcon /></button>
                    <button className="app-header-nav-btn header-nav-btn-cup"><Link to="/profile"><CupYellowIcon /></Link></button>
                </div>
			</header>
            <div className="profilePage_profileMainWrapper">
                <div className="profilePage_settings_block">
                    <button className='profilePage_settings_btn_m' onClick={() => setSettingPage(<SettingPage changeUserPic={changeUserPic} changeUserName={changeUserName} user={currentUser} hideSettings={hideSettings} />)}><HogIcon /></button>
                </div>
                <div className="profilePage_userInfo">
                    <div className="profilePage_userAvatar_block">
                        {currentUser?.userPicture ? <img className='profilePage_userImg' src={currentUser.userPicture} alt="Avatar" /> : <SmileAvatar /> }
                    </div>
                    <h1 className="headerTwo-font profilePage_username">{currentUser.userName}</h1>
                    <p className="profilePage_categoryTeasCount_info captionOne-font">{categoryTeasCount}</p>
                    <button className='profilePage_changeProfileBtn captionOne-font' onClick={() => setSettingPage(<SettingPage changeUserPic={changeUserPic} changeUserName={changeUserName} user={currentUser} hideSettings={hideSettings} />)}>Изменить профиль</button>
                </div>
                <div className="profilePage_teaCategoryFilter">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="profilePage_reviewOption">
                            <input readOnly onChange={changeCategory} checked={tasted_option_state} type="radio" className="profilePage_teaCategoryInput" name="profilePage_teaCategoryFilter" id="profilePage_teaCategoryInput1" value="Попробовал" />
                            <TokenSecond><label htmlFor="profilePage_teaCategoryInput1">Попробовал</label></TokenSecond>
                        </div>
                        <div className="profilePage_reviewOption">
                            <input readOnly onChange={changeCategory} checked={wanted_option_state} type="radio" className="profilePage_teaCategoryInput" name="profilePage_teaCategoryFilter" id="profilePage_teaCategoryInput2" value="Избранное" />
                            <TokenSecond><label htmlFor="profilePage_teaCategoryInput2"><label htmlFor="profilePage_teaCategoryInput2" style={{fontSize: "28px", cursor: "pointer", margin: "0px", marginBottom: "1.5px"}}>♡</label> Избранное</label></TokenSecond>
                        </div>
                    </form>
                </div>
                {tastedTeaContainer}
                {wantedTeaContainer}
            </div>
            <nav className="main-nav">
                <ul>
                    <li className="main-nav-item"><Link to="/"><MainIcon /></Link></li>
                    <li className="main-nav-item" onClick={() => setAddingPage(<Adding collectAddingData={collectAddingData} hideAdding={hideAdding} />)}><AddIcon/></li> {/*onClick={() => setAddingPage(<Adding hideAdding={hideAdding} />)}*/}
                    <li className="main-nav-item"><Link to="/profile"><CupYellowIcon /></Link></li>
                </ul>
            </nav>
            </div>
        )
    }
    else {
        return <AuthorizationPage loginText="Чтобы увидеть свою коллекцию"></AuthorizationPage>
    }
}

    // else {
        //     return (
            //         <div className='container profilePage_container'>
            //             <header className="app-header">
            // 				<h1 className="logo headerTwo-font"><Link to="/">Cha Qi</Link></h1>
            // 				<div className="navigation-section">
            //                     <div className="searchBar-container"><Link to="/"><SearchBar className="mainpage-searchbar" /></Link></div>
            //                     <button className="app-header-nav-btn header-nav-btn-add"> <AddIcon /></button> {/*onClick={() => setAddingPage(<Adding hideAdding={hideAdding} />)} */}
            //                     <button className="app-header-nav-btn header-nav-btn-cup"><Link to="/profile"><CupYellowIcon /></Link></button>
            //                 </div>
            // 			</header>
    //             <div className="profilePage_profileMainWrapper">
    //                 <div className="profilePage_settings_block">
    //                     <button className='profilePage_settings_btn_m'><HogIcon /></button>
    //                 </div>
    //                 <div className="profilePage_userInfo">
    //                     <div className="profilePage_userAvatar_block">
    //                         <SmileAvatar />
    //                     </div>
    //                     <h1 className="headerTwo-font profilePage_username">Чайный гость</h1>
    //                     <p className="profilePage_categoryTeasCount_info captionOne-font">0 попробовал</p>
    //                 </div>
    //                 <div className="profilePage_teaCategoryFilter">
    //                     <form onSubmit={(e) => e.preventDefault()}>
    //                         <div className="profilePage_reviewOption">
    //                             <input readOnly onChange={changeCategory} checked={tasted_option_state} type="radio" className="profilePage_teaCategoryInput" name="profilePage_teaCategoryFilter" id="profilePage_teaCategoryInput1" value="Попробовал" />
    //                             <TokenSecond><label htmlFor="profilePage_teaCategoryInput1">Попробовал</label></TokenSecond>
    //                         </div>
    //                         <div className="profilePage_reviewOption">
    //                             <input readOnly onChange={changeCategory} checked={wanted_option_state} type="radio" className="profilePage_teaCategoryInput" name="profilePage_teaCategoryFilter" id="profilePage_teaCategoryInput2" value="Хочу" />
    //                             <TokenSecond><label htmlFor="profilePage_teaCategoryInput2">Хочу</label></TokenSecond>
    //                         </div>
    //                     </form>
    //                 </div>
    //                 <p className='not_authorized_empty_paragraph captionOne-font' style={{color: "#fff", textAlign: "center", marginTop: 140}}>В коллекции еще нет чаев</p>
    //             </div>
    //             <nav className="main-nav">
    //                 <ul>
    //                     <li className="main-nav-item"><Link to="/"><MainIcon /></Link></li>
    //                     <li className="main-nav-item"><AddIcon/></li> {/*onClick={() => setAddingPage(<Adding hideAdding={hideAdding} />)}*/}
    //                     <li className="main-nav-item"><Link to="/profile"><CupYellowIcon /></Link></li>
    //                 </ul>
    //             </nav>
    //         </div>
    //     )
    // }
