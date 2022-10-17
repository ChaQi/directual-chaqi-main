import React from 'react'
import classes from './TokenAction.module.css'

const TokenAction = ({children, ...props}) => {
	return (
		<button className={classes.TokenAction}>
			{children}
		</button>
	)
}

export default TokenAction