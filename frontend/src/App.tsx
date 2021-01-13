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


type Images = {
  id: number;
  username: string;
  image: string;
  description: string;
  isLike: boolean;
  date: string;
}

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
      <h2>Logged in to: {user.username}</h2>
      <Link to="alerin345" />
      <UserSearchBox />
      { /* loop*/ }
      <div className="images">
      { images.map( (image:any,id:number) =>
        <ImageContainer
        key={id}
        {...image}
        />
      )
      }
      </div>
      {/* end loop */}
    </div>
  );
}

export default App;
