import React, { useContext } from 'react';
import './App.css';

import Menu from './components/menu/Menu';
import UserSearchBox from './components/userSearchBox/UserSearchBox';
import ImageContainer from './components/imageContainer/ImageContainer';
import {UserContext} from './components/userContext/UserContext'

function App() {
  const {user} = useContext(UserContext)

  return (
    <div className="App">
      <Menu />
      <h1>{JSON.stringify(user)}</h1>
      <h2>{user.username}</h2>
      <UserSearchBox />
      { /* loop*/ }
      <ImageContainer username="alerin" image="https://ecsmedia.pl/c/fototapeta-husky-syberyjski-8-elementow-368x248-cm-b-iext51388152.jpg"
      description="blabla" likes="1" comments="5" date="5 grudnia"/>
      {/* end loop */}
    </div>
  );
}

export default App;
