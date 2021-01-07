import React, { useEffect } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import AddPhoto from './../addPhoto/AddPhoto';
import './Modals.css';


function ModalOptions(props:any) {
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
      <Link to="/accounts/profileSettings" >
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

function ModalAddPhoto(props:any) {
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
      <AddPhoto handleClose={handleClose} />
    </div>
  );
}
const Modals = { ModalAddPhoto , ModalOptions }
export default Modals;
