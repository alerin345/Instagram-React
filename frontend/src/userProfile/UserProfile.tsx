import React, { useEffect, useContext, useState } from 'react';
import './UserProfile.scss';
import Menu from './../components/menu/Menu';
import UserContainer from './../components/userContainer/UserContainer';
import ImageContainer from './../components/imageContainer/ImageContainer';
import UserImages from './../components/userImages/UserImages';
import Modals from './../components/modals/Modals';
import { Link } from "react-router-dom"
import csrftoken from './../components/csrftoken/csrftoken'
import { UserContext } from './../components/userContext/UserContext'
import { UsersListContext } from './../components/usersListContext/UsersListContext'
import { FetchUserProfile } from './../components/fetch/Fetch'
import type { NotFoundProps, UserProfile as UserProfileT } from "Types/Types"

const NotFound: React.FC<NotFoundProps> = ({ username }) => {
  return (
    <React.Fragment>
      <h1>We don't found user: {username}</h1>
      <Link to="/">Main</Link>
    </React.Fragment>
  );
}



const UserProfile = (props:any) =>{
  const { user } = useContext(UserContext);
  const { usersList } = useContext(UsersListContext);
  const [userProfile, setUserProfile] = useState<UserProfileT>({'images' : []})
  const [reload, setReload] = useState<boolean>(false)
  const [showDeletePhoto, setShowDeletePhoto] = useState<boolean>(false);

  const { username } = props.match.params;
  useEffect( () => {
    FetchUserProfile(user.token, username)
    .then(async (res) => {
      const response:UserProfileT = await res.json()
      await setUserProfile(response)
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

      { showDeletePhoto ?
      <Modals.ModalDeletePhoto
      handleClose={() => setShowDeletePhoto(false)}
      setReload={setReload}
      />
      : "" }

      <UserImages
        images={userProfile.images}
        itsMyProfile={userProfile.itsMyProfile}
        setReload={setReload}
        setShowDeletePhoto={setShowDeletePhoto}
       />

    </React.Fragment>
    :
    <NotFound username={username}/>
  );
}

export default UserProfile;
