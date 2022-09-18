import React from 'react'
import classes from './TokenSecond.module.css'

const TokenSecond = ({children, ...props}) => {
	return (
		<button onClick={props.onClick} className={classes.TokenSecond}>
			{children}
		</button>
	)
}

export default TokenSecond