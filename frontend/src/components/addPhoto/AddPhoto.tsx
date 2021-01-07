import React from 'react';
import './AddPhoto.css';

function AddPhoto(props: any) {
  const { handleClose } = props;

  return (
    <React.Fragment>
    <form className="addPhoto">
      Picture
      <input type="file" name="picture" accept="image/*" required />
      Description
      <textarea name="description"></textarea>
      <button className="btn btn-primary" type="submit">Add image</button>
    </form>
      <button className="btn btn-secondary" onClick={() => handleClose()}>Back</button>
    </React.Fragment>
  );
}

export default AddPhoto;
