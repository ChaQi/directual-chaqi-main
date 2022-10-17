import React, {useState} from 'react'
import BtnDefault from "../buttons/BtnDefault/BtnDefault.js"
import BtnAction from "../buttons/BtnAction/BtnAction.js"
import CardPage from "../../routes/CardPage/CardPage.js"
import "./RandomTeaItem.css"
export default function RandomTeaItem(props) {
	const [cardPage, setCardPage] = useState(null)
	function hideCard() {
		setCardPage(null)
	}
	document.addEventListener('keydown', function(event) {
		if(event.key === "Escape" && !document.querySelector(".fancybox__container")) {
			hideCard()
		}
	});
	return (
		<div className="container randomTeaItem_container">
			<div className="randomTeaItem">
				<div className="randomTeaItem_teaShape">
					<img className="randomTeaItem_teaImg" src={props.teaObj.teaImgPath} alt="132" />
				</div>
				<h1 className="randomTeaItem_tea_name_headline headerOne-font">{props.teaObj.teaName}</h1>
				<div className="randomTeaItem_showCard_btn"><BtnDefault onClick={() => setCardPage(<CardPage teaObj={props.teaObj} hideCard={hideCard} />)}>Посмотреть все о чае</BtnDefault></div>
				<div onClick={props.reloadRandomTea} className="randomTeaItem_reloadTea_btn"><BtnAction>Обновить</BtnAction></div>
			</div>
			{cardPage}
		</div>
	)
}