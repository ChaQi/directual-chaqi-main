import { useEffect, useState } from "react"
import Directual from 'directual-api';
import { useAuth } from '../../auth' // auth.js is a React-wrapper for directual-api authentication methods
//...



export default function PostTest() {
	let api = new Directual({ apiHost: '/' })
	//...
	let dataStructure = 'WebUser' // todo: insert here Sysname of your data structure
	let endpoint = 'create_user' // todo: insert here Method name of your API-endpoint
	//...
	let auth = useAuth();
	// async function config() {
	// 	api = new Directual({ apiHost: '/' })
	// 	//...
	// 	dataStructure = 'WebUser' // todo: insert here Sysname of your data structure
	// 	endpoint = 'create_user' // todo: insert here Method name of your API-endpoint
	// }
	// Hooks for handling state
	const [response, setResponse] = useState(); // API response
	const [status, setStatus] = useState(); // Request status
	const [badRequest, setBadRequest] = useState(); // API error message
	const [loading, setLoading] = useState(false); // Loader
	const [showForm, setShowForm] = useState(true); // Show/hide the form
	const [formPayload, setFormPayload] = useState({email: "lobby1vs1@yandex.ru", password: "GABEN's BULLSHIT", phone: "12121212"}); // Data to send. Here we can add userID: auth.user by default
	
	// Reset the form
	const resetForm = () => {
		setResponse()
		setStatus()
		setBadRequest()
		setShowForm(true)
		setFormPayload({email: "lobby1vs1@yandex.ru", password: "GABEN's BULLSHIT", phone: "12121212"}) // Don't forget to include userID: auth.user, if needed
	  }
	
	// POST-request
	function postData() {
		setLoading(true)
		setShowForm(false)
		api
			// Data structure
			.structure(dataStructure)
			// POST request + payload + query params:
			.setData(endpoint, formPayload,
			{ sessionID: auth.sessionID })
			.then((response) => {
				setResponse(response.result)
				setStatus(response.status)
				setLoading(false)
				console.warn(response.result, response.status)
			})
			.catch((e) => {
				// handling errors
				setLoading(false)
				console.log(e.response)
				setBadRequest({
				httpCode: e.response.status,
				msg: e.response.data.msg
				})
			})
		}
	function getTeas() {
		setLoading(true)
		setShowForm(false)
		let dataStructure = "tea"
		let endpoint = "get_mainpage_teas"
		let formPayload = {teaName: "Дяньхун Маофен", teaCategory: ['красный', 'расслабление', 'сон'], teaTags: ["расслабляет", "кислый", "плотный"], teaImg: "/img/teaImg.png", teaInfo: "Гамма-аминомасляная кислота — широко применяемое в медицине вещество. В организме она участвует в нервной деятельности и работе мозга. Искусственные аналоги кислоты синтезированы давно, но они плохо усваиваются организмом и вызывают побочные эффекты. Японские ученые много лет искали природный источник ГАМК. И наконец, они обнаружили, что при определенном способе обработки эта кислота естественным образом накапливается в чае.", teaRate: 3}
		api
			// Data structure
			.structure(dataStructure)
			// POST request + payload + query params:
			.getData(endpoint,
			// { sessionID: auth.sessionID }
			)
			.then((response) => {
				setResponse(response.result)
				setStatus(response.status)
				setLoading(false)
				console.warn(response, response.status)
				setResponse(response.payload)
				// return response
			})
			.catch((e) => {
				// handling errors
				setLoading(false)
				console.log(e.response)
				setBadRequest({
				httpCode: e.response.status,
				msg: e.response.data.msg
				})
			})
		}
	return (
		<div>
			<button onClick={() => {
				// config().then(() => {
					auth.login("bersival", "root").then(() => {
						console.log(
							auth, // returns user ID
							auth.sessionID, // returns user session ID
							auth.isAutorised(), // returns true if user is authorised
							auth.hasRole('role')) // returns true if user.role == 'role' (see user management further)
						// postData()
						getTeas()
						// .then(res => console.log(res))
					})
				// })
			}}>Click</button>
		</div>
	)
}