import React from 'react'
import classes from './Card.module.css'
import {ReactComponent as ArrowRight} from "../../sources/icons/arrowRight.svg"

const COLORS = ["#C78B46", "#E7BB63", "#E1AF8A", "#9D8A5F", "#CD9C61", "#FFDA91", "#C4AB6D", "#B0975D"];
const Card = ({children, ...props}, teaObj) => {
		let card_bg = {backgroundColor: `${COLORS[Math.floor(Math.random() * COLORS.length)]}`}
		return (
			<div className={classes.TeaCard} style={card_bg} onClick={(e) => props.generateCard(props.teaObj, e)}>
				<div className={classes.TeaCardInfo}>
					<h1 className={classes.TeaCardName}>{props.teaObj.teaName}</h1>
					<p className={classes.TeaCardCategory}>{props.teaObj.teaCategory[0]}</p>
					<div className={classes.BottomCardBlock}>
						<hr className={classes.TeaCardSeparator} />
						<p className={classes.TeaCardTags}>{props.teaObj.teaTags.slice(0,3).join(", ")}</p>
					</div>
				</div>
				<div className={classes.TeaCardDetails}>
					<ArrowRight className={classes.ArrIcon} />
					<img draggable="false" className={classes.TeaCardImg} src={props.teaObj.teaImg} alt="Tea picure wasn't found" />
				</div>

			</div>
		)
}

export default Card