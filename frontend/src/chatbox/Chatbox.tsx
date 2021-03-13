import React, { useContext, useState } from 'react';
import "./Chatbox.scss"
import Menu from './../components/menu/Menu';
import { UserContext } from './../components/userContext/UserContext'
import ChatboxList from './../components/chatboxList/ChatboxList'
import ChatboxMessages from './../components/chatboxMessages/ChatboxMessages'

function YouMessages(props:any) {
  const url:string = "https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180811112/111894244-direct-selection-icon-vector-isolated-on-white-background-direct-selection-transparent-sign-line-or-.jpg";
  return (
    <div className="yourMessages">
      <img src={url} />
      <p>Your messages</p>
      <p>Send private photos and messages to a friend or group.</p>
      <button className="btn btn-primary">Send Message</button>
    </div>
  );
}

function Chatbox(props: any) {
  const {user, setUser} = useContext(UserContext);
  const [isOpenMessage, setIsOpenMessage] = useState(true);
  // console.log(user)

  return (
    <React.Fragment>
      <Menu />
      <div className="chatbox">
          <div className="chatbox__main">
            <div className="chatbox__main__header">
              <p>{user.username}</p>
              <button>To</button>
            </div>
            <ul className="chatbox__main__menu">
                <li className="chatbox-active">GŁÓWNE</li>
                <li>OGÓLNE</li>
            </ul>
            <ChatboxList />
          </div>
          <div className="chatbox__chat">
            {
              isOpenMessage ?
              <ChatboxMessages />
                :
              <YouMessages />
            }
          </div>
      </div>
    </React.Fragment>
  );
}

export default Chatbox;
