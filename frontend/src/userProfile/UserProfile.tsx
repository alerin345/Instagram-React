import React, { useEffect, useContext, useState } from 'react';
import './UserProfile.css';
import Menu from './../components/menu/Menu';
import UserContainer from './../components/userContainer/UserContainer';
import ImageContainer from './../components/imageContainer/ImageContainer';
import Modals from './../components/modals/Modals';
import { Link } from "react-router-dom"
import csrftoken from './../components/csrftoken/csrftoken'
import { UserContext } from './../components/userContext/UserContext'
import { UsersListContext } from './../components/usersListContext/UsersListContext'
import { FetchUserProfile } from './../components/fetch/Fetch'

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
  const [reload, setReload]:any = useState(false)
  const [showDeletePhoto, setShowDeletePhoto] = useState(false);
  // const users = ['alerin','alerin345', 'alerin450', 'denis']
  // const [isUser, setUsers] = useState(null)
  const { username } = props.match.params;
  useEffect( () => {
    // console.log(username)
    FetchUserProfile(user.token, username)
    .then(async (res) => {
      const response = await res.json()
      await console.log(response)
      await setUserProfile(response)
      // await console.log(response)
    })
    .catch((res) => {
        console.log("error:",res.message);
    });
  }, [reload])
  return (
    (usersList.indexOf(username) !== -1) ?
    <React.Fragment>
      <Menu />
      <UserContainer username={username}
      itsMyProfile={userProfile.itsMyProfile}
      image={userProfile.image}
      description={userProfile.description}
      subscriber={userProfile.subscriber}
      subscribes={userProfile.subscribes}
      isSubscribe={userProfile.isSubscribe}
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      setReload={setReload}
       />

      { /* loop*/ }

      { showDeletePhoto ?
      <Modals.ModalDeletePhoto
      handleClose={() => setShowDeletePhoto(false)}
      setReload={setReload}
      />
      : "" }
      {
          userProfile.images.map( (image:any,id:any) =>
            <ImageContainer
            key={id}
            {...image}
            itsMyProfile={userProfile.itsMyProfile}
            setReload={setReload}
            setShowDeletePhoto={setShowDeletePhoto}
            />
          )
    }
      {/* end loop */}
    </React.Fragment>
    :
    <NotFound username={username}/>
  );
}

export default UserProfile;
