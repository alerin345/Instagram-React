import React, {useState, useContext} from 'react';
import './ImageContainer.scss';
import Comments from './../comments/Comments';
import { Link } from "react-router-dom"
import csrftoken from './../csrftoken/csrftoken'
import { FetchAddLike, FetchDeletePhoto } from './../fetch/Fetch'
import { UserContext } from './../userContext/UserContext'
import { DeleteImageContext } from './../deleteImageContext/DeleteImageContext'
import Modals from './../modals/Modals'
import timeSince from './../../functions/timeSince'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartOff } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOn } from '@fortawesome/free-regular-svg-icons'
import type { AddLikeProps, ImageProps } from "Types/Types"



const AddLike: React.FC<AddLikeProps> = (props:any) => {
  const {user} = useContext(UserContext)
  const [isLike, setIsLike] = useState(props.isLike || false)
  const click = (e: any) => {
    if(isLike)
    {
      setIsLike(false)
      props.setLikesCount((n:number)=>n-1)
      FetchAddLike(user.token, props.imageId,isLike)
    }
    else {
      setIsLike(true)
      props.setLikesCount((n:number)=>n+1)
      FetchAddLike(user.token, props.imageId,isLike)
    }
  }

  return (
    <div className="post-actions">
      <button className="btn-like" onClick={click}>{isLike ? <FontAwesomeIcon icon={faHeartOff} className="unlike" /> : <FontAwesomeIcon className="like" icon={faHeartOn} />}</button>
    </div>
  );
}

const ImageContainer: React.FC<ImageProps> = (props) => {
  const date:string = timeSince(props.date)
  const { user } = useContext(UserContext)
  const { setDeleteImage } = useContext(DeleteImageContext)
  const [likesCount, setLikesCount] = useState(props.likesCount)
  const [commentsCount, setCommentsCount] = useState(props.commentsCount)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="imageContainer">

    { props.itsMyProfile ?
    <button onClick={() => {
      setDeleteImage(props.id)
      props.setShowDeletePhoto(true)
      if (props.closeModal)
        return <Modals.ModalDeletePhoto imageModalClose={props.closeModal}/>
    }}>x</button>
    : "" }
      { props.username ?
        <header className="imageContainer__header">
          <img src="https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin-300x300.jpg" alt={props.username} />
          <Link to={props.username}>{props.username}</Link>
        </header>
        : ""

      }
      <img src={props.image} alt={props.description} />
      <AddLike imageId={props.id} isLike={props.isLike} setLikesCount={setLikesCount}/>
      <p className="post-stats">likes: {likesCount} comments: {commentsCount}</p>
      <Comments imageId={props.id} comments={props.comments} setCommentsCount={setCommentsCount} addedPhotoDate={date}/>

    </article>
  );
}

export default ImageContainer;
