import React, { useState, useEffect } from 'react';
import './UserContainer.css'
import Modals from './../modals/Modals'

function AccountsOptions(props:any) {
  const [showOptions, setShowOptions] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const { ModalAddPhoto , ModalOptions } = Modals;
  return (
    <React.Fragment>
      <button className="btn btn-secondary" onClick={() => setShowOptions(true)}>Options</button>
      <button className="btn btn-secondary" onClick={() => setShowAddPhoto(true)}>Add Photo</button>
      { showOptions ?
      <ModalOptions handleClose={() => setShowOptions(false)}/>
      : "" }
      { showAddPhoto ?
      <ModalAddPhoto handleClose={() => setShowAddPhoto(false)}/>
      : "" }


    </React.Fragment>
  );
}


function UserContainer(props: any) {
  const itsMe:boolean = true;
  return (
    <div className="userContainer">
      <div className="flex-column">
        <img src={props.image} alt="" />
      </div>
      <div className="flex-column">
        <h1>{props.username}</h1>
        <p>{props.description}</p>
        { itsMe ?
          <AccountsOptions />
          :
          "" }
        <p>Subscriber (ile ma obserwujacych): {props.subscriber}</p>
        <p>Subscrbes (ile on obserwuje): {props.subscribes}</p>
      </div>
    </div>
  );
}

export default UserContainer;
