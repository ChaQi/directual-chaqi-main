import React, {useState, useEffect} from 'react'

import './index.css';
import "./fonts/fonts.css"

import {ReactComponent as AddIcon} from "./sources/icons/add.svg"
import {ReactComponent as CupIcon} from "./sources/icons/cup.svg"
import {ReactComponent as MainIcon} from "./sources/icons/main.svg"
import {ReactComponent as MainYellowIcon} from "./sources/icons/mainYellow.svg"

import MainPage from "./routes/MainPage/MainPage.js"
import CardPage from "./routes/CardPage/CardPage.js"
import ProfilePage from "./routes/ProfilePage/ProfilePage.jsx"
import АuthorizationPage from "./routes/АuthorizationPage/АuthorizationPage.js"

import SearchBar from "./components/searchBars/searchBar/SearchBar.js"
import Loader from "./components/loader/Loader"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import DiaryCardPage from './routes/DiaryCardPage/DiaryCardPage';
import LoginPageTesting from './routes/LoginPageTesting/LoginPageTesting';
import PostTest from "./routes/PostTest/PostTest"
import Directual from 'directual-api';
import { useAuth } from './auth';
import LoginPage from './routes/LoginPage/LoginPage';

function App() {
  const api = new Directual({appID: "f486a45f-2546-4f15-9c4e-1cdb98762ed3"})
  const auth = useAuth();
  const [user, setUser] = useState({
    userPicture: "/img/profile-img2.png",
    userName: "Ксюша",
    tastedTeasObj: [
      {teaName: "Ван Гун", teaCategory: ['пуэр', 'расслабление', 'сон'], teaId: 100, teaTags: ["расслабляет", "сухофрукты", "цветочный"], teaImgPath: "/img/teaImg.png", userTeaRate: 3, userReviewDate: "8 мая 2022", userReviewTime: "12:34", userReviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"]},
      {teaName: "Гу И Легенда", teaCategory: ['пуэр', 'расслабление', 'сон'], teaId: 101, teaTags: ["расслабляет", "сухофрукты", "цветочный"], teaImgPath: "/img/teaImg.png", userTeaRate: 4, userReviewDate: "10 апреля 2022", userReviewTime: "05:04", userReviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"]},
      {teaName: "Юэ Гуан Бай", teaCategory: ['белый', 'расслабление', 'сон'], teaId: 102, teaTags: ["расслабляет", "сухофрукты", "цветочный"], teaImgPath: "/img/teaImg.png", userTeaRate: 1, userReviewDate: "12 июля 2022", userReviewTime: "10:12", userReviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"]},
      {teaName: "Дянь Хун Маофен", teaCategory: ['красный', 'расслабление', 'сон'], teaId: 104, teaTags: ["расслабляет", "сухофрукты", "цветочный"], teaImgPath: "/img/teaImg.png", userTeaRate: 0, userReviewDate: "1 августа 2022", userReviewTime: "13:58", userReviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"]},
    ],
    wantedTeasObj: [
      {teaName: "Юэ гуан бай 2018", teaCategory: ['белый', 'расслабление', 'сон'], teaId: 1231, teaTags: ["расслабляет", "кислый", "плотный"], teaImgPath: "/img/teaImg.png", teaDescription: "Гамма-аминомасляная кислота — широко применяемое в медицине вещество. В организме она участвует в нервной деятельности и работе мозга. Искусственные аналоги кислоты синтезированы давно, но они плохо усваиваются организмом и вызывают побочные эффекты. Японские ученые много лет искали природный источник ГАМК. И наконец, они обнаружили, что при определенном способе обработки эта кислота естественным образом накапливается в чае.", teaRate: 3,
      teaReviews: [{reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}], },
      
      {teaName: "Менхай Да И v93", teaCategory:  ['пуэр', 'бодрость', 'разговоры'], teaId: 1231, teaTags: ["расслабляет", "кислый", "плотный"], teaImgPath: "/img/teaImg.png", teaDescription: "Гамма-аминомасляная кислота — широко применяемое в медицине вещество. В организме она участвует в нервной деятельности и работе мозга. Искусственные аналоги кислоты синтезированы давно, но они плохо усваиваются организмом и вызывают побочные эффекты. Японские ученые много лет искали природный источник ГАМК. И наконец, они обнаружили, что при определенном способе обработки эта кислота естественным образом накапливается в чае.", teaRate: 3,
      teaReviews: [{reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}], },
      
      {teaName: "Менку Гу Хуа 2006", teaCategory:  ['пуэр', 'расслабление', 'медитация', 'отдых'], teaId: 1231, teaTags: ["расслабляет", "кислый", "плотный"], teaImgPath: "/img/teaImg.png", teaDescription: "Гамма-аминомасляная кислота — широко применяемое в медицине вещество. В организме она участвует в нервной деятельности и работе мозга. Искусственные аналоги кислоты синтезированы давно, но они плохо усваиваются организмом и вызывают побочные эффекты. Японские ученые много лет искали природный источник ГАМК. И наконец, они обнаружили, что при определенном способе обработки эта кислота естественным образом накапливается в чае.", teaRate: 3,
      teaReviews: [{reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}], },
      
      {teaName: "Лун Дзин 2022", teaCategory: ['зеленый', 'бодрость', 'вдохновение'], teaId: 1231, teaTags: ["расслабляет", "кислый", "плотный"], teaImgPath: "/img/teaImg.png", teaDescription: "Гамма-аминомасляная кислота — широко применяемое в медицине вещество. В организме она участвует в нервной деятельности и работе мозга. Искусственные аналоги кислоты синтезированы давно, но они плохо усваиваются организмом и вызывают побочные эффекты. Японские ученые много лет искали природный источник ГАМК. И наконец, они обнаружили, что при определенном способе обработки эта кислота естественным образом накапливается в чае.", teaRate: 3,
      teaReviews: [{reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}], },
      
      {teaName: "Лао Цзюньшань Иньчжэнь, 2005", teaCategory: ['желтый', 'бодрость', 'вдохновение'], teaId: 1231, teaTags: ["расслабляет", "кислый", "плотный"], teaImgPath: "/img/teaImg.png", teaDescription: "Гамма-аминомасляная кислота — широко применяемое в медицине вещество. В организме она участвует в нервной деятельности и работе мозга. Искусственные аналоги кислоты синтезированы давно, но они плохо усваиваются организмом и вызывают побочные эффекты. Японские ученые много лет искали природный источник ГАМК. И наконец, они обнаружили, что при определенном способе обработки эта кислота естественным образом накапливается в чае.", teaRate: 3,
      teaReviews: [{reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}, {reviewDate: "8 мая 2022", reviewTime: "12:34", reviewAuthor: "Ксюша", authorPic: "/img/profile-img2.png", reviewText: "Чай очень понравился! отличается от всех остальных чаев,не могу назвать его зеленым-в этом понимании у меня в голове Те гуань инь)) а этот по моему вкусу что то среднее между зеленым и черным.он успокаивает и концентрирует, теперь в моих любимчиках)", reviewPictures: ["/img/reviewPic1.png", "/img/reviewPic2.png"], reviewLikes: 3, reviewDislikes: 0}], },
    ],
    isPremium: false,
    isAdmin: true,
    subscriptionExprireDate: "12 отк 2023",
    addedFirstTea: false, // If value is false, by adding first tea, user will invoke welcomeSubPage, and this value will be true forever
    addedTeas: 2, // THIS VALUE NEVER DECREASES(if it value is higher than 10, user cannot add more teas without sub)
  })
  
  const [preloader, setPreloader] = useState(null)
  function showPreloader() {
    setPreloader(<Loader />)
    setTimeout(() => {
      document.querySelector(".main_loader_container").classList.add("unactive")
      document.querySelector(".app-wrapper").classList.remove("unactive")
    }, 2000)
    setTimeout(() => {
      setPreloader(null)
    }, 3500)
  }
  useEffect(() => {
    showPreloader()
  }, [])
  
  
  
  
  
  
  //...
  const dataStructure = 'WebUser' // todo: insert here Sysname of your data structure
  const endpoint = 'create_user' // todo: insert here Method name of your API-endpoint
  //...
  // Auth context:
  // auth.user // returns user ID
  // auth.sessionID // returns user session ID
  // auth.isAutorised() // returns true if user is authorised
  // auth.hasRole('role') // returns true if user.role == 'role' (see user management further)
  //...
  function createUser(username, email, password) {
    let payload = {} // Request payload
    api
    // Name of Data structure (table) in the Database
    .structure(dataStructure)
    // POST request + payload + query params
    .setData(endpoint, {id: email, firstName: username, password: password})
    .then((response) => {
      // handling response
      console.log(response)
    })
    .catch((e) => {
      // handling errors
      console.error("!!!!!!!!!!!!!!!!!!!" + e)
    })
  }
  
  function getUser(email, password) {
      auth.login(email, password)
      .then((res) => {
        api
        // Name of Data structure (table) in the Database
        .structure(dataStructure)
        // POST request + payload + query params
        .getData(endpoint, {email: email})
        .then((response) => {
          // handling response
          console.log(response)
        })
        .catch((err) => {
          // handling errors
          console.error("!!!!!!!!!!!!!!!!!!!" + err)
        })
        
      })
      .catch(err => {
        console.error("!!!!!!!!!!!!!!!!!!!" + err)
      })
      console.log(auth)
  }









  const [focusVar, setFocusVar] = useState(false)
  document.addEventListener('keydown', function(event) {
    if(event.key === "Escape") {
      setAuthorizationBlock(null)
    }
  });

  // 
  
  // hideFunctions
  let hideAuth = () => setAuthorizationBlock(null);
  let hideLogin = () => setAuthorizationBlock(null);
  function changeValidationPage(page) {
    if(page === "authpage") {
      setAuthorizationBlock(<LoginPage getUser={getUser} hideLogin={hideLogin} changeValidationPage={changeValidationPage} />)
    }
    else if(page === "loginpage") {
      setAuthorizationBlock(<АuthorizationPage createUser={createUser} hideAuth={hideAuth} changeValidationPage={changeValidationPage} />)
    }
  }
  // authBlock
  const [authorizationBlock, setAuthorizationBlock] = useState(<АuthorizationPage createUser={createUser} hideAuth={hideAuth} changeValidationPage={changeValidationPage} />)
  // const [loginBlock, setLoginBlock] = useState(null)


  return (
    <div className="app app-container">
      {!auth.isAuthorized ? authorizationBlock : ""}
      {/* {!auth.isAuthorized ? loginBlock : ""} */}
      {/* <PostTest /> */}
      {preloader}
      <div className="app-wrapper unactive" onClick={() => console.log(auth)}>
        {/* {authorizationBlock} */}
        <Router>
          <Routes>
              <Route path="/" element={<MainPage user={user} isFocused={focusVar} />} />
              <Route path="/add" element={<h1 style={{color: "#fff", fontSize: "5vmin", position: "absolute", top: "50%", transform: "translateY: -50%"}} className="headerOne-font">Page in progress</h1>} />
              <Route path="/profile" element={<ProfilePage user={user} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App