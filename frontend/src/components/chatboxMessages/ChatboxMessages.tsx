import React, { useContext, useEffect, useRef, useState } from 'react';
import "./ChatboxMessages.scss"
// import Menu from './../components/menu/Menu';
// import { UserContext } from './../components/userContext/UserContext'



function Message(props: any) {
  const url:string = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";
  return (
    props.itsMe ?
    <div className="myMessage">
      {props.message}
    </div>
    :
    <div className="guestBanner">
      <img className="chatSmallImage" src={url} />
      <div className="guestMessage">
        {props.message}
      </div>
    </div>
  );
}

function ChatboxMessages(props: any) {
  const refToScroll:any = useRef(null);
  const refSend:any = useRef(null);
  const [messages,setMessages]:any = useState([]);

  useEffect(() => {
    const h =  refToScroll.current.scrollHeight;
    refToScroll.current.scrollTo(0, h);
  },[messages])

  const keyUpHandler = (e:any) => {
    e.preventDefault();
    if(e.keyCode === 13)
    {
      if(e.shiftKey) {
        console.log('enter + shift');
        console.log(e.shiftKey);
      }
      else {
        console.log('enter')
        refSend.current.value = e.target.value.split("\n").join("")
        if (e.target.value != "")
          setMessages( (prev:any) => [...prev,e.target.value]);
        console.log(e.target.value)
      }
    }
    console.log(refSend.current.value)

  }

  return (
    <React.Fragment>
      <div className="userBanner">
        <img src="" className="chatSmallImage"/>
        <span>{props.name || "username"}</span>

      </div>
      <div className="chat" ref={refToScroll}>
        <Message itsMe={true} message="Hi Derek" />
        <Message itsMe={false} message="Hi Kamil!" />
        <Message itsMe={false} message="Hey can u help me?" />
        <Message itsMe={true} message="Yes of cours" />
        <Message itsMe={true} message="lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum" />
        <Message itsMe={false} message="Hey can u help me?" />
        <Message itsMe={true} message="Yes of cours" />
        <Message itsMe={true} message="lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum" />
        <Message itsMe={false} message="Hey can u help me?" />
        <Message itsMe={true} message="Yes of cours" />
        <Message itsMe={true} message="lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum" />
        <Message itsMe={false} message="Hey can u help me?" />
        <Message itsMe={true} message="Yes of cours" />
        <Message itsMe={true} message="lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum" />
        <Message itsMe={true} message="xd" />

        <Message itsMe={true} message="abc"/>
        <Message itsMe={false} message="abc2abc2"/>
        {
          messages.map( (item:any, i:number) => <Message key={i} itsMe={true} message={item}/> )
        }
      </div>
      <div className="sendMessage">
        <div className="sendMessage__window">
          <textarea ref={refSend} onKeyUp={(e:any) => keyUpHandler(e)} className="sendMessage__window--textarea" placeholder="Send Message...">
          </textarea>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatboxMessages;
