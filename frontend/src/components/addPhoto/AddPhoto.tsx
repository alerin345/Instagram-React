import React, { useState, useContext} from 'react';
import './AddPhoto.css';
import { UserContext } from './../userContext/UserContext'
import { FetchAddPhoto } from './../fetch/Fetch'
import Menu from './../menu/Menu'

function AddPhoto(props: any) {
  const { handleClose } = props;
  const [description, setDescription]:any = useState("")
  const [image, setImage]:any = useState("")
  const {user, setUser} = useContext(UserContext);

  // props.setUserProfile({...props.userProfile, props.userProfile.images[0]: 1})


  const submit = (e:any) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('picture', image, image.name)
    formData.append('description', description)

    FetchAddPhoto(user.token, formData) //, picture, description)
    .then(async (res) => {
      const response = await res.json()
      props.setReload((r:any) => !r)
    })
    .then(() => props.handleClose())
    .catch((res) => {
        console.log("error:",res.message);
    });
  }

  return (
    <React.Fragment>
    <Menu />
    <form className="addPhoto" onSubmit={submit}>
      Picture
      <input type="file" name="picture" accept="image/*" required onChange={(e:any) => setImage(e.target.files[0])}/>
      Description
      <textarea name="description" onChange={(e:any) => setDescription(e.target.value)}></textarea>
      <button className="btn btn-primary" type="submit">Add image</button>
    </form>
    <button className="btn btn-secondary" onClick={() => props.handleClose()}>Back</button>
    </React.Fragment>
  );
}

export default AddPhoto;
