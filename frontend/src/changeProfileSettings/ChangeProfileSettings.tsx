// @ts-nocheck
import React, { useContext, useState } from 'react';
import './ChangeProfileSettings.scss';
import Menu from './../components/menu/Menu';
import { FetchChangeUserProfile } from './../components/fetch/Fetch'
import { UserContext } from './../components/userContext/UserContext'

function ChangeProfileSettings() {
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const {user, setUser} = useContext(UserContext);

  const submit = (e:any) => {
    e.preventDefault()

    const form = e.target;
    let formData = new FormData();
    if (image != ""){
      formData.append('picture', image, image.name)
    }
    else {
      formData.append('picture'," ")
    }
    formData.append('description', description)

    FetchChangeUserProfile(user.token, formData) //, picture, description)
    .then(async (res) => {
      const response = await res.json()
    })
    .catch((res) => {
        console.log("error:",res.message);
    });

  }
  return (
    <React.Fragment>
      <Menu />
      <form className="changeProfileSettings" onSubmit={submit} encType="multipart/form-data">
        <h1>Change profile settings:</h1>
        Picture (if don't wanna change profile picture, leave it blank)
        <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        Description
        <textarea name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type="submit" className="btn btn-primary">Change</button>
      </form>
    </React.Fragment>
  );
}

export default ChangeProfileSettings;
