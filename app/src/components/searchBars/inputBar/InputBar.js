import React from 'react'
import classes from './InputBar.module.css'

const InputBar = ({children, ...props}) => {
	props.type = props?.type ? props?.type : "text"
	return (
		<input type={props?.type} onChange={props.onChange} maxLength={props.maxLength} className={classes.InputBar}/>
	)
}

export default InputBar