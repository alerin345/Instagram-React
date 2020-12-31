function subscribe(url,subscribed,csrf_token) {
  $.ajax({
      type: "POST",
      url: `/${url}`,
      data: { csrfmiddlewaretoken: csrf_token,
      state:"inactive",
      "issubscribe": "true",
      "subscribed": subscribed
    },
    success: function() {
      console.log('done')
      location.reload()
    }
  })
}
