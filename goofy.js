
const loginButton = document.querySelector('.login-btn');
const login = document.querySelector('.login');


loginButton.addEventListener('click', function () {
  let username = document.querySelector('.user').value;
  let password = document.querySelector('.password').value;

  response = $.ajax({
      url: 'https://sncfinesse1.totvs.com.br/finesse/api/User/' + username,
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    success: function(data) {
      console.log("Request successful!");
      console.log(data.responseText);
    },
    error: function(xhr, status, error) {
      console.log("Request failed.");
      console.log(xhr.status);
      console.log(xhr.getResponseHeader("Content-Type"));     
    }
  });
  
  getXML(response.responseXML);

  ///////////////////////////////
  function processXML(xmlString) {
    const firstParser = new DOMParser();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const loginId = xmlDoc.getElementsByTagName("loginId")[0];
  
    if (loginId) {
      console.log("Primeiro nome encontrado:", loginId.textContent);
      // showdashboard
      login.classList.toggle(".close")
    } else {
      console.log("Erro login api")
    }
  }
  
  function getXML(url) {
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        processXML(this.responseText);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
});
