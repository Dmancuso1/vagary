import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Globe from "./components/Globe";
import "leaflet/dist/leaflet.css";
import "./App.css";
import "./components/LayoutMain.scss"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import WelcomeToCity from "./components/WelcomeToCity";
import CircleMenu from "./components/CircleMenu";
import Learn from "./components/learn/Learn";
import Explore from "./components/explore/Explore";
import TranslationQuiz from "./components/learn/TranslationQuiz";
import MyRoom from "./components/MyRoom";

export default function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const localUser = localStorage.getItem("email")
    const localToken = localStorage.getItem("token")
    const localId = localStorage.getItem("userId")
    console.log(localUser, localToken, userId)
    if (localUser && localToken && localId) {
      setUser(localUser)
      setToken(localToken)
      setUserId(localId)
    }
  },[])

  const logout = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setUser(null)
    setToken(null)
    setUserId(null)
  }

  return (
    <Router>
      <div>
        <CircleMenu logout={logout} user={user}/>
      </div>
      <div>
        <Switch>
          <Route path="/sign-in" component={() =><SignIn setUser={setUser} setToken={setToken} setUserId={setUserId}/>} />
          <Route path="/sign-up" component={() =><SignUp setUser={setUser} setToken={setToken} setUserId={setUserId}/>} />
          <Route path="/my-room" component={() =><MyRoom user={user} token={token} userId={userId} />} />
          <Route path="/city" component={City}/>:
          {/*template literal with city name*/}
          <Route path="/learn" component={Learn} />
          <Route path="/explore" component={Explore} />
          <Route path="/quiz" component={TranslationQuiz} />
          <Route exact path="/" component={() =><Globe user={user} token={token} userId={userId}/>} />
        </Switch>
      </div>
    </Router>
  );
}

function City(props) {
  const city = props.location.state.city.marker.cityName;
  const coordinates = props.location.state.city.marker.coordinates;
  const language = props.location.state.city.marker.language;
  const city_id = props.location.state.city.marker.city_id;
  const userId = props.location.state.city.userData.userId;

  return (
    <div className={`background--${city}`}>
      <WelcomeToCity
        city={city}
        coordinates={coordinates}
        language={language}
        city_id={city_id}
        userId={userId}
      />
    </div>
  );
}

