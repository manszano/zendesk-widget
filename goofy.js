const loginButton = document.querySelector('.login-btn');
const login = document.querySelector('.login');
const selected = document.querySelector('.selected');
const dropdown = document.querySelectorAll('.dropdown');

loginButton.addEventListener("click", function () {
  let username = document.querySelector(".user").value;
  let password = document.querySelector(".password").value;

  $.get({
    url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username,

    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password),
    },
    success: function (data) {
      const userState = data.getElementsByTagName("state")[0].textContent;
      const userReasonCodeId = data.getElementsByTagName("reasonCodeId")[0].textContent;

      console.log("Request sucess.");
      login.classList.toggle("close");
      $.get({
        url: "https://sncfinesse1.totvs.com.br/finesse/api/User/" + username + "/ReasonCodes?category=NOT_READY",

        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password),
        },
        success: function (data) {
          console.log("Status Request successful!");
          const menuList = document.querySelector(".menu-list");
          menuList.innerHTML = "";

          // Adicionar item "Ready" no início da lista
          const readyItem = document.createElement("li");
          readyItem.textContent = "Ready";
          menuList.appendChild(readyItem);

          const reasonCodes = data.getElementsByTagName("ReasonCode");
          let selectedIndex = -1;

          for (let i = 0; i < reasonCodes.length; i++) {
            const reasonCode = reasonCodes[i];
            const id = reasonCode.getElementsByTagName("id")[0].textContent;
            const label = reasonCode.getElementsByTagName("label")[0].textContent;
            const listItem = document.createElement("li");
            listItem.textContent = label;
            menuList.appendChild(listItem);

            if (id === userReasonCodeId) {
              selectedIndex = i;
              listItem.classList.add("active");
              selected.innerText = label;
            }
          }

          if (userState === "READY") {
            readyItem.classList.add("active");
            selected.innerText = "Ready";
          } else if (selectedIndex === -1) {
            selected.innerText = "RCODE NONE";
          }

          // Event listeners dentro do callback de sucesso da API
          const options = menuList.querySelectorAll("li");

          dropdown.forEach(dropdown => {
            const select = dropdown.querySelector('.select');
            const caret = dropdown.querySelector('.caret');
            const menu = dropdown.querySelector('.menu');
            const options = dropdown.querySelectorAll('.menu li');
            
            select.addEventListener('click', () => {
                select.classList.toggle('select-clicked');
                caret.classList.toggle('caret-rotate');
                menu.classList.toggle('menu-open');
            });
        
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
        });
        
        },
        error: function (xhr, status, error) {
          console.log("Status Request failed.");
          console.log(xhr.status);
          console.log(xhr.getResponseHeader("Content-Type"));
        },
        complete: function () {
          console.log("STATUS DONE");
        },
      });
    },
    error: function (xhr, status, error) {
      console.log("Request failed.");
      console.log(xhr.status);
      console.log(xhr.getResponseHeader("Content-Type"));
    },
    complete: function () {
      console.log("DONE");
    },
  });
});
