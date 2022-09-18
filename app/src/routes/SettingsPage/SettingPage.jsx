import React, {useState} from 'react'
import {ReactComponent as ArrowLeftWhiteIcon} from "../../sources/icons/arrowLeftWhite.svg"
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"
import {ReactComponent as BlackStarIcon} from "../../sources/icons/BlackStarIcon.svg"
import {ReactComponent as YellowStartIcon} from "../../sources/icons/YellowStartIcon.svg"
import { ReactComponent as SmileAvatar } from '../../sources/icons/smileAvatar.svg'
import InputBar from "../../components/searchBars/inputBar/InputBar"
import BtnDefault from "../../components/buttons/BtnDefault/BtnDefault"
import { useNavigate } from 'react-router-dom'
import { SubscriptionAlert } from '../SubscriptionAlertPage/SubscriptionAlert'
import './SettingPage.css'
export default function SettingPage(props) {
    const history = useNavigate()
    // console.log(props.user);
    document.addEventListener('keydown', function(event) {
        if(event.key === "Escape") {
          props.hideSettings()
        }
      });
      const [changeDialog, setChangeDialog] = useState(null)
      
      function changeName() {
          const changeNameBlock = () => {
            return (
                <div className="settings_ChangeNameDialog_blur_wrapper">
                    <div className='settings_ChangeNameDialog_container'>
                        <div className="settings_ChangeNameDialog_closeBtn_block">
                            <button className='setting_ChangeNameDialog_closeBtn' onClick={() => setChangeDialog(null)}><CloseIcon /></button>
                        </div>
                        <div className="settings_ChangeNameDialog_header_wrapper"><h1 className='settings_ChangeNameDialog_header headerOne-font'>Как тебя зовут</h1></div>
                        <div className='setting_ChangeNameDialog_input_block'><InputBar maxLength="40" /></div>
                        <div className="settings_ChangeNameDialog_saveBtn_block"><BtnDefault onClick={() => {props.changeUserName(document.querySelector(".setting_ChangeNameDialog_input_block input").value); setChangeDialog(null)}}>Сохранить</BtnDefault></div>
                    </div>
                </div>
            )
        }
        setChangeDialog(changeNameBlock())
      }
      const [image, setImage] = useState(null)
      const onImageChange = (event) => {
        console.log("done")
		if(event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
            props.changeUserPic(URL.createObjectURL(event.target.files[0]))
		}
	}
    const [subscriptionPage, setSubscriptionPage] = useState(null)
    
    function revealSubAlert() {
        setSubscriptionPage(<SubscriptionAlert hideSubAlert={hideSubAlert} />)
    }
    
    function hideSubAlert() {
        setSubscriptionPage(null)
    }
    return (
        <div className='settingPage_blur_wrapper'>
            {changeDialog}
            {subscriptionPage}
            <div className='container settings_container'>
                <div className='settings_closeBtns_block'>
                    <button className='settings_close_btn_m' onClick={() => props.hideSettings()}><ArrowLeftWhiteIcon /></button>
                    <button className='settings_close_btn_pc' onClick={() => props.hideSettings()}><CloseIcon /></button>
                </div>
                <div className="settings_imgBlock">
                    <div className='settings_userAvatar_shape'>{props.user.userPicture ? <img className='settings_userAvatar_shape' src={props.user.userPicture} alt="Avatar" /> : <SmileAvatar /> }</div>
                        <input id="settings_changeAvatar" onChange={e => onImageChange(e)} type="file" style={{WebkitAppearance: "none"}} />
                        <label htmlFor='settings_changeAvatar' className='settings_change_user_avatar buttonOne-font'>Сменить фото</label>
                </div>
                <div className="settings_dataChangeBtn_block">
                    <section className="settings_subscription_section">
                        {props.user.isPremium ? <button className='settings_fullWidth_button settings_subscription_btn_active buttonOne-font'><YellowStartIcon /> <span className='buttonOne-font'>Подписка до {props.user.subscriptionExprireDate}</span></button> : <button className='settings_fullWidth_button settings_subscription_btn buttonOne-font' onClick={revealSubAlert}><BlackStarIcon /> <span className='buttonOne-font'>Подписка</span></button>}
                    </section>
                    <section className='settings_changeUserInfo_section'>
                        <button className='settings_fullWidth_button settings_joinedChangingButtons_1 buttonOne-font' onClick={changeName}>Сменить имя</button>
                        <div className='settings_separator_line' />
                        {/* <button className='settings_fullWidth_button settings_joinedChangingButtons_2 buttonOne-font' onClick={changePhoneNubmer}>Сменить номер</button> */}
                        <a className='settings_fullWidth_button settings_joinedChangingButtons_2 buttonOne-font' target="blank" href="https://chaqi.ru/chaqi_tea_store">Поддержать разработчиков</a>
                    </section>
                    <section className='settings_quit_section'>
                        <button onClick={() => {history("../"); document.location.reload()}} className='settings_fullWidth_button buttonOne-font'>Выйти</button>
                    </section>
                </div>
            </div>
        </div>
    )
}
