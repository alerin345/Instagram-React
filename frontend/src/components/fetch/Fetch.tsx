import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../userContext/UserContext'
import csrftoken from './../csrftoken/csrftoken'

// const { user } = useContext(UserContext)

// const local:any = localStorage.getItem('user') || "{}"
// const user:any = JSON.parse(local)
// const user:any = ""
const FetchRegister = (data:any) => fetch("http://localhost:8000/api/register/", {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
  },
  body: JSON.stringify(data)
})

const FetchLogin = (data:any) => fetch("http://localhost:8000/api/login/", {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
  },
  body: JSON.stringify(data)
})
const FetchUsers = (token:any) => fetch("http://localhost:8000/api/users/", {
  // credentials: 'include',
    method: 'GET',
  // mode: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  }
})


const FetchAddLike = (token:any, imageId:any, isLike:any) => fetch('http://localhost:8000/api/addLike/', {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // "Access-Control-Allow-Origin": "*",
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify({'imageId' : imageId, 'isLike': isLike})

})

const FetchAddComment = (token:any, inputVal:any, imageId:any) => fetch('http://localhost:8000/api/addComment/', {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // "Access-Control-Allow-Origin": "*",
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify({'value' : inputVal , 'imageId': imageId})

})


export {
  FetchRegister,
  FetchLogin,
  FetchUsers,
  FetchAddLike,
  FetchAddComment
};
