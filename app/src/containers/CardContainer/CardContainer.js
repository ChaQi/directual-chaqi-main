import React, {useState} from 'react'
import Card from '../../components/card/Card.js'
import './CardContainer.css'
import CardPage from "../../routes/CardPage/CardPage.js"

import { useAuth } from '../../auth'
import Directual from 'directual-api';

export default function CardContainer(props) {
	const [card, setCard] = useState(null)
	// console.log(props.user)
	document.addEventListener('keydown', function(event) {
		if(event.key === "Escape" && !document.querySelector(".fancybox__container")) {
			hideCard()
		}
	});
	
	function generateCard(teaCardObj, e) {
		if(card == null) {
			// localStorage.setItem(teaCardObj.teaName, JSON.stringify(teaCardObj));
			setCard(<CardPage addCollectionTea={props.addCollectionTea} addFavouriteTea={props.addFavouriteTea} user={props.user} teaObj={teaCardObj} hideCard={hideCard} />)
			let width = window.innerWidth;
			if(width < 915) {
				document.querySelector(".CardContainer").style.display = "none"
			}
		}
		else if(e.target.classList.contains("cardPage_blur_wrapper")) {
			setCard(null)
			document.querySelector(".CardContainer").style.display = "grid"
		}
		return card
	}

	function hideCard() {
		document.querySelector(".CardContainer").style.display = "grid"
		setCard(null)
	}
	return (
		<div className={props.containerId ? props.containerId : ""}>
			<div className="CardContainer">
				{props.teaObj.map(item => (
					<Card generateCard={generateCard} fullCard={<CardPage user={props.user} />} hideCard={hideCard} key={Math.floor(Math.random() * 100000000)} teaObj={item}></Card>
				))}
			</div>
			{card}
		</div>
	)
}