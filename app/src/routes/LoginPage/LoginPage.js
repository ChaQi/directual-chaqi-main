import React, {useState} from 'react'
import {ReactComponent as ArrowLeftWhiteIcon} from "../../sources/icons/arrowLeftWhite.svg"
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"
import BtnDefault from "../../components/buttons/BtnDefault/BtnDefault.js"
import { ReactComponent as WhiteStars} from '../../sources/icons/white_stars.svg'
import InputBar from "../../components/searchBars/inputBar/InputBar"
import PasswordInputBar from "../../components/searchBars/passwordInputBar/PasswordInputBar"
import "./LoginPage.css"
import BtnAction from '../../components/buttons/BtnAction/BtnAction'
import { useAuth } from '../../auth'
import Directual from "directual-api"
export default function LoginPage(props) {
	let width = window.innerWidth
	const [userEmail, setUserEmail] = useState("")
	const [userPassword, setUserPassword] = useState("")
	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  }
	  const auth = useAuth()
	  const api = new Directual({apiHost: "/"})
	function validateFields() {
		// if(validateEmail(userEmail) !== null && userPassword.trim() !== "") {
			props.getUser(userEmail.trim(), userPassword.trim())
			// auth.login("", "")
		// }
	}
	return (
		<div className="loginpage_blur_wrapper">
			<div className="loginpage_quit_btn_container_m"><button className="loginpage_quit_btn" onClick={() => props.hideLogin()}><CloseIcon /></button></div>
			<div className="page loginpage">
				<div className="loginpage_quit_btn_container_d"><button className="loginpage_quit_btn" onClick={() => props.hideLogin()}><CloseIcon /></button></div>
				<div className='loginpage_whiteStars_block'><WhiteStars /></div>
				<h1 className="loginpage-header headerTwo-font">Вход</h1>
				<form className='loginpage_regform' onSubmit={e => e.preventDefault()}>
					<section className='loginpage_email_input_section'>
						<label className='loginpage_email_label captionOne-font'>Почта</label>
						<InputBar onChange={(e) => setUserEmail(e.target.value)} className='loginpage_email_label' />
					</section>
					<section className='loginpage_password_input_section'>
						<label className='loginpage_password_label captionOne-font'>Пароль</label>
						<PasswordInputBar onChange={(e) => setUserPassword(e.target.value)} type="password" className='loginpage_password_label' />
					</section>
					<section className='loginpage_button_section'>
						<BtnDefault onClick={validateFields}>Войти</BtnDefault>
						<BtnAction onClick={() => props.changeValidationPage("loginpage")}>Забыл пароль?</BtnAction>
					</section>
					<section className='loginpage_backToRegistration_section'>
						<BtnAction>Зарегистрироваться</BtnAction>
					</section>
				</form>
			</div>
		</div>
	)
}