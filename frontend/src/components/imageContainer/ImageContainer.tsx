import React from 'react';
import './ImageContainer.css';
import Comments from './../comments/Comments';
import { Link } from "react-router-dom"

function AddLike(props: any) {
  const click = (e: any) => {
    console.log('like: ', e.target)
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={click}>like</button>
    </div>
  );
}

function AddComment(props: any) {
  const submit = (e:any) => {
    e.preventDefault()
    const inputVal:string = e.target.querySelector('textarea').value
    if(inputVal !== "") {
      console.log(inputVal)
    }
  }
  return (
    <form className="addComment" onSubmit={submit}>
      <textarea></textarea>
      <button className="btn btn-secondary">comment</button>
    </form>
  );
}

function ImageContainer(props: any) {
  return (
    <div className="imageContainer">
      { props.username ?
        <Link to={props.username}>{props.username}</Link> : ""
      }
      <img src={props.image} alt={props.description} />
      <p>{props.description}</p>
      <p>likes: {props.likes} comments: {props.comments}</p>
      <p>date add: {props.date}</p>
      <AddLike />
      <AddComment />
      <Comments />
    </div>
  );
}

export default ImageContainer;
