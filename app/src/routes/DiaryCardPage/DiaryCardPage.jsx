import React, {useState, useEffect} from 'react'
import {ReactComponent as ArrowLeftWhiteIcon} from "../../sources/icons/arrowLeftWhite.svg"
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"
import Fancybox from '../../customs/imageViewer/imageViewer'
import "./DiaryCardPage.css"

import ReviewsContainer from '../../containers/ReviewsContainer/ReviewsContainer.js'

import TokenSmall from "../../components/tokens/TokenSmall/TokenSmall.js"
// import TokenSecond from "../../components/tokens/TokenSecond/TokenSecond.js"
// import TokenAction from "../../components/tokens/TokenAction/TokenAction.js"
// import TokenDefault from "../../components/tokens/TokenDefault/TokenDefault.js"
import BtnSecond from "../../components/buttons/BtnSecond/BtnSecond.js"
import BtnDefault from "../../components/buttons/BtnDefault/BtnDefault.js"
import Tost from "../../components/tost/Tost.js"
import Adding from '../../components/adding/Adding'
import { nanoid } from 'nanoid'
import CardPage from "../../routes/CardPage/CardPage"
export default function DiaryCardPage(props) {
    console.log(props.teaObj.reviewPictures.split(","))
    let teaObj = props.teaObj
	// event listener for reveal
	function scrollPos(e) {
		document.querySelector(".diaryCardPage_blur_wrapper").addEventListener('scroll', reveal);
		e.stopPropagation()
	}
	// function for reveal items by scroll
	function reveal() {
		let reveals = document.querySelectorAll('.reveal');
		for(let i = 0; i < reveals.length; i++) {
            if(document.querySelector(".diaryCardPage_blur_wrapper")) {
                if(document.querySelector(".diaryCardPage_blur_wrapper").scrollTop > 240){
                    reveals[i].classList.add('active');
                }
                else{
                    reveals[i].classList.remove('active');
                }
            }
		}
	}

    function setRatingEvents() {
        let rating_leaflets = document.querySelectorAll(".diaryCardPage_rating_leaflet");
        rating_leaflets.forEach(item => item.addEventListener("click", updateRating));
        rating_leaflets.forEach(item => item.addEventListener("touch", updateRating))
        for(let i = 0; i < teaObj.userTeaRate; i++) {
            rating_leaflets[i].style.backgroundColor = "#E7BB63"
        }
    }
        function updateRating(e) {
        let rating_leaflets = document.querySelectorAll(".diaryCardPage_rating_leaflet");
            rating_leaflets.forEach(item => item.style.backgroundColor = "#58585C");
            for(let i = 0; rating_leaflets[i-1] != e.target; i++) {
                rating_leaflets[i].style.backgroundColor = "#E7BB63";
            }
    }
    function collectAddingData(info) {
        teaObj.teaTags = info.tasteDescriptors
        teaObj.userReviewText = info.reviewText
        teaObj.reviewPictures = info.teaPhotos
        teaObj.userTeaRate = info.teaRate
        setRatingEvents()
        setTastedAdding(null)
    }
    function hideAdding() {
        setTastedAdding(null)
    }
	const [outputTost, setOutputTost] = useState(null)
    const [tastedAdding, setTastedAdding] = useState(null)
    // setTastedAdding(<Adding currentStep="step_two" collectAddingData={collectAddingData} hideAdding={hideAdding} />)
    const [fullCard, setFullCard] = useState(null)
    function showFullCard() {
        setFullCard(<CardPage teaObj={props.teaObj.parentTea}></CardPage>)
        // props.hideCard()
        document.querySelector(".diaryCardPage_fullcard").style.zIndex = 1000000
        document.querySelector(".diaryCardPage_fullcard").style.position = "absolute"
        document.querySelector(".diaryCardPage_fullcard").style.width = "100vw"
        document.querySelector(".diaryCardPage_fullcard").style.height = "100vh"
    }
	return (
		<div className="diaryCardPage_blur_wrapper" onLoad={scrollPos}>	
            <div className='diaryCardPage_fullcard'>{fullCard}</div>
			{tastedAdding}
			<div className="diaryCardPage_container" onLoad={setRatingEvents}>
				<div className="diaryCardPage_outputTost_container">{outputTost}</div>
				<div className="close_btn_block">
					<button onClick={props.hideCard} className="diaryCardPage_arrow_close_btn"><ArrowLeftWhiteIcon className="diaryCardPage_ArrowLeftWhite" /></button>
					<button onClick={props.hideCard} className="diaryCardPage_x_close_btn"><CloseIcon className="diaryCardPage_CloseIcon" /></button>
					<h2 className="diaryCardPage_scrolling_header reveal buttonOne-font">{teaObj.teaName}</h2>
				</div>
				<div className="diaryCardPage_teaPicture_block"><div className="diaryCardPage_teaPicture_shape"><img draggable="false" src={teaObj.teaImg} alt="tea img" /></div></div>
                <p className='diaryCardPage_userReviewDate_info '>{teaObj.addingDate} в {teaObj.addingTime}</p>
				<h1 className="diaryCardPage_tea_name headerOne-font">{teaObj.teaName}</h1>
				<div className="diaryCardPage_rating_section">
					<div className="diaryCardPage_rating_block">
						<div className="diaryCardPage_rating_leaflet" />
						<div className="diaryCardPage_rating_leaflet" />
						<div className="diaryCardPage_rating_leaflet" />
						<div className="diaryCardPage_rating_leaflet" />
						<div className="diaryCardPage_rating_leaflet" />
					</div>
				</div>
				<div className="diaryCardPage_tea_tags">
					{teaObj.teaTags.map(item => (<TokenSmall key={nanoid()} className="diaryCardPage_tea_tag">{item}</TokenSmall>))}
				</div>
                <div className="tea_info">
						<p className="tea_notation captionOne-font">{teaObj.teaReview}</p>
				</div>
                <div className='diaryCardPage_userPhotos_block'>
					{props.teaObj.reviewPictures ? props.teaObj.reviewPictures.split(",").map(item => <Fancybox key={nanoid()} options={{ infinite: false }}><img data-src={item} data-fancybox="gallery" draggable="false" className="user-review-img" src={item} alt="img" /></Fancybox>) : "" }
                    
                </div>
                <div className="diaryCardPage_button_container">
                    <BtnSecond onClick={() => setTastedAdding(<Adding currentStep="step_two" collectAddingData={collectAddingData} hideAdding={hideAdding} />)}>Редактировать</BtnSecond>
                    <BtnSecond teaid={teaObj.id} onClick={props.deleteCard}>Удалить</BtnSecond>
                    <BtnDefault onClick={() => showFullCard()}>Посмотреть все о чае</BtnDefault>
                </div>
			</div>
		</div>
	)
}
