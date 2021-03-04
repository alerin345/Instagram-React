import React, {useState, useEffect, useContext} from 'react';
import './Comments.css'
import { UserContext } from './../userContext/UserContext'
import csrftoken from './../csrftoken/csrftoken'
import { FetchAddComment } from './../fetch/Fetch'
import timeSince from './../../functions/timeSince'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AddComment(props: any) {
  const { user } = useContext(UserContext)
  const addComment = (value:string) => {
    props.setComments( (prevArray:any) => [...prevArray, {user: user.username, value: value, date: new Date().toString()}])
  }
  const submit = (e:any) => {
    e.preventDefault()
    const inputVal:string = e.target.querySelector('textarea').value
    if(inputVal !== "") {
      addComment(inputVal)
      props.setCommentsCount((n:number) => n+1)

      FetchAddComment(user.token,inputVal,props.imageId)
      // .then(async (res) => {
      //   const response = await res.json()
      // })
      .catch((res) => {
          console.log("error:",res.message);
      });
    }
  }
  return (
    <div className="addComment-container">
      <form className="addComment" onSubmit={submit}>
        <textarea placeholder="Add a comment"></textarea>
        <button className="addComment__share">Share</button>
      </form>
    </div>
  );
}

function Comment(props: any) {
  // const date:string = timeSince(props.date);
  return (
    <li className="comment">
      <b>{props.username}</b>
      <span>{props.value}</span>
      {/*<span>{date}</span>*/}
    </li>
  );
}

function Comments(props: any) {
  const [comments, setComments]:any[] = useState(props.comments || [])

  return (
    <React.Fragment>
      <ul className="comments">
      {
          comments.map((comment:any, id:any) => (
            <Comment key={id} username={comment.user} value={comment.value} date={comment.date} />) )
      }
      <span className="addedPhotoDate">{props.addedPhotoDate.toUpperCase()}</span>
      </ul>
      <AddComment imageId={props.imageId} setComments={setComments} setCommentsCount={props.setCommentsCount}/>
    </React.Fragment>
  );
}

export default Comments;
