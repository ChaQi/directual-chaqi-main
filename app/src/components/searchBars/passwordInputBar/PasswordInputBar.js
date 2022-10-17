import React, {useState} from 'react'
import classes from './PasswordInputBar.module.css'
import {ReactComponent as EyeClosedIcon} from "../../../sources/icons/white_eye.svg"
import {ReactComponent as EyeOpenIcon} from "../../../sources/icons/white_eyeOpen.svg"
const PasswordInputBar = (props) => {
	const [inputType, setInputType] = useState("password")
	const [inputIcon, setInputIcon] = useState(<EyeClosedIcon className={classes.inputIcon} />)
	function changeInputType() {
		if(inputType === "password") {
			setInputIcon(<EyeOpenIcon className={classes.inputIconOpen} />)
			return "text"
		}
		setInputIcon(<EyeClosedIcon className={classes.inputIcon} />)
		return "password"
	}
	return (
		<div onSubmit={props.onSubmit} className={classes.PasswordInputBar} onChange={props.onChange}>
			<div className={classes.EyeIcon_block} onClick={() => setInputType(changeInputType())}>{inputIcon}</div>
			<input value={props.value} onLoad={props.onLoad} onBlur={props.onBlur} onFocus={props.onFocus} onChange={props.onChange} type={inputType} className={classes.PasswordInput}/>
		</div>
	)
}

export default PasswordInputBar