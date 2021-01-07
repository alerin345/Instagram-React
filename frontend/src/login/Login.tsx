import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom"
import { UserContext } from './../components/userContext/UserContext'
import csrftoken from './../components/csrftoken/csrftoken'

function Login() {
  const [errors, setErrors]:any[] = useState([]);
  const {user, setUser} = useContext(UserContext);

  const submit = (e:any) => {
    e.preventDefault()
    const form = e.target;
    // console.log('submit')
    const username:string = form.querySelector('input[name="username"]').value
    const password:string = form.querySelector('input[name="password"]').value

    const data = {
      'username' : username,
      'password' : password
    }

    fetch("http://localhost:8000/api/login/", {
      // credentials: 'include',
      method: 'POST',
      // mode: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(data)
    })
    .then(async (res) => {
      const response = await res.json()

      if(response.hasOwnProperty("non_field_errors"))
      {
        await setErrors(response)
      }
      else {
        const {user} = response
        console.log(response,user);
        await localStorage.setItem('user',JSON.stringify(user))
        await setUser(user)

      }
    })
    .catch((res) => {
        console.log("error:",res.message);
    });
  }

  return (
    user ?
    <Redirect to={{pathname: '/'}} />
    :
    <React.Fragment>
      <form className="login" onSubmit={submit}>
        <h1>Login into site:</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password"/>
        <button type="submit" className="btn btn-primary">login</button>
        {
          Object.keys(errors)
          .map(objName => errors[objName])
          .flat(1)
          .map( (error,i) => (<p key={i}>{error}</p>))
        }
      </form>
      <Link to="/register/">Register</Link>
      <br/>

      <Link to="/">Main</Link>

    </React.Fragment>


  );
}

export default Login;
