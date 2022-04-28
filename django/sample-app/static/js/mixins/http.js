var httpMixin = {
  mounted: function () {
    if (window.csrfmiddlewaretoken) {
      this.httpManager.defaults.headers.post['X-CSRFTOKEN'] = window.csrfmiddlewaretoken;
    }
    this.httpManager.post(window.isLoggedInUrl)
  },
  data: function () {
    return {
      httpManager: axios.create()
    }
  },
  methods: {
    post(url, data) {
      var self = this;
      return this.httpManager.post(window.isLoggedInUrl).then(
        function successCallback() {
          console.log('success')
          return self.httpManager.post(url, data)
        },
        function errorCallback(response) {
          console.log(response)
          window.location.href = window.loginUrl;
          return Promise.reject(response)
        })
    }
  }
}