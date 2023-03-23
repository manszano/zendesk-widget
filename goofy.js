
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
	    login.classList.toggle("close")
      $.get({
        url: 'https://sncfinesse1.totvs.com.br/finesse/api/User/' + username + "/ReasonCodes?category=NOT_READY",
    
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        },
        success: function (data) {
            console.log("Status Request successful!");
            const menuList = document.querySelector('.menu-list');
            menuList.innerHTML = '';
    
            const reasonCodes = data.getElementsByTagName('ReasonCode');
    
            for (let i = 0; i < reasonCodes.length; i++) {
                const reasonCode = reasonCodes[i];
                const label = reasonCode.getElementsByTagName('label')[0].textContent;
                const listItem = document.createElement('li');
                listItem.textContent = label;
                menuList.appendChild(listItem);
    
                if (i === 0) {
                    listItem.classList.add('active');
                    selected.innerText = label;
                }
            }
    
            //event listeners para dentro do callback de sucesso da API
            const options = menuList.querySelectorAll('li');
    
            options.forEach(option => {
                option.addEventListener('click', () => {
                    selected.innerText = option.innerText;
    
                    select.classList.remove('select-clicked');
                    caret.classList.remove('caret-rotate');
                    menu.classList.remove('menu-open');
    
                    options.forEach(option => {
                        option.classList.remove('active');
                    });
                    option.classList.add('active');
                });
            });
        },
        error: function (xhr, status, error) {
            console.log("Status Request failed.");
            console.log(xhr.status);
            console.log(xhr.getResponseHeader("Content-Type"));
        },
        complete: function () {
            console.log("STATUS DONE");
        }
    });
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
  
 
});


