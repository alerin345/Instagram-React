import React, { useState, useContext } from 'react';
import './Register.css';
import { Link , Redirect } from "react-router-dom"
import csrftoken from './../components/csrftoken/csrftoken'
import { UserContext } from './../components/userContext/UserContext'

function Register() {
  const [errors, setErrors]:any[] = useState([]);
  const { user } = useContext(UserContext);

  const submit = (e:any) => {
    e.preventDefault()
    const form = e.target;
    const username:string = form.querySelector('input[name="username"]').value
    const email:string = form.querySelector('input[name="email"]').value
    const password:string = form.querySelector('input[name="password"]').value
    const password2:string = form.querySelector('input[name="password2"]').value

    const data = {
      'username' : username,
      'email' : email,
      'password' : password,
      'password2' : password2
    }
    if(password === password2)
    {
      fetch("http://localhost:8000/api/register/", {
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
        await console.log(response,response.token,response.user)
        if(response.hasOwnProperty("username"))
        {
          await setErrors(response)
        }
        else {
          console.log(response);
          console.log(response.token)
          console.log(response.user.id,response.user.username)
        }
      })
      .catch((res) => {
          console.log("error:",res.message);
      });
    }
    else {
      setErrors({"password" : "The passwords are not the same"})
    }
  }


  return (
    user ?
    <Redirect to={{pathname: '/'}} />
    :
    <React.Fragment>
      <form className="register" onSubmit={submit}>
        <h1>Register:</h1>
        <input type="text" placeholder="username" name="username"/>
        <input type="email" placeholder="Email address" name="email"/>
        <input type="password" placeholder="password" name="password"/>
        <input type="password" placeholder="password2" name="password2"/>
        <button type="submit" className="btn btn-primary">login</button>
        {
          Object.keys(errors)
          .map(objName => errors[objName])
          .flat(1)
          .map( (error,i) => (<p key={i}>{error}</p>))
        }
      </form>

      <Link to="/login/">Login</Link>
      <br/>
      <Link to="../">Main</Link>
    </React.Fragment>
  );
}

export default Register;
