import React, {useState} from 'react'
import "./ReviewItem.css"
import TokenSecond from "../../components/tokens/TokenSecond/TokenSecond.js"
import { nanoid } from 'nanoid'
import Fancybox from '../../customs/imageViewer/imageViewer'
export default function ReviewItem(props) {
	const reviewPictures = props.reviewObj.reviewPictures.split(",")
	console.log(props.reviewObj.reviewLikes)
	const posAnswerAmountCONST = props.reviewObj.reviewLikes;
	const negAnswerAmountCONST = props.reviewObj.reviewLikes;
	let posAnswerAmount = 3;
	let negAnswerAmount = 0;
	console.log(props.reviewObj) // reviewLikes
	const [posAnswer, setPosAnswer] = useState(posAnswerAmountCONST)
	const [negAnswer, setNegAnswer] = useState(negAnswerAmount)
	const [isHelpful1, setIsHelpful1] = useState(false);
	const [isHelpful2, setIsHelpful2] = useState(false);
	function genRandomId() {
		let nanoidUniqId = `${nanoid()}`.split("").filter(item => item !== "-" && item !== "_" && !Number.isInteger(+item)).join("")
		return nanoidUniqId
	}
	let [review_aswer_checkbox_1, review_aswer_checkbox_2] = [genRandomId(), genRandomId()];
	function changeRevVal() {
		if(document.querySelector(`#${review_aswer_checkbox_1}`).checked) {
			setPosAnswer(posAnswerAmountCONST + 1)
			setNegAnswer(negAnswerAmountCONST)
		}
		else {
			setPosAnswer(posAnswerAmountCONST)
			setNegAnswer(negAnswerAmountCONST + 1)
			
		}
	}
	function inputReset(e) {
		if(e == review_aswer_checkbox_1 && isHelpful1 === true) {
			setIsHelpful1(false)
			setIsHelpful2(false)
			posAnswerAmount = posAnswerAmountCONST - 1
			negAnswerAmount = negAnswerAmountCONST
		}
		else if(e == review_aswer_checkbox_2 && isHelpful2 === true) {
			setIsHelpful1(false)
			setIsHelpful2(false)
			posAnswerAmount = posAnswerAmountCONST 
			negAnswerAmount = negAnswerAmountCONST - 1
		}
		console.log(props.reviewObj.authorPic)
	}

	return (
		<div className="user-review">
			<div className="user-info-head">
				<button className="user-avatar-btn"><img draggable="false" className="user-avatar" src={props.reviewObj.reviewAuthor.userpic} alt="123" /></button>
				<div className="user-info">
					<h2 className="headerTwo-font" id="review-username">{props.reviewObj.reviewAuthor.firstName}</h2>
					<h2 className="captionOne-font" id="review-date">{props.reviewObj.reviewDate} в {props.reviewObj.reviewTime}</h2>
				</div>
			</div>
			<div className="user-review-body">
				<div className="user-review-text-container">
					<p id="user-review-text" className="captionOne-font">{props.reviewObj.reviewText}</p>
				</div>
				<div className="user-img-container">
					{props.reviewObj.reviewPictures ? reviewPictures.map(item => <Fancybox key={nanoid()} options={{ infinite: false }}><img data-src={item} data-fancybox="gallery" draggable="false" className="user-review-img" src={item} alt="img" /></Fancybox>) : "" }
				</div>
			</div>
			<h2 className="review-rate-header buttonOne-font">Вы согласны с этим отзывом?</h2>
			<div className="review-answer-container">
				<form className={nanoid()} onSubmit={(e) => e.preventDefault()}>
					<div className="review-answer-block-1">
						<input readOnly checked={isHelpful1} className="review-aswer-checkbox aswer-checkbox-1" type="radio" id={review_aswer_checkbox_1} name="review-aswer-checkbox" value="Да" />
						<TokenSecond><span className="buttonOne-font" id="review-pos-asw-count"><label onClick={() => {changeRevVal();setIsHelpful1(true); setIsHelpful2(false); inputReset(review_aswer_checkbox_1); setPosAnswer(posAnswerAmount + 1); setNegAnswer(negAnswerAmount)}} id={`${review_aswer_checkbox_1}-label`} className="review-aswer-button button-tasted buttonOne-font" htmlFor={review_aswer_checkbox_1}>Да {posAnswer}</label></span></TokenSecond>
					</div>
					<div className="review-answer-block-2">
						<input readOnly checked={isHelpful2} className="review-aswer-checkbox aswer-checkbox-2" type="radio" id={review_aswer_checkbox_2} name="review-aswer-checkbox" value="Нет" />
						<TokenSecond><span className="buttonOne-font" id="review-neg-asw-count"><label onClick={() => {changeRevVal();setIsHelpful2(true); setIsHelpful1(false); inputReset(review_aswer_checkbox_2); setPosAnswer(posAnswerAmount); setNegAnswer(negAnswerAmount + 1)}} id={`${review_aswer_checkbox_2}-label`} className="review-aswer-button button-wanted buttonOne-font" htmlFor={review_aswer_checkbox_2}>Нет {negAnswer}</label></span></TokenSecond>
					</div>
				</form>
			</div>
		</div>
	)
}