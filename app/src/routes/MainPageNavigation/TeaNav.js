import React, {useState} from 'react'

import TokenDefault from '../../components/tokens/TokenDefault/TokenDefault.js'
import TokenSecond from '../../components/tokens/TokenSecond/TokenSecond.js'
import TokenSmallActive from '../../components/tokens/TokenSmallActive/TokenSmallActive.js'
import "./TeaNav.css"
import {ReactComponent as CloseIcon} from "../../sources/icons/close-black.svg"
export default function TeaNav(props) {
	let currentTeaVal;
	const [currentTea, setCurrentTea] = useState(currentTeaVal)
	function changeToken(e) {
		let unactive_nav_items = document.querySelectorAll(".nav-category-item")
		for(let i = 0; i < unactive_nav_items.length; i++) {
			unactive_nav_items[i].childNodes[0].style.backgroundColor = "transparent"
			unactive_nav_items[i].childNodes[0].style.borderColor = "#fff"
			unactive_nav_items[i].childNodes[0].style.color = "#fff"
		}
		if(!e.target.classList.contains("nav-tea-item")) {
			currentTeaVal = props.dataChange(e.target.innerHTML)
			e.target.style.backgroundColor = "#E7BB63"
			e.target.style.borderColor = "#E7BB63"
			e.target.style.color = "#000"
		}
	}
	function findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el;
	}
	function hideMain() {
		let main = document.querySelector(".main-navbar")
		main.classList.remove("active")
		main.classList.add("unactive")
	}
	function close_tab(e) {
		let main = document.querySelector(".main-navbar")
		let ancestorNav = findAncestor(e.target, "tea-navbar")
		ancestorNav.classList.remove("active")
		ancestorNav.classList.add("unactive")
		main.classList.add("active")
		main.classList.remove("unactive")
		currentTeaVal = props.dataChange("Для тебя")
		let unactive_nav_items = document.querySelectorAll(".nav-category-item")
		for(let i = 0; i < unactive_nav_items.length; i++) {
			unactive_nav_items[i].childNodes[0].style.backgroundColor = "transparent"
			unactive_nav_items[i].childNodes[0].style.borderColor = "#fff"
			unactive_nav_items[i].childNodes[0].style.color = "#fff"
		}
	}

	function switchByView(e) {
		currentTeaVal = props.dataChange(e.target.innerHTML)
		let currentTab = document.querySelector(".byView-navbar")
		currentTab.classList.add("active")
		currentTab.classList.remove("unactive")
		hideMain()

	}
	function switchByFeelings(e) {
		currentTeaVal = props.dataChange(e.target.innerHTML)
		let currentTab = document.querySelector(".byFeelings-navbar")
		currentTab.classList.add("active")
		currentTab.classList.remove("unactive")
		hideMain()
	}
	function switchRandomTea(e) {
		currentTeaVal = props.dataChange(e.target.innerHTML)
		let currentTab = document.querySelector(".randomTea-navbar")
		currentTab.classList.add("active")
		currentTab.classList.remove("unactive")
		hideMain()
	}
	return (
		<div className="navigation-container">
			<nav className="tea-navbar main-navbar active">
				<ul>
					<li className="nav-tea-item"><TokenDefault>Для тебя</TokenDefault></li>
					<li className="nav-tea-item" onClick={switchByView}><TokenSecond>По виду</TokenSecond></li>
					<li className="nav-tea-item" onClick={switchByFeelings}><TokenSecond >По ощущениям</TokenSecond></li>
					<li className="nav-tea-item" onClick={switchRandomTea}><TokenSecond>Случайный чай</TokenSecond></li>
				</ul>
			</nav>
			<nav className="tea-navbar byView-navbar unactive">
				<ul>
					<li className="nav-tea-item nav-close-btn" onClick={close_tab}><TokenSmallActive><CloseIcon /></TokenSmallActive></li>
					<li className="nav-tea-item nav-item-name" onClick={changeToken}><TokenDefault>По виду</TokenDefault></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Пуэр</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Улун</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Зеленый</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Белый</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Красный</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Желтый</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Хей ча</TokenSecond></li>
				</ul>
			</nav>
			<nav className="tea-navbar byFeelings-navbar unactive">
				<ul>
					<li className="nav-tea-item nav-close-btn" onClick={close_tab}><TokenSmallActive><CloseIcon /></TokenSmallActive></li>
					<li className="nav-tea-item nav-item-name" onClick={changeToken}><TokenDefault>По ощущениям</TokenDefault></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Бодрость</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Отдых</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Вдохновение</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Сон</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Медитация</TokenSecond></li>
					<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Разговоры</TokenSecond></li>
				</ul>
			</nav>
			<nav className="tea-navbar randomTea-navbar unactive">
				<ul>
					<li className="nav-tea-item nav-close-btn" onClick={close_tab}><div onClick={props.hide_random}><TokenSmallActive><CloseIcon /></TokenSmallActive></div></li>
					<li className="nav-tea-item nav-item-name" onClick={changeToken}><TokenDefault>Случайный чай</TokenDefault></li>

				</ul>
			</nav>
		</div>

	)
}