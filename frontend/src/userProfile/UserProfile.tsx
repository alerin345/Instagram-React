import React, { useEffect, useContext, useState } from 'react';
import './UserProfile.css';
import Menu from './../components/menu/Menu';
import UserContainer from './../components/userContainer/UserContainer';
import ImageContainer from './../components/imageContainer/ImageContainer';
import { Link } from "react-router-dom"
import csrftoken from './../components/csrftoken/csrftoken'
import { UserContext } from './../components/userContext/UserContext'
import { UsersListContext } from './../components/usersListContext/UsersListContext'

function NotFound(props:any) {
  return (
    <React.Fragment>
      <h1>We don't found user: {props.username}</h1>
      <Link to="/">Main</Link>
    </React.Fragment>
  );
}

function UserProfile(props:any) {
  const { user } = useContext(UserContext);
  const { usersList } = useContext(UsersListContext);
  const [userProfile, setUserProfile]:any[] = useState({'images' : []})
  const [images, setImages]:any[] = useState([])
  // const users = ['alerin','alerin345', 'alerin450', 'denis']
  // const [isUser, setUsers] = useState(null)
  const { username } = props.match.params;
  useEffect( () => {
    console.log(username)
    fetch(`http://localhost:8000/api/userProfile/${username}/`, {
      // credentials: 'include',
      method: 'GET',
      // mode: 'same-origin',
      // mode: 'no-cors',
      headers: {
        // "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Authorization': `Token ${user.token}`
      },
      // body: JSON.stringify("")

    })
    .then(async (res) => {
      const response = await res.json()
      await console.log(response)
      await setUserProfile(response)
      // await console.log(response)
    })
    .catch((res) => {
        console.log("error:",res.message);
    });
  }, [])
  return (
    (usersList.indexOf(username) !== -1) ?
    <React.Fragment>
      <Menu />
      <UserContainer username={username} image="https://ecsmedia.pl/c/fototapeta-husky-syberyjski-8-elementow-368x248-cm-b-iext51388152.jpg"
      description="blabla" subscriber="1" subscribes="5" />

      { /* loop*/ }
      {
          userProfile.images.map( (image:any,id:any) =>
            <ImageContainer key={id}
            imageId={image.id}
            image={image.image}
            isLike={image.isLike}
            description={image.description}
            likesCount={image.likesCount}
            commentsCount={image.commentsCount}
            comments={image.comments}
            date={image.date} />
          )
    }
      {/* end loop */}
    </React.Fragment>
    :
    <NotFound username={username}/>
  );
}

export default UserProfile;
