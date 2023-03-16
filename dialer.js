const toggleButton = document.querySelector('#toggle-button');
const dialer = document.querySelector('.dialer');

toggleButton.addEventListener('click', function() {
  dialer.classList.toggle('opener');
});

function addToDisplay(num) {
    var display = document.getElementById("display");
    display.value += num;
  }
  
  function clearDisplay() {
    var display = document.getElementById("display");
    var value = display.value;
    display.value = value.substring(0, value.length - 1);
  }
  document.addEventListener("keydown", function(event) {
    if (document.activeElement === document.getElementById("display")) {
        var key = event.key;
        if (/\d/.test(key) || key == "*" || key == "#") {
          addToDisplay(key);
        } else if (key == "Backspace") {
          clearDisplay();
        }
      }
    });
  


