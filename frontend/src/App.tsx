import React, { useContext, useEffect, useState } from 'react';
import './App.css';

import Menu from './components/menu/Menu';
import UserSearchBox from './components/userSearchBox/UserSearchBox';
import ImageContainer from './components/imageContainer/ImageContainer';
import {UserContext} from './components/userContext/UserContext'
import { UsersListContext } from './components/usersListContext/UsersListContext'
import { Link } from "react-router-dom"
import { FetchUsers, FetchSubscribedImages} from './components/fetch/Fetch'
import type { Images } from "Types/Types"

function App() {
  const {user} = useContext(UserContext)
  const {usersList, setUsersList}:any = useContext(UsersListContext)
  const [images,setImages] = useState<Images[]>([])

  useEffect(() => {
    FetchUsers(user.token)
    .then(async (res) => {
      const response = await res.json()
      console.log('retypes:',response)
      const { usersList } = await response
      await setUsersList(usersList)
      localStorage.setItem('usersList',JSON.stringify(usersList))
      console.log(usersList)
    })
    .catch((res) => {
        console.log("error:",res.message);
    });

    FetchSubscribedImages(user.token)
    .then(async (res:any) => {
          const response = await res.json()
          setImages(response.images)
          console.log(response)
        })
        .catch((res) => {
            console.log("error:",res.message);
        });
  }, [user])


  return (
    <div className="App">
      <Menu />
      <h2>Logged in to: {user.username}</h2>
      <Link to="alerin345" />
      <UserSearchBox />
      <div className="images">
      {
        images.length != 0 ? images.map( (image:any,id:number) =>
        <ImageContainer
        key={id}
        {...image}
        />
      )
      : ""
      }
      </div>
    </div>
  );
}

export default App;
