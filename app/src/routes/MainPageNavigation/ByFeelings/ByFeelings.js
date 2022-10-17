import React, {useState} from 'react'
import TokenDefault from '../../../components/tokens/TokenDefault/TokenDefault.js'
import TokenSecond from '../../../components/tokens/TokenSecond/TokenSecond.js'
import TokenSmallActive from '../../../components/tokens/TokenSmallActive/TokenSmallActive.js'
import {ReactComponent as CloseIcon} from "../../../sources/icons/close-black.svg"
export default function ByFeelings(props) {

	function changeToken(e) {
		console.log(e)
		let unactive_nav_items = document.querySelectorAll(".nav-category-item")
		for(let i = 0; i < unactive_nav_items.length; i++) {
			unactive_nav_items[i].childNodes[0].style.backgroundColor = "transparent"
			unactive_nav_items[i].childNodes[0].style.borderColor = "#fff"
			unactive_nav_items[i].childNodes[0].style.color = "#fff"
			console.log(unactive_nav_items[i])
		}
		e.target.style.backgroundColor = "#E7BB63"
		e.target.style.borderColor = "#E7BB63"
		e.target.style.color = "#000"
	}
	function close_tab(e) {

	}
	return (
		<nav className="navbar category-nav">
			<ul>
				<li className="nav-tea-item nav-close-btn" onClick={props.crossClick}><TokenSmallActive style={{padding: 0}}><CloseIcon style={{transform: "scale(1.2)"}} /></TokenSmallActive></li>
				<li className="nav-tea-item nav-item-name" onClick={close_tab}><TokenDefault style={{padding: 0}}>По ощущениям</TokenDefault></li>
				<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Бодрость</TokenSecond></li>
				<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Отдых</TokenSecond></li>
				<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Вдохновение</TokenSecond></li>
				<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Сон</TokenSecond></li>
				<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Медитация</TokenSecond></li>
				<li className="nav-tea-item nav-category-item" onClick={changeToken}><TokenSecond>Разговоры</TokenSecond></li>
			</ul>
		</nav>
	)
}