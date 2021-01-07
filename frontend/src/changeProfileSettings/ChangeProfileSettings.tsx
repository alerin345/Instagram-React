import React from 'react';
import './ChangeProfileSettings.css';

function ChangeProfileSettings() {
  const submit = (e:any) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <React.Fragment>
      <form className="changeProfileSettings" onSubmit={submit}>
        <h1>Change profile settings:</h1>
        Picture
        <input type="file" name="picture" accept="image/*" required />
        Description
        <textarea name="description"></textarea>
        <button type="submit" className="btn btn-primary">Change</button>
        <a href="../../.">Main</a>
      </form>
    </React.Fragment>
  );
}

export default ChangeProfileSettings;
