
const loginButton = document.querySelector('.login-btn');
const login = document.querySelector('.login');


loginButton.addEventListener('click', function () {
  let username = document.querySelector('.user').value;
  let password = document.querySelector('.password').value;

  $.get({
      url: 'https://sncfinesse1.totvs.com.br/finesse/api/User/' + username,
    
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    success: function(data) {
	    console.log("Request sucess.");
	    login.classList.toggle(".close")
    },
    error: function(xhr, status, error) {
      console.log("Request failed.");
      console.log(xhr.status);
      console.log(xhr.getResponseHeader("Content-Type"));     
    },
    complete: function(){
      console.log("DONE");
    }
  });

  ///////////////////////////////
 
});
