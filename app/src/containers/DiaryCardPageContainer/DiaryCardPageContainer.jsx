import React, {useState, useEffect} from 'react'
import Card from '../../components/card/Card.js'
import './DiaryCardPageContainer.css'
import DiaryCardPage from "../../routes/DiaryCardPage/DiaryCardPage.jsx"
import Tost from '../../components/tost/Tost.js'
import TokenSecond from '../../components/tokens/TokenSecond/TokenSecond.js'
export default function DiaryCardContainer(props) {
	const [card, setCard] = useState(null)
    const [teaList, setTeaList] = useState(props.teaObj)
    const [currentTeasContainerCategory, setCurrentTeasContainerCategory] = useState(props.currentTeasContainerCategory)
    // const [currentTeasContainerCategory, setCurrentTeasContainerCategory] = useState("Попробовал")
    const [toastDeletedMsg, setTostDeletedMsg] = useState(null)
    useEffect(() => {
        setTeaList(props.teaObj)
    }, [])
	document.addEventListener('keydown', function(event) {
        if(event.key === "Escape" && !document.querySelector(".fancybox__container")) {
			hideCard()
		}
	});
	function generateCard(teaCardObj, e) {
		if(card == null) {
			setCard(<DiaryCardPage teaObj={teaCardObj} hideCard={hideCard} deleteCard={deleteCardFromCollection} />)
			let width = window.innerWidth;
			if(width < 915) {
				document.querySelector(".DiaryCardContainer").style.display = "none"
			}
		}
		else if(e.target.classList.contains("diaryCardPage_blur_wrapper")) {
			setCard(null)
			document.querySelector(".DiaryCardContainer").style.display = "grid"
		}
		return card
	}

    let deletedTeaCard;
    function cancelCardDeleting() {
        let teaArr = [...teaList]
        setTeaList(teaArr)
    }
    function deleteCardFromCollection(e) {
        let teaId = e.target.getAttribute("teaid")
        let teaListVar = teaList
        deletedTeaCard = teaListVar.filter(item => item.teaId == +teaId)
        setTeaList(teaList.filter(item => item.teaId !== +teaId));
        setCard(null)
        document.querySelector(`.DiaryCardContainer`).style.display = "grid"
        let tostContainer = document.querySelector(`.${props.containerId} .DiaryCardContainer_toastContainer`)
		setTostDeletedMsg(<Tost>Чай удален из коллекции<br /> «{currentTeasContainerCategory}» в твоем профиле<TokenSecond onClick={cancelCardDeleting} className='DiaryCardContainer_cancelDeletingBtn'>Вернуть</TokenSecond> </Tost>)
		tostContainer.classList.add("active")
		setTimeout(() => {tostContainer.classList.remove("active"); tostContainer.classList.add("unactive")}, 3000)
		setTimeout(() => {setTostDeletedMsg(null); tostContainer.classList.remove("unactive")}, 4000)
    }
	function hideCard() {
		document.querySelector(".DiaryCardContainer").style.display = "grid"
		setCard(null)
	}
    if(props.teaObj) {
            return (
                <div className={`${props.containerId}`}>
                <div className="DiaryCardContainer_toastContainer">
                    {toastDeletedMsg}   
                </div>
                <div className="DiaryCardContainer">
                    {teaList.map(item => (
                        <Card generateCard={generateCard} fullCard={<DiaryCardPage />} hideCard={hideCard} key={Math.floor(Math.random() * 100000000)} teaObj={item}></Card>
                        ))}
                </div>
                {card}
            </div>
        )
    }
}