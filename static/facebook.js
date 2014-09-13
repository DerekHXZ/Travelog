function serverConnect() {
  $.ajax({
    url: "/connect",
    context: document.body,
    statusCode: {
      200: function() {
        $('#svr-connect').hide();
      },
      201: function() {
        $('#svr-connect').show();
      },
      403: function() {
        alert("Check cookie");
      }
    }
  });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    $('#fb-login').hide();
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      $('#fb-status').show();
      $('#fb-status').text('Thanks for logging in, ' + response.name + '!');
    });
    serverConnect();
  } else {
    $('#fb-login').show();
  }
}

function checkLoginStatus() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '739575586113329',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.1'
  });
  checkLoginStatus();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

