import React from 'react';
import './Comments.css'

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
  return (
    <ul className="comments">
      <Comment username="karol mento" value="nice photo!" date="9 grudnia"/>
      <Comment username="Mikołaj" value="beautiful" date="10 grudnia"/>
    </ul>
  );
}

export default Comments;
