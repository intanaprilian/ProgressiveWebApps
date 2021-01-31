document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
   
    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status != 200) return;
       
            // Load menu link list
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
              elm.innerHTML = xhttp.responseText;
            });
       
            // Register event listener for each menu link
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
              elm.addEventListener("click", function(event) {
                // Close sidenav
                let sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();
       
                // Load the contents of the page being called
                page = event.target.getAttribute("href").substr(1);
                loadPage(page);
              });
            });
          }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
      }

    // Load page content
let page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);
 
function loadPage(page) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const content = document.querySelector("#body-content");
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = "<p>Page not found.</p>";
      } else {
        content.innerHTML = "<p>Ups.. page cannot be accessed.</p>";
      }
      if (page === "home") {
      getMatches();
      } else if (page == "teams") {
      getTeams();
      } else if (page == "favorites") {
      getSavedTeams();
    }
  }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}
});