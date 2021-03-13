import React, { useEffect, useContext } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import AddPhoto from './../addPhoto/AddPhoto';
import { UserContext } from './../userContext/UserContext';
import { FetchDeletePhoto } from './../fetch/Fetch';
import { DeleteImageContext } from './../deleteImageContext/DeleteImageContext'
import ImageContainer from './../imageContainer/ImageContainer';
import './Modals.scss';


const ModalOptions = (props:any) => {
  const { handleClose } = props;

  const upHandler = ({ key }:any) => {
    if (key === 'Escape') {
      handleClose()
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [upHandler]);

  return (
    <div className="customModal">
      <button className="btn btn-secondary">
      <Link to={{ pathname: "/accounts/profileSettings"}} >
      Change profile settings
      </Link>
      </button>
      <button className="btn btn-secondary">
      <Link to="/accounts/changePassword" >
      Change password
      </Link>
      </button>
      <button className="btn btn-secondary" onClick={() => handleClose()}>Back</button>
    </div>
  );
}
//
const ModalAddPhoto = (props:any) => {
  const { handleClose } = props;
  const upHandler = ({ key }:any) => {
    if (key === 'Escape') {
      handleClose()
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [upHandler]);

  return (
    <div className="customModal">
      <AddPhoto
      handleClose={handleClose}
      userProfile={props.userProfile}
      setUserProfile={props.setUserProfile}
      setReload={props.setReload}
      />
    </div>
  );
}

const ModalDeletePhoto = (props:any) => {
  const {user} = useContext(UserContext)
  const { handleClose } = props;
  const { deleteImage } = useContext(DeleteImageContext)
  const upHandler = ({ key }:any) => {
    if (key === 'Escape') {
      handleClose()
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [upHandler]);
  console.log('imageModalClose',props.imageModalClose);
  return (
    <div className="customModal mDeletePhoto">
      Are u sure u want delete image number: {deleteImage}
      <div>
        <button className='btn btn-danger' onClick={() => {
          FetchDeletePhoto(user.token,deleteImage)
          .catch( (res) => {
              console.log("error:",res.message);
          })
          .then( () => props.setReload((r:any) => !r))
          .then(
            () => {
              if(typeof props.imageModalClose === 'function')
              props.imageModalClose();
              handleClose()
            }
        );
        }}>Yes</button>
        <button className='btn btn-secondary' onClick={() => handleClose()}>No</button>
      </div>
    </div>
  );
}
const ModalImageContainer = (props:any) => {
  const {user} = useContext(UserContext)
  const { handleClose }:any = props;
  const { deleteImage } = useContext(DeleteImageContext)
  const upHandler = ({ key }:any) => {
    if (key === 'Escape') {
      handleClose()
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [upHandler]);

  return (
    <div className="customModal userModal">
      <ImageContainer
      {...props.image}
      itsMyProfile={props.itsMyProfile}
      setReload={props.setReload}
      setShowDeletePhoto={props.setShowDeletePhoto}
      closeModal={handleClose}
      // itsMyProfile={userProfile.itsMyProfile}
      />
    </div>
  );
}

const Modals = {  ModalAddPhoto, ModalOptions, ModalDeletePhoto, ModalImageContainer }
export default Modals;
