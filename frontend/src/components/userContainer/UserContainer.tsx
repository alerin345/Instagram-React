import React, { useState, useEffect, useContext } from 'react';
import './UserContainer.css'
import Modals from './../modals/Modals'
import { UserContext } from './../userContext/UserContext'
import { FetchAddSubscribe } from './../fetch/Fetch'


function AccountsOptions(props:any) {
  const {user} = useContext(UserContext)
  const [showOptions, setShowOptions] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(props.isSubscribe ? true : false); // bug
  const { ModalAddPhoto, ModalOptions } = Modals;
  const {itsMyProfile}:any = props

  const addSubscribe = () => {
    const {username}:any = props
    FetchAddSubscribe(user.token, username)
    .then(async (res) => {
      const response = await res.json()
      console.log(response)
      setIsSubscribe((sub):any => !sub)
    })
    .catch((res) => {
      console.log("error:",res.message);
    });
  }
  return (
    itsMyProfile ?
    <React.Fragment>
      <button className="btn btn-secondary" onClick={() => setShowOptions(true)}>Options</button>
      <button className="btn btn-secondary" onClick={() => setShowAddPhoto(true)}>Add Photo</button>
      { showOptions ?
      <ModalOptions handleClose={() => setShowOptions(false)}/>
      : "" }
      { showAddPhoto ?
      <ModalAddPhoto handleClose={() => setShowAddPhoto(false)} setReload={props.setReload}/>
      : "" }
    </React.Fragment>
    :
    <React.Fragment>
      <button className="btn btn-primary" onClick={() => addSubscribe()}>{isSubscribe ?  "unsubscribe" : "subscribe"}</button>
    </React.Fragment>
  );
}


function UserContainer(props: any) {
  const {user} = useContext(UserContext)
  return (
    <div className="userContainer">
      <div className="flex-column">
        <img src={props.image} alt="" />
      </div>
      <div className="flex-column">
        <h1>{props.username}</h1>
        <p>{props.description}</p>
        <AccountsOptions
        itsMyProfile={props.itsMyProfile}
        username={props.username}
        userProfile={props.userProfile}
        setUserProfile={props.setUserProfile}
        setReload={props.setReload}
        isSubscribe={props.isSubscribe}
        />
        <p>Subscriber (ile ma obserwujacych): {props.subscriber}</p>
        <p>Subscrbes (ile on obserwuje): {props.subscribes}</p>
      </div>
    </div>
  );
}

export default UserContainer;
