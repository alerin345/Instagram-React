function comment(e,url,imageId, csrf_token) {
  let that = e.parentNode
  let commentVal = that.querySelector('textarea').value
  $.ajax({
    type: "POST",
    url: `/${url}`,
    data: { csrfmiddlewaretoken: csrf_token,   // < here
    state:"inactive",
    "iscomment": "true",
    "imageId": imageId,
    "comment": commentVal
  },
  success: function() {
    location.reload()
  }
  })
}
