import React, {useState, useEffect} from 'react'
import './Adding.css'
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"
// import {ReactComponent as ParticlesImg} from "../../sources/img/particles.svg"
import {ReactComponent as HeartIcon} from "../../sources/icons/HeartIcon.svg"
import TokenSecond from "../tokens/TokenSecond/TokenSecond.js"
import BtnDefault from "../buttons/BtnDefault/BtnDefault.js"
// import BtnAction from "../buttons/BtnAction/BtnAction.js"
import SearchBar from "../searchBars/searchBar/SearchBar.js"
import Tost from "../tost/Tost.js"
import { nanoid } from 'nanoid'
const borders = [
	"48% 52% 43% 57% / 36% 40% 60% 64%",
	"39% 61% 43% 57% / 63% 48% 52% 37%",
	"73% 27% 43% 57% / 44% 46% 54% 56%",
	"55% 45% 63% 37% / 53% 63% 37% 47%",
	"31% 69% 62% 38% / 34% 37% 63% 66%",
];

function ChoiceForm(props) {
	return (
		<div>	
			<form onSubmit={(e) => {e.preventDefault();}}>
				<div className="adding_review-option">
					<input className="adding_review-filter-checkbox" type="radio" id="adding_review_filter_checkbox_addId_1" name="adding_review-filter-checkbox" value="Попробовал" />
					<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor="adding_review_filter_checkbox_addId_1">Попробовал</label></TokenSecond>
				</div>
				<div className="adding_review-option">
					<input className="adding_review-filter-checkbox" type="radio" id="adding_review_filter_checkbox_addId_2" name="adding_review-filter-checkbox" value="Избранное" />
					<TokenSecond><label className="adding_review-filter-button adding_button-wanted buttonOne-font" htmlFor="adding_review_filter_checkbox_addId_2"><label htmlFor="adding_review_filter_checkbox_addId_2" style={{fontSize: "28px", cursor: "pointer", marginBottom: "1.5px"}}>♡</label> Избранное</label></TokenSecond> {/*<HeartIcon />*/}
				</div>
			</form>
		</div>
	)
}
function generateBorders() {
	document.querySelectorAll(".adding_slider_item_img").forEach(item => item.style.borderRadius = borders[Math.round(Math.random() * 4)])
}
export default function Adding({children, ...props}) {
	let infoObj = {}
	document.addEventListener('keydown', function(event) {
		if(event.key === "Escape") {
			props.hideAdding()
    	}
	});
	function addStepOneInfo(teaName) {
		infoObj.teaName = teaName
	}
	function addStepTwoInfo(tags) {
		infoObj.tasteDescriptors = tags
		console.log(infoObj)
	}
	function addStepThreeInfo(tags) {
		infoObj.tasteDescriptors.push(...tags)
		console.log(infoObj)
	}
	function addStepFourInfo(teaPhotos, userText, rate) {
		infoObj.teaPhotos = teaPhotos
		infoObj.teaRate = rate
		infoObj.reviewText = userText
		console.log(infoObj)
	}
	const defaultStep = props.currentStep === "step_two" ? <AddingStepTwo hideAdding={props.hideAdding} runStepThree={runStepThree} addStepTwoInfo={addStepTwoInfo} /> : <AddingStepOne runFavCategoryStep={runFavCategoryStep} runCategoryStep={runCategoryStep} addStepOneInfo={addStepOneInfo} returnInfo={returnInfo} hideAdding={props.hideAdding} runStepTwo={runStepTwo} collectAddingData={props.collectAddingData} />
	const [currentStep, setCurrentStep] = useState(defaultStep)
	return (
		<div className="adding_main_wrapper">
			{currentStep}
		</div>
	)
	function returnInfo() {
		console.log(infoObj)
		return infoObj
	}
	function runCategoryStep() {
		setCurrentStep(<CategoryStep hideAdding={props.hideAdding} runStepTwo={runStepTwo} />)
	}
	function runFavCategoryStep() {
		setCurrentStep(<CategoryStep hideAdding={props.hideAdding} runStepTwo={props.collectAddingData} />)
	}
	function runStepTwo() {
		setCurrentStep(<AddingStepTwo hideAdding={props.hideAdding} runStepThree={runStepThree} addStepTwoInfo={addStepTwoInfo} />)
	}
	function runStepThree() {
		setCurrentStep(<AddingStepThree hideAdding={props.hideAdding} runStepFour={runStepFour} addStepThreeInfo={addStepThreeInfo} />)
	}
	function runStepFour() {
		setCurrentStep(<AddingStepFour hideAdding={props.hideAdding} returnInfo={returnInfo} collectAddingData={props.collectAddingData} addStepFourInfo={addStepFourInfo} />)
	}
}


function AddingStepOne(props) {
	function StepOneMain(props) {
		const [tostNotification, setTostNotification] = useState(null)
		const [selectedTea, setSelectedTea] = useState(null)
		function revealTost(text) {
			setTostNotification(<Tost addingIcon="danger">{text}</Tost>)
			document.querySelector(".adding_tost_container").style.minHeight = "120px"
			setTimeout(() => {if(document.querySelector(".adding_tost_container")) document.querySelector(".adding_tost_container").classList.remove("unactive")}, 100)
			setTimeout(() => {if(document.querySelector(".adding_tost_container")) document.querySelector(".adding_tost_container").classList.add("unactive")}, 4000)
		}
		function checkInput(text) {
			// console.log(selectedTea)
			if((document.querySelector("#adding_review_filter_checkbox_addId_1") && document.querySelector("#adding_review_filter_checkbox_addId_2"))) {
				console.log(selectedTea, document.querySelector("#adding_review_filter_checkbox_addId_1").checked, document.querySelector("#adding_review_filter_checkbox_addId_2").checked)
				if((document.querySelector("#adding_review_filter_checkbox_addId_1").checked || document.querySelector("#adding_review_filter_checkbox_addId_2").checked) && selectedTea !== null) {
					if(document.querySelector("#adding_review_filter_checkbox_addId_2").checked) {
						if(selectedTea !== "Не нашел такого. Добавить") {
							props.addStepOneInfo(selectedTea)
							// props.runStepTwo() // !!!!!!!!!!!!!!!!!!!!
							props.collectAddingData(props.returnInfo())
						}
						else {
							props.runFavCategoryStep()
							let userNewTeaName = document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form input").value
							console.log(userNewTeaName)
							props.addStepOneInfo(userNewTeaName)
							// props.runStepTwo()
						}
					}
					else {
						if(selectedTea !== "Не нашел такого. Добавить") {
							props.addStepOneInfo(selectedTea)
							props.runStepTwo() // !!!!!!!!!!!!!!!!!!!!
						}
						else {
							props.runCategoryStep()
							let userNewTeaName = document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form input").value
							console.log(userNewTeaName)
							props.addStepOneInfo(userNewTeaName)
							// props.runStepTwo()
						}
					}
				}
				else if(selectedTea == null && !(document.querySelector("#adding_review_filter_checkbox_addId_1").checked || document.querySelector("#adding_review_filter_checkbox_addId_2").checked)) {
					revealTost(`Чтобы продолжить, выбери коллекцию «Попробовал» или «♡ Избранное». Найди чай, который хочешь добавить, и нажми на него.`)
					document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form").classList.add("danger")
					document.querySelectorAll(".adding_chosenCollection_block .adding_review-option button").forEach(item => item.classList.add("danger"))
					setTimeout(() => {
						if(document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form") && document.querySelectorAll(".adding_chosenCollection_block .adding_review-option button")) {
							document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form").classList.remove("danger")
							document.querySelectorAll(".adding_chosenCollection_block .adding_review-option button").forEach(item => item.classList.remove("danger"))
						}
					}, 4000)
					console.log("НИЗЯ");
				}
				
				else if(selectedTea == null && (document.querySelector("#adding_review_filter_checkbox_addId_1").checked || document.querySelector("#adding_review_filter_checkbox_addId_2").checked)) {
					revealTost("Чтобы продолжить, найди чай, который хочешь добавить, и нажми на него.")
					document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form").classList.add("danger")
					setTimeout(() => {
						document.querySelector(".adding_stepOneBody_block .adding_searchBar_block form").classList.remove("danger")
					}, 4000)
					console.log("НИЗЯ");
				}
				else {
					revealTost(`Чтобы продолжить, выбери коллекцию «Попробовал» или «${<HeartIcon />}Избранное».`)
					document.querySelectorAll(".adding_chosenCollection_block .adding_review-option button").forEach(item => item.classList.add("danger"))
					setTimeout(() => {
						document.querySelectorAll(".adding_chosenCollection_block .adding_review-option button").forEach(item => item.classList.remove("danger"))
					}, 4000)
					console.log("НИЗЯ");
				}
			}

		}
		return (
			<div className="adding_tost_container_one_wrapper">
				<div className="adding_tost_container unactive">{tostNotification}</div>
					<div onLoad={generateBorders} className="container adding_container adding_container_stepOne">
						<div className="adding_upperNav_block">
							<div className="adding_close_block"><button onClick={props.hideAdding} className="adding_close_btn"><CloseIcon /></button></div>
							<div className="adding_progress_bar"><div className="adding_progress_line"></div></div>
							
						</div>
						<div className="adding_header headerOne-font">О каком чае будешь писать</div>
						<div className="adding_chosenCollection_block">
							<ChoiceForm />
						</div>
						<StepOneRegularBody selectedTea={selectedTea} setSelectedTea={setSelectedTea} />
						<div className="adding_continueBtn_container"><BtnDefault onClick={() => checkInput(selectedTea)}>Продолжить</BtnDefault></div>
					</div>
			</div>
		)
	}
	function StepOneRegularBody(props) {
		function findAncestor(el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls));
			return el;
		}
		function switchSelectedTea(e) {
			e = findAncestor(e.target, "adding_slider_item")
			document.querySelectorAll('.adding_slider_item').forEach(item => item.classList.remove("selected"))
			e.classList.add("selected")
			props.setSelectedTea(document.querySelector(".selected > .adding_slider_item_headline").innerText)
		}
		return (
			<div className="adding_stepOneBody_block">	
				<div className="adding_searchBar_block"><SearchBar onSubmit={e => e.preventDefault()} /></div>
				<div className="adding_slider_container">
					<div onClick={switchSelectedTea} className="adding_slider_item adding_slider_item_not_found">
						<div className="adding_slider_item_img adding_slider_item_not_found_img"></div>
						<h3 className="adding_slider_item_headline captionTwo-font">Не нашел такого. Добавить</h3>
					</div>
					<div onClick={switchSelectedTea} className="adding_slider_item">
						<img draggable="false" className="adding_slider_item_img" src="/img/teaImg.png" alt="preview" />
						<h3 className="adding_slider_item_headline captionTwo-font">Те Гуань Инь «Богиня милосердия»</h3>
					</div>
					<div onClick={switchSelectedTea} className="adding_slider_item">
						<img draggable="false" className="adding_slider_item_img" src="/img/teaImg.png" alt="preview" />
						<h3 className="adding_slider_item_headline captionTwo-font">Ланьхуа Фэн Жоу Гуй</h3>
					</div>
					<div onClick={switchSelectedTea} className="adding_slider_item">
						<img draggable="false" className="adding_slider_item_img" src="/img/teaImg.png" alt="preview" />
						<h3 className="adding_slider_item_headline captionTwo-font">Лишань Габа Улун</h3>
					</div>
					<div onClick={switchSelectedTea} className="adding_slider_item">
						<img draggable="false" className="adding_slider_item_img" src="/img/teaImg.png" alt="preview" />
						<h3 className="adding_slider_item_headline captionTwo-font">Лишань Габа Улун</h3>
					</div>
				</div>
			</div>
		)
	}
	
	return (
		<StepOneMain runFavCategoryStep={props.runFavCategoryStep} runCategoryStep={props.runCategoryStep} addStepOneInfo={props.addStepOneInfo} collectAddingData={props.collectAddingData} returnInfo={props.returnInfo} hideAdding={props.hideAdding} runStepTwo={props.runStepTwo} runStepFour={props.runStepFour} />
	)
}

function CategoryStep(props) {
	// tea categories
	const teaCategories1 = ['Пуэр', 'Улун']
	const teaCategories2 = ['Зеленый', 'Белый']
	const teaCategories3 = ['Красный', 'Желтый']
	const teaCategories4 = ["Хэй ча"];
	// tost notification logic
	const [tostNotification, setTostNotification] = useState(null)
	function revealTost(text) {
		setTostNotification(<Tost addingIcon="danger">{text}</Tost>)
		document.querySelector(".adding_categoryStep_tost_container").style.minHeight = "120px"
		setTimeout(() => {if(document.querySelector(".adding_categoryStep_tost_container")) document.querySelector(".adding_categoryStep_tost_container").classList.remove("unactive")}, 100)
		setTimeout(() => {if(document.querySelector(".adding_categoryStep_tost_container")) document.querySelector(".adding_categoryStep_tost_container").classList.add("unactive")}, 4000)
	}
	// simple category step validation
	function validateCategoryStep() {
		if(document.querySelector(".categoryStep_teaCategory_value_block input:checked")?.value) {
			console.log(document.querySelector(".categoryStep_teaCategory_value_block input:checked").value)
			props.runStepTwo()
		}
		else {
			revealTost('Чтобы продолжить, выбери вид чая')
		}
	}
	return (
		<div className="container adding_container adding_container_categoryStep">
			<div className="adding_categoryStep_tost_container unactive">{tostNotification}</div>
			<div className="adding_upperNav_block">
					<div className="adding_close_block"><button onClick={props.hideAdding} className="adding_close_btn"><CloseIcon /></button></div>
					<div className="adding_progress_bar adding_progress_bar_second"><div className="adding_progress_line"></div></div>
			</div>
			<div className="adding_header adding_categoryStep_header headerOne-font">Вид чая</div>
			<section className='categoryStep_teaCategory_choice'>
				<div className='categoryStep_teaCategory_value_block'>
					{teaCategories1.map(category => 
						<div key={nanoid()} className="adding_taste_option">
							<input className="adding_review_filter_checkbox" type="radio" id={`adding_taste_filter_checkbox_id_${category}`} name="adding_review_filter_checkbox" value={category} />
							<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${category}`}>{category}</label></TokenSecond>
						</div>
					)}
				</div>
				<div className='categoryStep_teaCategory_value_block'>
					{teaCategories2.map(category => 
						<div key={nanoid()} className="adding_taste_option">
							<input className="adding_review_filter_checkbox" type="radio" id={`adding_taste_filter_checkbox_id_${category}`} name="adding_review_filter_checkbox" value={category} />
							<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${category}`}>{category}</label></TokenSecond>
						</div>
					)}
				</div>
				<div className='categoryStep_teaCategory_value_block'>
					{teaCategories3.map(category => 
						<div key={nanoid()} className="adding_taste_option">
							<input className="adding_review_filter_checkbox" type="radio" id={`adding_taste_filter_checkbox_id_${category}`} name="adding_review_filter_checkbox" value={category} />
							<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${category}`}>{category}</label></TokenSecond>
						</div>
					)}
				</div>
				<div className='categoryStep_teaCategory_value_block'>
					{teaCategories4.map(category => 
						<div key={nanoid()} className="adding_taste_option">
							<input className="adding_review_filter_checkbox" type="radio" id={`adding_taste_filter_checkbox_id_${category}`} name="adding_review_filter_checkbox" value={category} />
							<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${category}`}>{category}</label></TokenSecond>
						</div>
					)}
				</div>
			</section>
			<div className="adding_continueBtn_container"><BtnDefault onClick={validateCategoryStep}>Продолжить</BtnDefault></div>
		</div>
	)
}

function AddingStepTwo(props) {
	let tasteOkVals1 = ['Ореховый', 'Травяной'];
	let tasteOkVals2 = [ 'Сухофрукты', 'Дымный'];
	let tasteOkVals3 = ['Сладкий', 'Пряный'];
	let tasteOkVals4 = ['Цветочный', 'Ягодный'];
	function validateStepTwo() {
		let a = document.querySelectorAll("input.adding_review_filter_checkbox:checked")
		let tasteDescriptorArr = []
		for(let i = 0; i < a.length; i++) {
			tasteDescriptorArr.push(a[i].value)
		}
		props.addStepTwoInfo(tasteDescriptorArr)
		props.runStepThree()
	}
	// infoObj
	return (
		<div className="container adding_container adding_container_stepTwo">
			<div className="adding_upperNav_block">
				<div className="adding_close_block"><button onClick={props.hideAdding} className="adding_close_btn"><CloseIcon /></button></div>
				<div className="adding_progress_bar adding_progress_bar_second"><div className="adding_progress_line"></div></div>
			</div>
			<div className="adding_header headerOne-font">Вкусовые свойства</div>
			<p className="adding_caption captionOne-font">Выбери, что тебе кажется более подходящим для этого чая</p>

			<div className="adding_tasteProperties_block">	
				<form onSubmit={(e) => {e.preventDefault();}}>
					<div className="adding_tasteProperties_wrapper">
						{tasteOkVals1.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>
					<div className="adding_tasteProperties_wrapper">
						{tasteOkVals2.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>

					<div className="adding_tasteProperties_wrapper">
						{tasteOkVals3.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>

					<div className="adding_tasteProperties_wrapper">
						{tasteOkVals4.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>
				</form>
			</div>
			<div className="adding_continueBtn_container"><BtnDefault onClick={validateStepTwo}>Продолжить</BtnDefault></div>
		</div>
	)
}

function AddingStepThree(props) {
	let feelingsOkVals1 = ['Бодрость', 'Отдых'];
	let feelingsOkVals2 = [ 'Вдохновение', 'Сон'];
	let feelingsOkVals3 = ['Медитация', 'Разговоры'];
	function validateStepThree() {
		let a = document.querySelectorAll("input.adding_review_filter_checkbox_feeling_filter:checked")
		let tasteDescriptorArr = []
		for(let i = 0; i < a.length; i++) {
			tasteDescriptorArr.push(a[i].value)
		}
		props.addStepThreeInfo(tasteDescriptorArr)
		props.runStepFour()
	}
	// infoObj
	return (
		<div className="container adding_container adding_container_stepThree">
			<div className="adding_upperNav_block">
				<div className="adding_close_block"><button onClick={props.hideAdding} className="adding_close_btn"><CloseIcon /></button></div>
				<div className="adding_progress_bar adding_progress_bar_second"><div className="adding_progress_line"></div></div>
			</div>
			<div className="adding_header headerOne-font">Ощущения</div>
			<p className="adding_caption captionOne-font">Выбери, что тебе кажется более подходящим <br /> для этого чая</p>

			<div className="adding_tasteProperties_block">	
				<form onSubmit={(e) => {e.preventDefault();}}>
					<div className="adding_tasteProperties_wrapper">
						{feelingsOkVals1.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox adding_review_filter_checkbox_feeling_filter" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>
					<div className="adding_tasteProperties_wrapper">
						{feelingsOkVals2.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox adding_review_filter_checkbox_feeling_filter" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>
					<div className="adding_tasteProperties_wrapper">
						{feelingsOkVals3.map(descriptor => 
							<div key={nanoid()} className="adding_taste_option">
								<input className="adding_review_filter_checkbox adding_review_filter_checkbox_feeling_filter" type="checkbox" id={`adding_taste_filter_checkbox_id_${descriptor}`} name="adding_review_filter_checkbox" value={descriptor} />
								<TokenSecond><label className="adding_review-filter-button adding_button-tasted buttonOne-font" htmlFor={`adding_taste_filter_checkbox_id_${descriptor}`}>{descriptor}</label></TokenSecond>
							</div>
						)}						
					</div>
				</form>
			</div>
			<div className="adding_continueBtn_container"><BtnDefault onClick={validateStepThree}>Продолжить</BtnDefault></div>
		</div>
	)
}

function AddingStepFour(props) {
	const [tostNotificationStepFour, setTostNotificationStepFour] = useState(null)
	function revealTost(text, height) {
		setTostNotificationStepFour(<Tost addingIcon="danger">{text}</Tost>)
		if(height) {
			document.querySelector(".adding_tost_container").style.maxHeight = height
			document.querySelector(".adding_tost_container").style.minHeight = height
			document.querySelector(".adding_tost_container").style.height = height
		} else {
			document.querySelector(".adding_tost_container").style.minHeight = "120px"

		}
			setTimeout(() => {if(document.querySelector(".adding_tost_container")) {document.querySelector(".adding_tost_container").classList.remove("unactive")}}, 100)
			setTimeout(() => {if(document.querySelector(".adding_tost_container")) {document.querySelector(".adding_tost_container").classList.add("unactive")}}, 4000)
	}
	function setRatingEvents() {
	let rating_leaflets = document.querySelectorAll(".adding_rateLeaflet");
		rating_leaflets.forEach(item => item.addEventListener("click", updateRating));
		rating_leaflets.forEach(item => item.addEventListener("touch", updateRating))
	}
	function updateRating(e) {
	let rating_leaflets = document.querySelectorAll(".adding_rateLeaflet");
		rating_leaflets.forEach(item => {item.style.backgroundColor = "#58585C"; item.classList.remove('rated')});
		for(let i = 0; rating_leaflets[i-1] !== e.target; i++) {
			rating_leaflets[i].style.backgroundColor = "#E7BB63";
			rating_leaflets[i].classList.add('rated')
		}
	}
	
	useEffect(() => {
		setRatingEvents()
	}, [])

	const [image, setImage] = useState([])

	const onImageChange = (event) => {
		if(event.target.files && event.target.files[0]) {
			setImage(oldArray => [...oldArray, URL.createObjectURL(event.target.files[0])]);
		}
	}
	function inputValidation() {
		if(userTextValue.length > 2) {
			props.addStepFourInfo(image, userTextValue, document.querySelectorAll(".rated").length)
			
			props.collectAddingData(props.returnInfo())
		}
		else {
			revealTost("Чтобы продолжить, напиши свой комментарий", "76px")
			document.querySelector(".adding_textReview_area").classList.add("danger")
			document.querySelector(".adding_textReview_area").focus()
			setTimeout(() => {
				if(document.querySelector(".adding_textReview_area")) document.querySelector(".adding_textReview_area").classList.remove("danger");
			}, 4000)
		}

	}
	const [userTextValue, setUserTextValue] = useState("")
	return (
		<div className="adding_tost_container_one_wrapper">
			<div className="adding_tost_container">{tostNotificationStepFour}</div>
			<div className="container adding_container adding_container_stepFour">
				<div className="adding_upperNav_block">
					<div className="adding_close_block"><button onClick={props.hideAdding} className="adding_close_btn"><CloseIcon /></button></div>
					<div className="adding_progress_bar adding_progress_bar_second"><div className="adding_progress_line"></div></div>
				</div>
				<div className="adding_header headerOne-font">Твоя оценка <br /> и комментарий</div>

				<div className="adding_userEndMark_block">
					<div className="adding_rateLeaflet"></div>
					<div className="adding_rateLeaflet"></div>
					<div className="adding_rateLeaflet"></div>
					<div className="adding_rateLeaflet"></div>
					<div className="adding_rateLeaflet"></div>
				</div>
				<div className="adding_textReview_block">
					<textarea onChange={(e) => setUserTextValue(e.target.value)} onFocus={e => {e.target.classList.add('focused')} } onBlur={e => {e.target.classList.remove('focused')} } className="adding_textReview_area captionOne-font"></textarea>
				</div>
				<div className="adding_header headerOne-font">И фотографии</div>
				<div className="adding_continueBtn_container"><BtnDefault onClick={inputValidation}>Завершить</BtnDefault></div>
				<div className="adding_imgContainer_block">
					<input id="adding_filetype" type="file" onChange={e => onImageChange(e)} className="adding_filetype" />
					<label className="adding_filetype_label" htmlFor="adding_filetype">+</label>
					{image.map(item => <img key={nanoid()} className="adding_chosen_img_file" src={item} alt="User's tea item" />)}
				</div>
			</div>
		</div>
	)
}