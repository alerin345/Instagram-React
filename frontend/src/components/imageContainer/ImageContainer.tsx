import React, {useState, useContext} from 'react';
import './ImageContainer.css';
import Comments from './../comments/Comments';
import { Link } from "react-router-dom"
import csrftoken from './../csrftoken/csrftoken'
import { FetchAddLike } from './../fetch/Fetch'
import { UserContext } from './../userContext/UserContext'

function AddLike(props: any) {
  const {user} = useContext(UserContext)
  const [isLike, setIsLike] = useState(props.isLike || false)
  const click = (e: any) => {
    // console.log(setLikes)
    if(isLike)
    {
      setIsLike(false)
      props.setLikesCount((n:number)=>n-1)
      FetchAddLike(user.token, props.imageId,isLike)
      // console.log('a:',props.imageId,isLike)
    }
    else {
      setIsLike(true)
      props.setLikesCount((n:number)=>n+1)
      // console.log(props.imageId,isLike)
      FetchAddLike(user.token, props.imageId,isLike)
      // console.log('b:',props.imageId,isLike)
    }
    // console.log('like: ', e.target)
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={click}>{isLike ? "unlike" : "like"}</button>
    </div>
  );
}

function ImageContainer(props: any) {
  const date = new Date(props.date).toString()

  const [likesCount, setLikesCount] = useState(props.likesCount)
  const [commentsCount, setCommentsCount] = useState(props.commentsCount)

  return (
    <div className="imageContainer">
      { props.username ?
        <Link to={props.username}>{props.username}</Link> : ""
      }
      <img src={props.image} alt={props.description} />
      <p>{props.description}</p>
      <p>likes: {likesCount} comments: {commentsCount}</p>
      <p>date add: {date}</p>
      <AddLike imageId={props.imageId} isLike={props.isLike} setLikesCount={setLikesCount}/>
      <Comments imageId={props.imageId} comments={props.comments} setCommentsCount={setCommentsCount} />

    </div>
  );
}

export default ImageContainer;
