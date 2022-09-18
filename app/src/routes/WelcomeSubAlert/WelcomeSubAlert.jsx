import React from 'react'
import {ReactComponent as CloseIcon} from "../../sources/icons/close-black.svg"
import {ReactComponent as BlackStarIcon} from "../../sources/icons/BlackStarIcon.svg"
import "./subBg.png";
import "./WelcomeSubAlert.css"

export const WelcomeSubAlert = (props) => {
  return (
    <div className="WelcomeSubAlert_blur_wrapper">
      <div className='container WelcomeSubAlert_container' style={{backgroundImage: "url('/img/subBg.png')"}}>
          <div className="welcomeSubPage_closeBtn_block">
            <button className='welcomeSubPage_closeBtn' onClick={props.hideSubAlert}><CloseIcon /></button>
          </div>
          <div className='welcomeSubPage_blackStarIcon'><BlackStarIcon /></div>
          <div className="welcomeSubPage_sub_info headerTwo-font">
            <div className='welcomeSubPage_sub_info_paragraph welcomeSubPage_sub_info_p_1'>Привет</div>
            <div className='welcomeSubPage_sub_info_paragraph welcomeSubPage_sub_info_p_2'>Ты можешь добавить 10 чаев в свою коллекцию, а дальше добавлять по 2 чая в неделю или купить подписку на неограниченное добавление.</div> 
            <div className='welcomeSubPage_sub_info_paragraph welcomeSubPage_sub_info_p_3'>Такая система позволяет нам не показывать рекламу, а вам в любом случае пользоваться классным приложением.</div>
          </div>
          <h1 className="welcomeSubPage_price_header headerOne-font">199 Р в месяц</h1>
          <div className="welcomeSubPage_BuySubscription_button_block">
            <button className='welcomeSubPage_testChaQi_button buttonOne-font'>Пока еще потестирую</button>
            <button className='welcomeSubPage_BuySubscription_button buttonOne-font'>Подписаться сразу же</button>
          </div>
      </div>
    </div>
  )
}
