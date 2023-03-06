function searchList() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    ul = document.querySelector(".menu-list");
    li = ul.getElementsByTagName("li");
  
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      txtValue = txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

const myDiv = document.querySelector('.call-event');
const myButton = document.querySelector('.btn');

myButton.addEventListener('click', () => {
  myDiv.classList.add('show');
});