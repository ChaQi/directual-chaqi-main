import React from 'react'
import ReviewItem from "../../components/reviewItem/ReviewItem.js"
import "./ReviewsContainer.css"
import { nanoid } from 'nanoid'

export default function ReviewsContainer(props) {
	function fetchTeaReviews() {
		
	}
	return (
		<div className="user_review_block">
			{props.teaReviews.map(item => <ReviewItem key={nanoid()} reviewObj={item} />)}
		</div>
	)
}