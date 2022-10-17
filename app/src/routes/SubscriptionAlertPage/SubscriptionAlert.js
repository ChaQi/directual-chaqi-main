import React from 'react'
import {ReactComponent as CloseIcon} from "../../sources/icons/close-black.svg"
import {ReactComponent as BlackStarIcon} from "../../sources/icons/BlackStarIcon.svg"
import "./subBg.png";
import "./SubscriptionAlert.css"

export const SubscriptionAlert = (props) => {
  return (
    <div className="subscriptionAlert_blur_wrapper">
      <div className='container subscriptionAlert_container' style={{backgroundImage: "url('/img/subBg.png')"}}>
          <div className="subscriptionPage_closeBtn_block">
            <button className='subscriptionPage_closeBtn' onClick={props.hideSubAlert}><CloseIcon /></button>
          </div>
          <div className='subscriptionPage_blackStarIcon'><BlackStarIcon /></div>
          <div className="subscriptionPage_sub_info headerTwo-font">
            <div className='subscriptionPage_sub_info_paragraph subscriptionPage_sub_info_p_1'>В твоей коллекции уже <br/> 10 чаев. Ты можешь <br/> продолжить добавлять <br/> по 2 чая в неделю или <br/> купить подписку.</div>
            <div className='subscriptionPage_sub_info_paragraph subscriptionPage_sub_info_p_2'>Мы не показываем рекламу и не продаем данные, поэтому Cha Qi работает по такой системе.</div> 
            <div className='subscriptionPage_sub_info_paragraph subscriptionPage_sub_info_p_3'>Это позволяет нам фокусироваться на создании классного продукта.</div>
          </div>
          <h1 className="subscriptionPage_price_header headerOne-font">199 Р в месяц</h1>
          <div className="subscriptionPage_BuySubscription_button_block">
            <button className='subscriptionPage_BuySubscription_button_block buttonOne-font'>Подписаться</button>
          </div>
      </div>
    </div>
  )
}
