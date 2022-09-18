import {useState} from "react"
import { ProvideAuth, useAuth, authContext } from '../../auth'
import Directual from "directual-api"
import "./LoginPageTesting.css"
import {ReactComponent as ArrowLeftWhiteIcon} from "../../sources/icons/arrowLeftWhite.svg"
import {ReactComponent as CloseIcon} from "../../sources/icons/close.svg"
import BtnDefault from "../../components/buttons/BtnDefault/BtnDefault.js"
import InputBar from "../../components/searchBars/inputBar/InputBar"

export default function LoginPageTesting(props) {
    const [username, setUsername] = useState('bersival');
    const [password, setPassword] = useState('root');
    const [error, setError] = useState('');

    const auth = useAuth();

    let login = () => {
        auth.login(username, password).then(() => {
            
        }).catch(e => {
            setError("You login or password is incorrect");
        })
        return false
    }

	const [loginText, setLoginText] = useState(props?.loginText ? props?.loginText : "Чтобы твоя коллекция не потерялась")
	console.log(loginText + "!")

    const authContext = useAuth(); // here is the difference!
	function genLoginPage() {
        // return (
        //     <div className="loginPage_blur_wrapper">
        //             <div className="loginPage_quit_btn_container_m"><button className="loginPage_quit_btn" onClick={() => setLoginPage(props.hideAuth)}><CloseIcon /></button></div>
                    
        //         <div className="container loginPage loginPage_container">
        //             <div className="loginPage_quit_btn_container_d"><button className="loginPage_quit_btn" onClick={() => setLoginPage(props.hideAuth)}><CloseIcon /></button></div>
		// 			<h1 className="loginPage_header headerOne-font">{loginText}, войди <br />с помощью Telegram</h1>
        //             <div className="loginPage_input_login_block">
        //                 <InputBar onChange={(e) => {
        //                     setUsername(e.target.value)
        //                 }} />
        //                 <InputBar onChange={(e) => {
        //                     setPassword(e.target.value)
        //                 }} />
        //                 {error && <div className="error">{error}</div>}
        //                 {error && alert(error)}

        //             </div>
		// 			<div onClick={login} className="loginPage_reg_with_telegram_form"><BtnDefault>Войти</BtnDefault></div>
        //         </div>
        //     </div>
        // )
        return (
                <div className="loginPage_blur_wrapper">
                    <div className="loginPage_quit_btn_container_m"><button className="loginPage_quit_btn" onClick={() => setLoginPage(props.hideAuth)}><CloseIcon /></button></div>
                    <div className="container loginPage loginPage_container">
                        <h1>Page with hidden content</h1>

                        <p>This is <b>public</b> content. Try to login and see some hidden text!</p>

                        {authContext.isAutorised() &&
                            <p>This content is visible for <b>authorised users only</b></p>}

                        {authContext.hasRole('admin') &&
                            <p>This content is visible for a user with a <b>acertain role</b></p>}

                    </div>
                </div>
        )
    }
    const [loginPage, setLoginPage] = useState(genLoginPage())
    return (
        loginPage
    )
}