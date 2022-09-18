import React, {useState} from 'react'
import Card from '../../components/card/Card.js'
import './DiaryFavCardContainer.css'
import DiaryFavCardPage from "../../routes/DiaryFavCardPage/DiaryFavCardPage.js"
export default function DiaryFavCardContainer(props) {
	const [card, setCard] = useState(null)
	document.addEventListener('keydown', function(event) {
		if(event.key === "Escape" && !document.querySelector(".fancybox__container")) {
			hideCard()
		}
	});
	
	function generateCard(teaCardObj, e) {
		if(card == null) {
			setCard(<DiaryFavCardPage user={props.user} teaObj={teaCardObj} hideCard={hideCard} />)
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
					<Card generateCard={generateCard} fullCard={<DiaryFavCardPage user={props.user} />} hideCard={hideCard} key={Math.floor(Math.random() * 100000000)} teaObj={item}></Card>
				))}
			</div>
			{card}
		</div>
	)
}