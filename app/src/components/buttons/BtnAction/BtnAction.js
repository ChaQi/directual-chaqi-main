import React from 'react'
import classes from './BtnAction.module.css'

const BtnAction = ({children, ...props}) => {
	return (
		<button onClick={props.onClick} className={classes.BtnAction}>
			{children}
		</button>
	)
}

export default BtnAction