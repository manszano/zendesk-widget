
const loginButton = document.querySelector('.login-btn');
const login = document.querySelector('.login');


loginButton.addEventListener('click', function () {
  let username = document.querySelector('.user').value;
  let password = document.querySelector('.password').value;

  let uri = "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username
  saveCredentials(username, password);

    $.ajax({
    url: uri,
    credentials:"include",
    type: 'dataType',
    /* etc */
    success: function(jsondata){
      console.log(jsondata)
    }
 })

  // fetch("https://sncfinesse1.totvs.com.br/finesse/api/User/" + username, {
  //   method: "GET", headers: {'Access-Control-Allow-Origin': '*'}, credentials: "include"
  // })
  //   .then(data => console.log(data));


});

function
  saveCredentials(userName, password) {
  localStorage.setItem('credentials', 'basic ' + userName + ':' + password);
}