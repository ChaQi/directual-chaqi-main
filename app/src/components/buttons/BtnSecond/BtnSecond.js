import React from 'react'
import classes from './BtnSecond.module.css'

const BtnSecond = ({children, ...props}) => {
	return (
		<button teaid={props.teaid} onClick={props.onClick} className={classes.BtnSecond}>
			{children}
		</button>
	)
}

export default BtnSecond