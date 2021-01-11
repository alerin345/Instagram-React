import React, { useContext, useEffect, useState } from 'react';
import './App.css';

import Menu from './components/menu/Menu';
import UserSearchBox from './components/userSearchBox/UserSearchBox';
import ImageContainer from './components/imageContainer/ImageContainer';
import {UserContext} from './components/userContext/UserContext'
import { UsersListContext } from './components/usersListContext/UsersListContext'
import csrftoken from './components/csrftoken/csrftoken'
import { Link } from "react-router-dom"
import { FetchUsers, FetchSubscribedImages} from './components/fetch/Fetch'

function App() {
  const {user} = useContext(UserContext)
  const {usersList, setUsersList} = useContext(UsersListContext)
  const [images,setImages] = useState([])

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

    FetchSubscribedImages(user.token)
    .then(async (res:any) => {
          const response = await res.json()
          await setImages(response.images)
          await console.log(response)
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
      { images.map( (image:any,id:number) =>
        <ImageContainer
        key={id}
        {...image}
        />
      )
      }
      {/* end loop */}
    </div>
  );
}

export default App;
