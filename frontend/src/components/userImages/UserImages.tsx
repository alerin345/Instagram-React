import React, { useState, useEffect } from 'react';
import './UserImages.scss';
import Modals from './../modals/Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartOff } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const UserImages = (props:any) =>{
  const [modalData, setModalData] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect( () => {
    return props.setReload( (r:boolean) => !r);
  },[showModal])

  const openModal:any = (id:number) => {
    setModalData(props.images[id]);
    setShowModal(!showModal);
  }

  return (
    <React.Fragment>
      {showModal ?
      <Modals.ModalImageContainer
        handleClose={() => setShowModal(false)}
        image={modalData}
        itsMyProfile={props.itsMyProfile}
        setReload={props.setReload}
        setShowDeletePhoto={props.setShowDeletePhoto}
      />
      : "" }
      <div className="userImages">
       {
         props.images.map( (image:any, id:number) =>
           <div key={id} onClick={() => openModal(id)}>
            <span>
              <FontAwesomeIcon icon={faHeartOff} />
              {image.likesCount}
            </span>
            <span>
              <FontAwesomeIcon icon={faComment} className="rotateComment"/>
              {image.commentsCount}
            </span>
            <img key={image.id}
             src={image.image}
             />
           </div>
         )
        }

      </div>
    </React.Fragment>
  );
}

export default UserImages;
