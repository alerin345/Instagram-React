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
import { DeleteImageContext } from "./components/deleteImageContext/DeleteImageContext"
import { UsersListContext } from "./components/usersListContext/UsersListContext"
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)


function Index(props:any) {
  const [user, setUser]:any = useState(null)
  const [usersList, setUsersList]:any = useState(null)
  const [deleteImage, setDeleteImage]:any = useState(null)
  const providerValue = useMemo(() => ({user,setUser}), [user, setUser]);
  const providerValue2 = useMemo(() => ({usersList,setUsersList}), [usersList, setUsersList]);
  const providerValue3 = useMemo(() => ({deleteImage,setDeleteImage}), [deleteImage, setDeleteImage]);
  const localValidate:any = localStorage.getItem("user")
  const localValidate2:any = localStorage.getItem("usersList")
  useEffect( () => {
    try {
      setUser(JSON.parse(localValidate) || null)
      setUsersList(JSON.parse(localValidate2) || null)
    }
    catch (e) {
      setUser(null)
      setUsersList(null)
    }
  }, [])
return (
    <Router>

      <UserContext.Provider value={providerValue}>
        <UsersListContext.Provider value={providerValue2}>
            <DeleteImageContext.Provider value={providerValue3}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                <ProtectedRoute exact path="/" component={App} />
                <ProtectedRoute path="/accounts/profileSettings" component={ChangeProfileSettings} />
                <ProtectedRoute path="/accounts/changePassword" component={ChangePassword} />
                <ProtectedRoute path="/:username" component={UserProfile} />
              </Switch>
            </DeleteImageContext.Provider>
        </UsersListContext.Provider>
      </UserContext.Provider>
    </Router>
  )
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)


reportWebVitals();
