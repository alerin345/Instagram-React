import React, {useState, useContext} from 'react';
import './ImageContainer.css';
import Comments from './../comments/Comments';
import { Link } from "react-router-dom"
import csrftoken from './../csrftoken/csrftoken'
import { FetchAddLike, FetchDeletePhoto } from './../fetch/Fetch'
import { UserContext } from './../userContext/UserContext'
import { DeleteImageContext } from './../deleteImageContext/DeleteImageContext'
import Modals from './../modals/Modals'
import timeSince from './../../functions/timeSince'

type AddLikeProps = {
  imageId: Number;
  isLike: boolean;
  setLikesCount: (v: number) => void;
}

const AddLike: React.FC<AddLikeProps> = (props: any) => {
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
    <div>
      <button className="btn btn-primary" onClick={click}>{isLike ? "unlike" : "like"}</button>
    </div>
  );
}

type ImageProps = {
  itsMyProfile: boolean;
  setShowDeletePhoto: (v: boolean) => void;
  id: Number;
  username: string;
  description: string;
  image: string;
  likesCount: Number;
  commentsCount: Number;
  comments: {
    user: string;
    date: string;
    value: string
  }
  isLike: boolean;
  date: string;
}

const ImageContainer: React.FC<ImageProps> = (props) => {
  const date:string = timeSince(props.date)
  const { user } = useContext(UserContext)
  const { setDeleteImage } = useContext(DeleteImageContext)
  const [likesCount, setLikesCount] = useState(props.likesCount)
  const [commentsCount, setCommentsCount] = useState(props.commentsCount)
  // const [showDeletePhoto, setShowDeletePhoto] = useState(true);

  return (
    <div className="imageContainer">
    { props.itsMyProfile ?
    <button onClick={() => {
      setDeleteImage(props.id)
      props.setShowDeletePhoto(true)
    }}>x</button>
    : "" }
      { props.username ?
        <Link to={props.username}>{props.username}</Link> : ""
      }
      <img src={props.image} alt={props.description} />
      <p>{props.description}</p>
      <p>likes: {likesCount} comments: {commentsCount}</p>
      <p>date add: {date}</p>
      <AddLike imageId={props.id} isLike={props.isLike} setLikesCount={setLikesCount}/>
      <Comments imageId={props.id} comments={props.comments} setCommentsCount={setCommentsCount} />

    </div>
  );
}

export default ImageContainer;
