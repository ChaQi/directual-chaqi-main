import React from 'react'
import classes from './BtnDefault.module.css'

const BtnDefault = ({children, ...props}) => {
	return (
		<button onClick={props.onClick} className={classes.BtnDefault}>
			{children}
		</button>
	)
}

export default BtnDefault