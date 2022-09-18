import React from 'react'
import classes from './TokenSmall.module.css'

const TokenSmall = ({children, ...props}) => {
	return (
		<button onClick={props.onClick} className={classes.TokenSmall}>
			{children}
		</button>
	)
}

export default TokenSmall