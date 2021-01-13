import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { Link, Redirect } from "react-router-dom"
import { UserContext } from './../components/userContext/UserContext'
import csrftoken from './../components/csrftoken/csrftoken'
import { FetchLogin } from './../components/fetch/Fetch'

function Login() {
  const [errors, setErrors]:any[] = useState([]);
  const {user, setUser} = useContext(UserContext);

  const submit = (e:any) => {
    e.preventDefault()
    const form = e.target;
    const username:string = form.querySelector('input[name="username"]').value
    const password:string = form.querySelector('input[name="password"]').value

    const data = {
      'username' : username,
      'password' : password
    }

    FetchLogin(data)
    .then(async (res) => {
      const response = await res.json()

      if(response.hasOwnProperty("non_field_errors"))
      {
        await setErrors(response)
      }
      else {
        const user = await { ...response.user, 'token': response.token }
        await console.log('res: ',response,"user: ",user);
        await localStorage.setItem('user',JSON.stringify(user))
        await setUser(user)

      }
    })
    .catch((res) => {
        console.log("error:",res.message);
    });
  }
  // useEffect( () => {
  //   localStorage.removeItem('user')
  //   localStorage.removeItem('usersList')
  //   setUser(null)
  // },[])

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
