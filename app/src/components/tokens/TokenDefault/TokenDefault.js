import React from 'react'
import classes from './TokenDefault.module.css'

const TokenDefault = ({children, ...props}) => {
	return (
		<button onClick={props.onClick} className={classes.TokenDefault}>
			{children}
		</button>
	)
}

export default TokenDefault