const toggleButton1 = document.querySelector('#toggle-button');
const dialer = document.querySelector('.dialer');
const dropdown2 = document.querySelector('.dropdown');
const dropdown11 = document.querySelector('.menu');
const dropdown22 = document.querySelector('.select');
const caret = dropdown2.querySelector('.caret');
toggleButton1.addEventListener('click', function() {
dialer.classList.toggle('opener');
if (dropdown11.classList.contains('menu-open')) {
  dropdown11.classList.remove('menu-open')
  dropdown22.classList.remove('select-clicked')
  caret.classList.remove('caret-rotate');
}

});


function addToDisplay(num) {
    var display = document.getElementById("display");
    display.value += num;
  }
  
  function clearDisplay() {
    var display = document.getElementById("display");
    var value = display.value;
    display.value = "";
  }
    //loading
    function move() {
      var load = document.querySelector('.loading')
      var elem = document.querySelector(".progress-bar");
      var width = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          load.classList.add('none')
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
    setTimeout(move, 500);
  


