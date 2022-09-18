import React, {useState, useEffect} from 'react'
import "./MainPage.css"
import {ReactComponent as AddIcon} from "../../sources/icons/add.svg"
import {ReactComponent as CupIcon} from "../../sources/icons/cup.svg"
import {ReactComponent as MainYellowIcon} from "../../sources/icons/mainYellow.svg"
import { teaHistory, teaFound, exampleTea } from './dataSimulation'
import SearchBar from "../../components/searchBars/searchBar/SearchBar.js"
import BtnAction from "../../components/buttons/BtnAction/BtnAction.js"
import TeaNav from "../../routes/MainPageNavigation/TeaNav.js"
import CardContainer from "../../containers/CardContainer/CardContainer.js"
import RandomTeaItem from "../../components/RandomTeaItem/RandomTeaItem.js"
import Adding from "../../components/adding/Adding.js"
import { useAuth } from '../../auth'
import Directual from 'directual-api';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link
} from "react-router-dom";

const MainPage = (props) => {
	let api = new Directual({ apiHost: '/' })
	let auth = useAuth();

	// Hooks for handling state
	const [response, setResponse] = useState(); // API response
	const [status, setStatus] = useState(); // Request status
	const [badRequest, setBadRequest] = useState(); // API error message
	const [loading, setLoading] = useState(false); // Loader
	const [showForm, setShowForm] = useState(true); // Show/hide the form
	const [formPayload, setFormPayload] = useState(); // Data to send. Here we can add userID: auth.user by default
	  
	// Reset the form
	const resetForm = () => {
		setResponse()
		setStatus()
		setBadRequest()
		setShowForm(true)
		setFormPayload() // Don't forget to include userID: auth.user, if needed
	}

	async function getTeas(params) {
		setLoading(true)
		setShowForm(false)
		let dataStructure = "tea"
		let endpoint = "get_mainpage_teas"
		if(!params) {
			params = {pageSize: 100, any: true}
		}
		api
			// Data structure
			.structure(dataStructure)
			// POST request + payload + query params:
			.getData(endpoint, params
			)
			.then((response) => {
				setResponse(response.result)
				setStatus(response.status)
				setLoading(false)
				console.warn(response)
				setResponse(response.payload)
				setTeaList(response.payload)
				setSafeTeaList(response.payload)
			})
			.catch((e) => {
				// handling errors
				setLoading(false)
				console.log(e.response)
				setBadRequest({
					httpCode: e.response.status,
					msg: e.response.data.msg
				})
			})
			return response
	}

	async function searchTeas(params) {
		setLoading(true)
		setShowForm(false)
		let dataStructure = "tea"
		let endpoint = "get_mainpage_teas"
		if(!params) {
			params = {pageSize: 100, any: true}
		}
		api
			// Data structure
			.structure(dataStructure)
			// POST request + payload + query params:
			.getData(endpoint, params
			)
			.then((response) => {
				setResponse(response.result)
				setStatus(response.status)
				setLoading(false)
				console.warn(response)
				setResponse(response.payload)
				setTeaList(response.payload)
			})
			.catch((e) => {
				// handling errors
				setLoading(false)
				console.log(e.response)
				setBadRequest({
					httpCode: e.response.status,
					msg: e.response.data.msg
				})
			})
			return response
	}

	// STATES AND VARS
	let currentCategoryVar = "Для тебя";
	const [teaList, setTeaList] = useState([])
	const [safeTeaList, setSafeTeaList] = useState([])
	const [currentContainerTeas, setCurrentContainerTeas] = useState("") // <CardContainer user={props.user} teaObj={teaList} />
	const [currentCategory, setCurrentCategory] = useState(currentCategoryVar)

	
	// EFFECTS
	useEffect(() => {
		if(currentCategory == "Случайный чай") {
			setCurrentContainerTeas(<RandomTeaItem reloadRandomTea={reloadRandomTea} teaObj={randomTea} />)
			setCurrentCategory(null)
		}
	}, [currentCategory])
	useEffect(() => {
		getTeas()
		console.log(searchInputValue)
	}, [])
	useEffect(() => {
		setCurrentContainerTeas(setCardCont());
		console.log(teaList)
	}, [teaList]);


	// RANDOM TEA CODE
	let randomTea = teaList[Math.floor(Math.random() * (teaList?.length - 1))]
	function reloadRandomTea() {
		randomTea = teaList[Math.floor(Math.random() * (teaList.length - 1))]
		setCurrentContainerTeas(<RandomTeaItem reloadRandomTea={reloadRandomTea} teaObj={randomTea} />)
	}
	function setCardCont() {
		return <CardContainer user={props.user} teaObj={teaList} />
	}
	
	
	// NAVIGATION LOGIC
	const [currentCategoryDebugger, setCurrentCategoryDebugger] = useState("Для тебя")
	function changeData(e) {
		e = e.replaceAll(/\&nbsp;/g, ' ');
		setCurrentCategoryDebugger(e)
		setCurrentCategory(e)
		if(e.toLowerCase() !== "по виду" && e.toLowerCase() !== "для тебя" && e.toLowerCase() !== "по ощущениям" && e.toLowerCase() !== "случайный чай") {
			setCurrentContainerTeas(<CardContainer user={props.user} teaObj={teaList.filter(item => item.teaCategory.includes(e.toLowerCase()))} />)
		}
		if(e.toLowerCase().split(" ").join("") === "для тебя") {
			setCurrentContainerTeas(<CardContainer user={props.user} teaObj={teaList} />)
		}
		return currentCategory
	}
	
	function hide_random() {
		setCurrentCategory(currentCategoryVar)
		setCurrentContainerTeas(<CardContainer user={props.user} teaObj={teaList} />)
	}
	
	// SEARCH & HISTORY CODE
	let inputVal = ''
	const [searchInputValue, setSearchInputValue] = useState(inputVal)
	async function showRelevants(e) {
		e.preventDefault(); 
		document.querySelector(".mainpage-navigation-container").classList.remove("active")
		document.querySelector(".mainpage-navigation-container").classList.add("unactive")
		if(window.innerWidth > 915) {
			document.querySelector(".mainpage").style.marginTop = "150px"
		}
		document.querySelector(".resetBtn").classList.remove("unactive")
		document.querySelector(".resetBtn").classList.add("active")
		searchTeas({teaName: searchInputValue, pageSize: 100}).then(response => {
			console.log(searchInputValue)
			if(response) {

				setCurrentContainerTeas(<CardContainer user={props.user} teaObj={response} />)
				setCurrentCategory("Найдено")
			}

		})
	}
	function showHistory() {
		setCurrentContainerTeas(<CardContainer user={props.user} teaObj={teaHistory} />)
		setCurrentCategory("История")
		if(window.innerWidth > 915) {
			document.querySelector(".mainpage").style.marginTop = "150px"
		}
		try {
			document.querySelector(".resetBtn").classList.add("active")
			document.querySelector(".resetBtn").classList.remove("unactive")
			document.querySelector(".mainpage-navigation-container").classList.remove("active")
			document.querySelector(".mainpage-navigation-container").classList.add("unactive")
		} catch(error) {
			console.error("!_!_!_!_!",  error)
		}
	}

	function hideHistory() {
		if(window.innerWidth > 915) {
			document.querySelector(".mainpage").style.marginTop = "0"
		}
		setCurrentContainerTeas(<CardContainer user={props.user} teaObj={safeTeaList} />)
		console.log(safeTeaList)
		try {
			document.querySelector(".mainpage-navigation-container").classList.remove("unactive")
			document.querySelector(".mainpage-navigation-container").classList.add("active")
			document.querySelector(".mainpage-navigation-container").style.display = "flex"
			document.querySelector(".mainpage-navigation-container").classList.remove("unactive")
			document.querySelector(".mainpage-navigation-container").classList.add("active")
			document.querySelector(".resetBtn").classList.remove("active")
			document.querySelector(".resetBtn").classList.add("unactive")
		} catch (error) {
			console.error("!_!_!_!_!",  error)
		}
		setCurrentCategory(currentCategoryDebugger)
	}
	function collectAddingData() {
		hideAdding()
	}
	// function desktopSearch () {
	// 	return (<div className="navigation-section">
	// 				<div onClick={setSearchBar} className="searchBar-container"><SearchBar value={searchInputValue} onChange={e => setSearchInputValue(e.target.value)} onBlur={e => {showRelevants(e); console.log(searchInputValue)}} onSubmit={showRelevants} onFocus={showHistory} className="mainpage-searchbar" /></div>
	// 				<button className="app-header-nav-btn header-nav-btn-add" onClick={() => setAddingPage(<Adding collectAddingData={collectAddingData} hideAdding={hideAdding} />)}> <AddIcon /></button>
	// 				<button className="app-header-nav-btn header-nav-btn-cup"><Link to="/profile"><CupIcon /></Link></button>
	// 			</div>)
		
	// }

	function mobileSearch() {
		return (
			<div className="navigation-section-mobile">
					<div className="mobile-form-container">
						<div onClick={() => setNavigationBlock(mobileSearch())} className="searchBar-container"><SearchBar onSubmit={showRelevants} onFocus={showHistory} className="mainpage-searchbar" /></div>
						<BtnAction onClick={() => {hideSearchBar()}}>Отмена</BtnAction>
					</div>
					<hr className="mainPage-mobile-segregator" />
			</div>
		)
	}

	const [navigationBlock, setNavigationBlock] = useState(
		<div className="navigation-section">
					<div onClick={setSearchBar} className="searchBar-container"><SearchBar value={searchInputValue} onChange={e => setSearchInputValue(e.target.value)} onBlur={e => {showRelevants(e); console.log(searchInputValue)}} onSubmit={showRelevants} onFocus={showHistory} className="mainpage-searchbar" /></div>
					<button className="app-header-nav-btn header-nav-btn-add" onClick={() => setAddingPage(<Adding collectAddingData={collectAddingData} hideAdding={hideAdding} />)}> <AddIcon /></button>
					<button className="app-header-nav-btn header-nav-btn-cup"><Link to="/profile"><CupIcon /></Link></button>
				</div>
	)
	function setSearchBar() {
		let width = window.innerWidth;
		let mainpage_navigation_container = document.querySelector(".mainpage-navigation-container")
		if(width <= 915) {
			mainpage_navigation_container.classList.add("unactive")
			mainpage_navigation_container.classList.remove("active")
			mainpage_navigation_container.style.display = "none"
			setNavigationBlock(mobileSearch())
		}
	}
	function hideSearchBar() {
		let mainpage_navigation_container = document.querySelector(".mainpage-navigation-container")
			if(mainpage_navigation_container) {
				mainpage_navigation_container.classList.add("active")
				mainpage_navigation_container.classList.remove("unactive")
				mainpage_navigation_container.style.display = "block"
				setCurrentContainerTeas(<CardContainer user={props.user} teaObj={teaList} />)
		}

	}
	// ADDING CODE
	const [addingPage, setAddingPage] = useState(null)
	function hideAdding() {
		setAddingPage(null)
	}

	// RETURNING CODE
	return (
		<div className="page mainpage" onClick={() => console.log(searchInputValue)}>
				<header className="app-header">
					<h1 className="logo headerTwo-font"><Link to="/">Cha Qi</Link></h1>
					<div className="navigation-section">
		 				<div onClick={setSearchBar} className="searchBar-container"><SearchBar value={searchInputValue} onChange={e => setSearchInputValue(e.target.value)} onSubmit={showRelevants} onFocus={showHistory} className="mainpage-searchbar" /></div>
		 				<button className="app-header-nav-btn header-nav-btn-add" onClick={() => setAddingPage(<Adding collectAddingData={collectAddingData} hideAdding={hideAdding} />)}> <AddIcon /></button>
		 				<button className="app-header-nav-btn header-nav-btn-cup"><Link to="/profile"><CupIcon /></Link></button>
 					</div>
				</header>
				<div className="mainpage-navigation-container"><TeaNav hide_random={hide_random} dataChange={changeData}></TeaNav></div>
				<div className="category-data-container">
					<h1 className="nav-category-header headerTwo-font">{currentCategory}</h1>
					<div className="resetBtn unactive"><BtnAction onClick={hideHistory}>Сбросить</BtnAction></div>
				</div>
				{currentContainerTeas}
			{addingPage}
			<nav className="main-nav">
				<ul>
					<li className="main-nav-item"><Link to="/"><MainYellowIcon /></Link></li>
					<li className="main-nav-item" onClick={() => setAddingPage(<Adding collectAddingData={collectAddingData} hideAdding={hideAdding} />)}><AddIcon/></li>
					<li className="main-nav-item"><Link to="/profile"><CupIcon /></Link></li>
				</ul>
          	</nav>
		</div>
	)
}

export default MainPage