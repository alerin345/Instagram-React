import React, { useState, useContext } from 'react';
import './UserSearchBox.css'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import { UsersListContext } from './../usersListContext/UsersListContext'

function UserSearchBox(props: any) {
  const {usersList} = useContext(UsersListContext)
  const [input, setInput] = useState<string>("/")
  const history = useHistory();

  const submit:any = (e:any) => history.push(input);

  return (
    <form className="UserSearchBox" onSubmit={submit}>
      <input type="text" placeholder="username" onChange={(e:any) => setInput(e.target.value)}/>
       <button className="btn btn-primary" >find user</button>
    </form>
  );
}

export default UserSearchBox;
