import React, { useState, useContext } from 'react';
import './ChangePassword.css';
import { FetchChangePassword } from './../components/fetch/Fetch'
import { UserContext } from './../components/userContext/UserContext'
import Menu from './../components/menu/Menu';

function ChangePassword() {
  const [errors, setErrors]:any[] = useState([]);
  const {user} = useContext(UserContext);
  const submit = (e:any) => {
    e.preventDefault()
    const form = e.target;
    const oldPassword:string = form.querySelector('input[name="oldPassword"]').value
    const newPassword:string = form.querySelector('input[name="newPassword"]').value
    const newPassword2:string = form.querySelector('input[name="newPassword2"]').value
    if (newPassword === newPassword2)
    {
      FetchChangePassword(user.token, oldPassword, newPassword)
      .then(async (res) => {
        const response = await res.json()
        if(response.hasOwnProperty("non_field_errors"))
        {
          await setErrors(response)
        }
      })
      .catch((res) => {
          console.log("error:",res.message);
      });
    }
    console.log('submit')
  }
  return (
    <React.Fragment>
      <Menu />
      <form className="changePassword" onSubmit={submit}>
        <h1>Change password</h1>
        Old password
        <input type="password" name="oldPassword" />
        New password
        <input type="password" name="newPassword" />
        New password confirmation
        <input type="password" name="newPassword2" />
        <button type="submit" className="btn btn-primary">Change password</button>
        {
          Object.keys(errors)
          .map(objName => errors[objName])
          .flat(1)
          .map( (error,i) => (<p key={i}>{error}</p>))
        }
      </form>
    </React.Fragment>
  );
}

export default ChangePassword;
