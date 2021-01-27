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


type NotFoundProps = {
  username: string
}

const NotFound: React.FC<NotFoundProps> = (props) => {
  return (
    <React.Fragment>
      <h1>We don't found user: {props.username}</h1>
      <Link to="/">Main</Link>
    </React.Fragment>
  );
}


type Comments = {
  user: string;
  value: string;
  date: string;
}

type Images = {
  id?: number;
  username?: string;
  image?: string;
  description?: string;
  isLike?: boolean;
  date?: string;
}

type UserProfile = {
  user?: string;
  image?: string;
  images: Images[];
  itsMyProfile?: boolean;
  description?: string;
  subscriber?: number;
  subscribes?: number;
  isSubscribe?: boolean;
}

const UserProfile = (props:any) =>{
  const { user } = useContext(UserContext);
  const { usersList } = useContext(UsersListContext);
  const [userProfile, setUserProfile] = useState<UserProfile>({'images' : []})
  const [reload, setReload] = useState<boolean>(false)
  const [showDeletePhoto, setShowDeletePhoto] = useState<boolean>(false);

  const { username } = props.match.params;
  useEffect( () => {
    FetchUserProfile(user.token, username)
    .then(async (res) => {
      const response:UserProfile = await res.json()
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

      <div className="images">
      {
          userProfile.images.map( (image:any,id:Number) =>
            <ImageContainer
            key={id}
            {...image}
            itsMyProfile={userProfile.itsMyProfile}
            setReload={setReload}
            setShowDeletePhoto={setShowDeletePhoto}
            />
          )
      }
      </div>

    </React.Fragment>
    :
    <NotFound username={username}/>
  );
}

export default UserProfile;
