import React, {useState} from 'react'
import {ReactComponent as ArrowLeftWhiteIcon} from "../../sources/icons/arrowLeftWhite.svg"
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"
import BtnDefault from "../../components/buttons/BtnDefault/BtnDefault.js"
import { ReactComponent as WhiteStars} from '../../sources/icons/white_stars.svg'
import InputBar from "../../components/searchBars/inputBar/InputBar"
import PasswordInputBar from "../../components/searchBars/passwordInputBar/PasswordInputBar"
import "./АuthorizationPage.css"
import BtnAction from '../../components/buttons/BtnAction/BtnAction'

export default function АuthorizationPage(props) {
	const [username, setUsername] = useState("")
	const [userEmail, setUserEmail] = useState("")
	const [userPassword, setUserPassword] = useState("")
	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  }
	function validateFields() {
		if(username.trim() !== "" && validateEmail(userEmail) !== null && userPassword.trim() !== "") {
			props.createUser(username.trim(), userEmail, userPassword.trim())
		}
	}
	return (
		<div className="authpage_blur_wrapper">
			<div className="authpage_quit_btn_container_m"><button className="authpage_quit_btn" onClick={() => props.hideAuth()}><CloseIcon /></button></div>
			<div className="page authpage">
				<div className="authpage_quit_btn_container_d"><button className="authpage_quit_btn" onClick={() => props.hideAuth()}><CloseIcon /></button></div>
				<div className='authpage_whiteStars_block'><WhiteStars /></div>
				<h1 className="authpage-header headerTwo-font">Зарегистрируйся, чтобы твоя коллекция не потерялась</h1>
				<form className='authpage_regform' onSubmit={e => e.preventDefault()}>
					<section className='authpage_name_input_section'>
						<label className='authpage_name_label captionOne-font'>Как тебя зовут</label>
						<InputBar onChange={(e) => {setUsername(e.target.value); console.log(username)}} className='authpage_name_label' />
					</section>
					<section className='authpage_email_input_section'>
						<label className='authpage_email_label captionOne-font'>Почта</label>
						<InputBar onChange={(e) => {setUserEmail(e.target.value); console.log(userEmail)}} className='authpage_email_label' />
					</section>
					<section className='authpage_password_input_section'>
						<label className='authpage_password_label captionOne-font'>Пароль</label>
						<PasswordInputBar onChange={(e) => {setUserPassword(e.target.value); console.log(userPassword)}} type="password" className='authpage_password_label' />
					</section>
					<section className='authpage_button_section'>
						<BtnDefault onClick={() => validateFields()}>Зарегистрироваться</BtnDefault>
						<BtnAction onClick={() => props.changeValidationPage("authpage")}>Уже зарегистрирован</BtnAction>
					</section>
				</form>
			</div>
		</div>
	)
}