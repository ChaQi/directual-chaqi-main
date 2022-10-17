import React from 'react'
import classes from './TokenSmallActive.module.css'

const TokenSmallActive = ({children, ...props}) => {
	return (
		<button onClick={props.onClick} className={classes.TokenSmallActive}>
			{children}
		</button>
	)
}

export default TokenSmallActive