import React, {useState, useEffect, useContext} from 'react';
import './Comments.css'
import { UserContext } from './../userContext/UserContext'
import csrftoken from './../csrftoken/csrftoken'
import { FetchAddComment } from './../fetch/Fetch'

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
      // console.log('imageId:',props.imageId)

      FetchAddComment(user.token,inputVal,props.imageId)
      .then(async (res) => {
        const response = await res.json()
        await console.log(response)
        // await console.log(response)
      })
      .catch((res) => {
          console.log("error:",res.message);
      });
    }
  }
  return (
    <form className="addComment" onSubmit={submit}>
      <textarea></textarea>
      <button className="btn btn-secondary">comment</button>
    </form>
  );
}

function Comment(props: any) {
  return (
    <li className="comment">
      <b>{props.username}:</b>
      <span>{props.value}</span>
      <span>{props.date}</span>
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
      </ul>

      <AddComment imageId={props.imageId} setComments={setComments} setCommentsCount={props.setCommentsCount}/>
    </React.Fragment>
  );
}

export default Comments;
