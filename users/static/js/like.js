function like(e,url,imageId, isLike, csrf_token) {
  const addunlike = `<button class="like btn btn-info id${imageId}" type="button" onclick="like(this,'${url}',${imageId}, 1, '${csrf_token}')">unlike</button>`;
  let that = e.parentNode.parentNode
  const addlike = `<button class="like btn btn-primary id${imageId}" type="button" onclick="like(this,'${url}',${imageId}, 0, '${csrf_token}')">like</button>`
    $.ajax({
      type: "POST",
      url: `/${url}`,
      data: { csrfmiddlewaretoken: csrf_token,
      state:"inactive",
      "islike": "true",
      "imageId": imageId,
      "isLike": isLike
    },
    success: function() {
      let likesNum = that.querySelector('.likesNum')
      that = that.querySelector('.likeit')
      if(isLike == 1)
      {
        e.remove()
        likesNum.textContent = +likesNum.textContent-1
        that.innerHTML += addlike
      }
      else {
        e.remove()
        likesNum.textContent = +likesNum.textContent+1
        that.innerHTML += addunlike
      }
    }
  })
}
