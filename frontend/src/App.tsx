import React, { useContext, useEffect } from 'react';
import './App.css';

import Menu from './components/menu/Menu';
import UserSearchBox from './components/userSearchBox/UserSearchBox';
import ImageContainer from './components/imageContainer/ImageContainer';
import {UserContext} from './components/userContext/UserContext'
import { UsersListContext } from './components/usersListContext/UsersListContext'
import csrftoken from './components/csrftoken/csrftoken'
import { Link } from "react-router-dom"
import { FetchUsers } from './components/fetch/Fetch'

function App() {
  const {user} = useContext(UserContext)
  const {usersList, setUsersList} = useContext(UsersListContext)

  useEffect(() => {
    FetchUsers(user.token)
    .then(async (res) => {
      const response = await res.json()
      const { usersList } = await response
      await setUsersList(usersList)
      await localStorage.setItem('usersList',JSON.stringify(usersList))
      await console.log(usersList)
    })
    .catch((res) => {
        console.log("error:",res.message);
    });
  }, [user])


  return (
    <div className="App">
      <Menu />
      <h1>{JSON.stringify(user)}</h1>
      <h1>{JSON.stringify(usersList)}</h1>
      <h2>{user.username}</h2>
      <Link to="alerin345" />
      <UserSearchBox />
      { /* loop*/ }
      {/*
      <ImageContainer username="alerin345" image="https://ecsmedia.pl/c/fototapeta-husky-syberyjski-8-elementow-368x248-cm-b-iext51388152.jpg"
      description="blabla" likesCount="1" commentsCount="5" date="5 grudnia"/>
      */}
      {/* end loop */}
    </div>
  );
}

export default App;
