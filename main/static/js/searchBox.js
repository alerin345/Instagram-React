window.addEventListener('load', () => {
  let findUser = document.querySelector('.findUser')
  let btn = document.querySelector('.btn')
  let users = document.querySelector('.users')
  findUser.addEventListener('keyup', (e) => {

    let userQuery = e.target.value
    if( userQuery != "" && userQuery != null && userQuery != undefined)
    {
      $.ajax({
          type: "POST",
          url: "../",
          data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
          state:"inactive",
          "loadUser": "true",
          "value": `${userQuery}`
        },
        success: function(e) {
          allUsers = e.users ? e.users : []
          users.innerHTML = ""
          allUsers.forEach((user, i) => {
            let p = document.createElement('p')
            p.textContent = user.username
            p.style.cursor = "pointer"
            p.addEventListener('click', (e) => {
              findUser.value = e.target.textContent
              window.location.href = e.target.textContent
              users.innerHTML = ""
            })
            users.appendChild(p)
          });
        }
      });
    }
    else {
      users.innerHTML = ""
    }
  })
  document.body.addEventListener('click', (e) => {
    isClickInside = users.contains(event.target);
  })
  btn.addEventListener('click', () => {
    window.location.href = findUser.value
  })
})
