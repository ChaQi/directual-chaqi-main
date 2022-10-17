import React from 'react'
import classes from './Tost.module.css'
import {ReactComponent as PositiveIcon} from "../../sources/icons/positive.svg"
import {ReactComponent as DangerIcon} from "../../sources/icons/iconDanger.svg"
const Tost = ({children, ...props}) => {
	if(props.addingIcon === "danger") {
		return (
			<div style={props.style} className={classes.TostContainer}>
				<DangerIcon className={classes.TostIcon}>!</DangerIcon>
				<p className={classes.TostText}>{children}</p>
			</div>
		)
	}
	else {
		return (
			<div style={props.style} className={classes.TostContainer}>
				<PositiveIcon className={classes.TostIcon}></PositiveIcon>
				<p className={classes.TostText}>{children}</p>
			</div>
		)
	}
}

export default Tost