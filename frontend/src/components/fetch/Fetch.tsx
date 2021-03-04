import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../userContext/UserContext'
import csrftoken from './../csrftoken/csrftoken'

// const api:string = '10.220.0.74'
const api:string = 'localhost'

//----------------------------
// The comments below are needed in case the cors is turned on
//----------------------------


const FetchRegister = (data:any) => fetch(`http://${api}:8000/api/register/`, {
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

const FetchLogin = (data:any) => fetch(`http://${api}:8000/api/login/`, {
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
const FetchUsers = (token:string) => fetch(`http://${api}:8000/api/users/`, {
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

const FetchUserProfile = (token:string, username:string) => fetch(`http://${api}:8000/api/userProfile/${username}/`, {
      // credentials: 'include',
      method: 'GET',
      // mode: 'same-origin',
      // mode: 'no-cors',
      headers: {
        // `Access-Control-Allow-Origin`: `*`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Authorization': `Token ${token}`
      },
      // body: JSON.stringify(``)

    })
const FetchSubscribedImages = (token:string) => fetch(`http://${api}:8000/api/subscribedImages/`, {
      // credentials: 'include',
      method: 'GET',
      // mode: 'same-origin',
      // mode: 'no-cors',
      headers: {
        // `Access-Control-Allow-Origin`: `*`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Authorization': `Token ${token}`
      },
      // body: JSON.stringify(``)

    })


const FetchAddLike = (token:string, imageId:any, isLike:any) => fetch(`http://${api}:8000/api/addLike/`, {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify({'imageId' : imageId, 'isLike': isLike})

})

const FetchAddComment = (token:string, inputVal:any, imageId:any) => fetch(`http://${api}:8000/api/addComment/`, {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify({'value' : inputVal , 'imageId': imageId})

})

const FetchAddSubscribe = (token:string,username:string) => fetch(`http://${api}:8000/api/addSubscribe/`, {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify({'username': username})
})
const FetchAddPhoto = (token:string,formData:any) => fetch(`http://${api}:8000/api/addPhoto/`, {
  method: 'POST',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  // body: JSON.stringify({'picture' : picture, 'description': description})
  body: formData
})
const FetchChangePassword = (token:string, oldPassword:string, newPassword:string) => fetch(`http://${api}:8000/api/accounts/changePassword/`, {
  // credentials: 'include',
  method: 'PUT',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify({'oldPassword' : oldPassword, 'newPassword': newPassword})

})
const FetchChangeUserProfile = (token:string, formData:any) => fetch(`http://${api}:8000/api/accounts/changeUserProfile/`, {
  //picture:any, description:string )
  // credentials: 'include',
  method: 'PUT',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  // body: JSON.stringify({'picture' : picture, 'description': description})
  body: formData

})
const FetchDeletePhoto = (token:string, imageId:any) => fetch(`http://${api}:8000/api/deletePhoto/`, {
  //picture:any, description:string )
  // credentials: 'include',
  method: 'DELETE',
  // mode: 'same-origin',
  // mode: 'no-cors',
  headers: {
    // `Access-Control-Allow-Origin`: `*`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    'Authorization': `Token ${token}`
  },
  // body: JSON.stringify({'picture' : picture, 'description': description})
  body: JSON.stringify({'imageId' : imageId})

})

const FetchLogout = (token:string) => fetch("http://localhost:8000/api/logout/", {
  // credentials: 'include',
  method: 'POST',
  // mode: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
    // 'X-CSRFToken': csrftoken
  },
  body: ""
})


export {
  FetchRegister,
  FetchLogin,
  FetchUserProfile,
  FetchUsers,
  FetchSubscribedImages,
  FetchAddLike,
  FetchAddComment,
  FetchChangePassword,
  FetchChangeUserProfile,
  FetchAddSubscribe,
  FetchAddPhoto,
  FetchDeletePhoto,
  FetchLogout,
};
