import React, { useContext } from 'react';
import './Menu.css';
import { Link } from "react-router-dom"
import { UserContext } from './../userContext/UserContext'

function Menu(props: any) {
  const {user,setUser} = useContext(UserContext)
  const removeUserData = () => {
    if(user.token)
    {
      fetch("http://localhost:8000/api/logout/", {
        // credentials: 'include',
        method: 'POST',
        // mode: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `token ${user.token}`
          // 'X-CSRFToken': csrftoken
        },
        body: ""
      })
    }
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to={user.username}>User Profile</Link>
        </li>
        { user.username ?
        (
          ""
        ) : (
          <React.Fragment>
            <li>
              <Link to="/register/">Register</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
          </React.Fragment>
        )}
        <li>
          <Link to="/login" onClick={() => removeUserData()} >Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
