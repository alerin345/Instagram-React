import React from 'react';
import './ChangePassword.css';

function ChangePassword() {
  const submit = (e:any) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <React.Fragment>
      <form className="changePassword" onSubmit={submit}>
        <h1>Change password</h1>
        Old password
        <input type="oldPassword" />
        New password
        <input type="password"/>
        New password confirmation
        <input type="password2" />
        <button type="submit" className="btn btn-primary">Change password</button>
      </form>
    </React.Fragment>
  );
}

export default ChangePassword;
