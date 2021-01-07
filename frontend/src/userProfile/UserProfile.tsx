import React from 'react';
import './UserProfile.css';
import Menu from './../components/menu/Menu';
import UserContainer from './../components/userContainer/UserContainer';
import ImageContainer from './../components/imageContainer/ImageContainer';
import { Link } from "react-router-dom"

function NotFound(props:any) {
  return (
    <React.Fragment>
      <h1>We don't found user: {props.username}</h1>
      <Link to="/">Main</Link>
    </React.Fragment>
  );
}

function UserProfile(props:any) {
  let users = ['alerin','alerin345', 'alerin450', 'denis']
  let param = props.match.params;
  console.log(param)
  return (
    (users.indexOf(param.username) !== -1) ?
    <React.Fragment>

      <Menu />
      <UserContainer username={param.username} image="https://ecsmedia.pl/c/fototapeta-husky-syberyjski-8-elementow-368x248-cm-b-iext51388152.jpg"
      description="blabla" subscriber="1" subscribes="5" />

      { /* loop*/ }
      <ImageContainer image="https://ecsmedia.pl/c/fototapeta-husky-syberyjski-8-elementow-368x248-cm-b-iext51388152.jpg"
      description="blabla" likes="1" comments="5" date="5 grudnia"/>
      {/* end loop */}
    </React.Fragment>
    :
    <NotFound username={param.username}/>
  );
}

export default UserProfile;
