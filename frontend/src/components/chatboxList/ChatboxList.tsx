import React, { useContext } from 'react';
import "./ChatboxList.css"
// import Menu from './../components/menu/Menu';
// import { UserContext } from './../components/userContext/UserContext'

function ChatboxListItem(props: any) {
  const { name } = props;
  const url:string = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";

  return (
    <li className="chatboxListItem">
      <img src={url}/>
      <span>{name}</span>
    </li>
  );
}


function ChatboxList(props: any) {
  return (
    <React.Fragment>
        <ul className="chatbox__main__list">
        {
          Array(20).fill(1).map((el:any, i:number) => <ChatboxListItem key={i} name={"dawf"+i} />)
        }
        </ul>
    </React.Fragment>
  );
}

export default ChatboxList;
