function mfaResonse(response) {
  $("#svr-veri").show();
  $("#svr-question").text(response);
}

$("#svr-login").submit(function (e) {
  var postData = $(this).serializeArray();
  postData.push({name:"date", value:picker});
  var formURL = $(this).attr("action");
  $.ajax(
  {
      url : formURL,
      type: "POST",
      data : postData,
      statusCode : {
        200: function() {
          $("#svr-connect").hide();
          $("#main").show();
        },
        201: function(response) {
          $("#svr-connect").hide();
          mfaResponse(response);
        },
        403: function() {
          alert("An error happened");
        }
      }
  });
  e.preventDefault(); //STOP default action
  e.unbind(); //unbind. to stop multiple form submit.
});

function serverConnect() {
  console.log("Connected server");
  $.ajax({
    url: "/connect",
    method: "GET",
    context: document.body,
    statusCode: {
      200: function() {
        $('#svr-connect').hide();
        $('#main').show();
      },
      201: function() {
        $('#svr-connect').show();
      },
      400: function() {
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

