import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login/Login';
import Register from './register/Register';
import UserProfile from './userProfile/UserProfile';
import ChangeProfileSettings from './changeProfileSettings/ChangeProfileSettings';
import ChangePassword from './changePassword/ChangePassword';
import { Route, Switch, /*Link,*/ BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from "./components/userContext/UserContext"
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute"

function Index(props:any) {
  const [user, setUser]:any = useState(null)
  const providerValue = useMemo(() => ({user,setUser}), [user, setUser]);
  const localValidate:any = localStorage.getItem("user")
  useEffect( () => {
      setUser(JSON.parse(localValidate) || null)
  }, [])
return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            <ProtectedRoute exact path="/" component={App} />
            <ProtectedRoute path="/accounts/profileSettings" component={ChangeProfileSettings} />
            <ProtectedRoute path="/accounts/changePassword" component={ChangePassword} />
            <ProtectedRoute path="/:username" component={UserProfile} />
          </Switch>
      </UserContext.Provider>
    </Router>
  )
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
