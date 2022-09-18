import React, {useState, useEffect} from 'react'
import {ReactComponent as ArrowLeftWhiteIcon} from "../../sources/icons/arrowLeftWhite.svg"
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"

import "./CardPage.css"

import ReviewsContainer from '../../containers/ReviewsContainer/ReviewsContainer.js'

import TokenSmall from "../../components/tokens/TokenSmall/TokenSmall.js"
import TokenSecond from "../../components/tokens/TokenSecond/TokenSecond.js"
import TokenAction from "../../components/tokens/TokenAction/TokenAction.js"
import TokenDefault from "../../components/tokens/TokenDefault/TokenDefault.js"
import Tost from "../../components/tost/Tost.js"
import Adding from "../../components/adding/Adding.js"

import { nanoid } from 'nanoid'
import { SubscriptionAlert } from '../SubscriptionAlertPage/SubscriptionAlert'
import { WelcomeSubAlert } from '../WelcomeSubAlert/WelcomeSubAlert'

export default function CardPage(props) {
	// event listener for reveal
	console.log(props.user)
	function scrollPos(e) {
		document.querySelector(".cardPage_blur_wrapper").addEventListener('scroll', reveal);
		e.stopPropagation()
	}
	// function for reveal items by scroll
	function reveal() {
		let reveals = document.querySelectorAll('.reveal');
		for(let i = 0; i < reveals.length; i++) {
			if(document.querySelector(".cardPage_blur_wrapper").scrollTop > 240){
				reveals[i].classList.add('active');
			}
			else{
				reveals[i].classList.remove('active');
			}
		}
	}
	// Changing card height by switching tabs
	function changeCardHeight() {
		let width = window.innerWidth;
		if(width > 915) {
			if(document.querySelector('#tab_reviews').checked === true) {
				document.querySelector(".cardPage_container").style.height = '1024px'
			}
			else if(document.querySelector('#tab_reviews').checked === false) {
				document.querySelector(".cardPage_container").style.height = '824px'
			}
		}
	}


	// ADDING FOOTER LOGIC 
	function changeChoice(e) {
		if(e.target.id === "adding_review_filter_checkbox_id_cardPage_1" && e.target.checked) {
			tastedTea()
		}
		else if(e.target.id === "adding_review_filter_checkbox_id_cardPage_2" && e.target.checked) {
			wantedTea()
		}
	}



	function MainReviewForm() {
		return (
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="review-option">
					<input onChange={changeChoice} className="review-filter-checkbox" type="radio" id="adding_review_filter_checkbox_id_cardPage_1" name="review-filter-checkbox" value="Попробовал" />
					<TokenSecond><label className="review-filter-button button-tasted buttonOne-font" htmlFor="adding_review_filter_checkbox_id_cardPage_1">Попробовал</label></TokenSecond>
				</div>
				<div className="review-option">
					<input onChange={changeChoice} className="review-filter-checkbox" type="radio" id="adding_review_filter_checkbox_id_cardPage_2" name="review-filter-checkbox" value="Избранное" />
					<TokenSecond><label className="review-filter-button button-wanted buttonOne-font" htmlFor="adding_review_filter_checkbox_id_cardPage_2"><span className='cardPage_heart_span'>♡</span> Избранное</label></TokenSecond>
				</div>
			</form>
		)
	}
	function TastedTeaForm() {
		return (
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="review-option">
					<input className="review-filter-checkbox" type="radio" id="adding_review_filter_checkbox_id_cardPage_1" name="review-filter-checkbox" value="Попробовал" />
					<TokenDefault><label className="review-filter-button button-tasted buttonOne-font" htmlFor="adding_review_filter_checkbox_id_cardPage_1" style={{color: "#000"}}>Попробовал</label></TokenDefault>
				</div>
				<div className="review-option">
					<TokenAction><p className="review-filter-button button-cancel buttonOne-font" onClick={resetAdding}>Отменить</p></TokenAction>
				</div>
			</form>
		)
	}
	function WantedTeaForm() {
		return (
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="review-option" style={{marginRight: 12}}>
					<input className="review-filter-checkbox" type="radio" id="adding_review_filter_checkbox_id_cardPage_2" name="review-filter-checkbox" value="Избранное" />
					<TokenDefault><label className="review-filter-button button-tasted buttonOne-font" htmlFor="adding_review_filter_checkbox_id_cardPage_2" style={{color: "#000"}}><span className='cardPage_heart_span'>♡</span> Избранное</label></TokenDefault>
				</div>
				<div className="review-option">
					<TokenAction><p className="review-filter-button button-cancel buttonOne-font" onClick={resetAdding}>Отменить</p></TokenAction>
				</div>
			</form>
		)
	}

	// const [isAdded, setIsAdded] = useState(false);
	const [addedBox, setAddedBox] = useState(<MainReviewForm />)
	const [subscriptionAlert, setSubscriptionAlert] = useState(null)
	function hideSubAlert() {
		setSubscriptionAlert(null)
	}

	function tastedTea() {
		if(props?.user.addedFirstTea === false) {
			props.user.addedFirstTea = true;
			setSubscriptionAlert(<WelcomeSubAlert  hideSubAlert={hideSubAlert}/>)
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_1").checked = false
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_2").checked = false
		}
		else if(!props?.user.isPremium && props?.user.tastedTeasObj.length + props?.user.wantedTeasObj.length >= 10) {
			setSubscriptionAlert(<SubscriptionAlert hideSubAlert={hideSubAlert} />)
			setAddedBox(<MainReviewForm />)
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_1").checked = false
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_2").checked = false
		}
		else {
			setAddedBox(<TastedTeaForm />)
			setTastedAdding(<Adding currentStep="step_two" collectAddingData={collectAddingData} hideAdding={hideAdding} />)
		}
	}
	function wantedTea() {
		if(props?.user.addedFirstTea === false) {
			props.user.addedFirstTea = true;
			setSubscriptionAlert(<WelcomeSubAlert  hideSubAlert={hideSubAlert}/>)
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_1").checked = false
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_2").checked = false
		}
		else if(!props?.user.isPremium && props?.user.tastedTeasObj.length + props?.user.wantedTeasObj.length >= 10) {
			setSubscriptionAlert(<SubscriptionAlert hideSubAlert={hideSubAlert} />)
			setAddedBox(<MainReviewForm />)
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_1").checked = false
			document.querySelector("#adding_review_filter_checkbox_id_cardPage_2").checked = false
		}
		else {
			setAddedBox(<WantedTeaForm />)
			let tostContainer = document.querySelector(".cardPage_outputTost_container")
			setOutputTost(<Tost>Чай добавлен в коллекцию «♡ Избранное» в твоем профиле</Tost>)
			tostContainer.classList.add("active")
			setTimeout(() => {tostContainer.classList.remove("active"); tostContainer.classList.add("unactive")}, 3000)
			setTimeout(() => {setOutputTost(null); tostContainer.classList.remove("unactive")}, 4000)
		}

	}
	const [outputTost, setOutputTost] = useState(null)
	function resetAdding() {
		// setIsAdded(false)
		setAddedBox(<MainReviewForm />)
	}
	function hideAdding() {
			setTastedAdding(null)
			resetAdding()
	}
	function collectAddingData() {
			setTastedAdding(null)
			setAddedBox(<TastedTeaForm />)
			console.log('Data collected');
	}
	const [tastedAdding, setTastedAdding] = useState(null) // step_two

	function setRatingEvents() {
        let rating_leaflets = document.querySelectorAll(".cardPage_rating_leaflet");
        for(let i = 0; i < props.teaObj.teaRate; i++) {
            rating_leaflets[i].style.backgroundColor = "#E7BB63"
			console.log(props.teaObj.teaRate)
        }
    }
	useEffect(() => {
		setRatingEvents()
	}, [])
	return (
		<div className="cardPage_blur_wrapper" onLoad={scrollPos}>	
			{tastedAdding}
			{subscriptionAlert}
			<div className="cardPage_container">
				<div className="cardPage_outputTost_container">{outputTost}</div>

				<div className="close_btn_block">
					<button onClick={props.hideCard} className="cardPage_arrow_close_btn"><ArrowLeftWhiteIcon className="cardPage_ArrowLeftWhite" /></button>
					<button onClick={props.hideCard} className="cardPage_x_close_btn"><CloseIcon className="cardPage_CloseIcon" /></button>
					{/* <h2 className="cardPage_scrolling_header reveal buttonOne-font">{props.teaObj.teaName}</h2> */}
				</div>
				{console.log(props.teaObj.teaImg)}
				<div className="cardPage_teaPicture_block"><div className="cardPage_teaPicture_shape"><img draggable="false" src={props.teaObj.teaImg} alt="tea img" /></div></div>
				<h1 className="cardPage_tea_name headerOne-font">{props.teaObj.teaName}</h1>
				<div className="cardPage_rating_section">
					<div className="cardPage_rating_block">
						<div className="cardPage_rating_leaflet" />
						<div className="cardPage_rating_leaflet" />
						<div className="cardPage_rating_leaflet" />
						<div className="cardPage_rating_leaflet" />
						<div className="cardPage_rating_leaflet" />
					</div>
					{/* <h2 className="cardPage_rewiews_header buttonTwo-font">Отзывов: {props.teaObj.teaReviews.length}</h2> */}
				</div>
				<div className="cardPage_tea_tags">
					{props.teaObj.teaTags.map(item => (<TokenSmall key={nanoid()} className="cardPage_tea_tag">{item}</TokenSmall>))}
				</div>
				<div className="cardPage_tabs_section">
					<input onChange={changeCardHeight} type="radio" name="tab_selection" id="tab_about" className="cardPage_teaTags" />
					<input onChange={changeCardHeight} type="radio" name="tab_selection" id="tab_reviews" className="cardPage_teaTags" />
					<div className="headline_box">
						<label htmlFor="tab_about" className="tea_info_tab headerTwo-font">О чае</label>
						<label htmlFor="tab_reviews" className="tea_info_tab headerTwo-font">Отзывы</label>
					</div>
					<div className="tea_info">
						<p className="tea_notation captionOne-font">{props.teaObj.teaInfo}</p>
						<div className="tea_reviews">
							{console.log(props.teaObj.teaReviews)}
							<ReviewsContainer teaReviews={props.teaObj.teaReviews} />
						</div>
					</div>
				</div>
				<div className="footer-review-filter">
					{addedBox}
				</div>
			</div>
		</div>
	)
}