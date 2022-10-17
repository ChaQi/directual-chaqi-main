import React from 'react'
import classes from './SearchBar.module.css'
import {ReactComponent as SearchIcon} from "../../../sources/icons/search.svg"

const SearchBar = (props) => {
	return (
		<form onSubmit={props.onSubmit} className={classes.SearchBar} onChange={props.onChange}>
			<SearchIcon className={classes.inputIcon} />
			<input value={props.value} onLoad={props.onLoad} onBlur={props.onBlur} onFocus={props.onFocus} onChange={props.onChange} type="text" className={classes.SearchBarInput}/>
		</form>
	)
}

export default SearchBar