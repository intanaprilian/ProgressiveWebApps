if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("sw.js")
        .then(function() {
          console.log("Register ServiceWorker Success");
        })
        .catch(function() {
          console.log("Register ServiceWorker fail");
        });
    });
  } else {
    console.log("ServiceWorker browser does not support.");
  }

  document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get('saved');
    var idpar = urlParams.get("id");
    var save = document.getElementById("save");
    var del = document.getElementById("del");
    
    if(isFromSaved) {
        // Hide fab if loaded from indexed db
        save.style.display = 'none';
        // take the article then display
        getteamById()
        
        del.onclick = function() {
          console.log("Button del clicked.");
          delTeam(idpar);
        };
    } else {
        del.style.display = 'none';
        var item = getteamById();
        save.onclick = function() {
        console.log("Button FAB clicked.");
        item.then(function(data) {
          saveTeam(data);
          console.log(data);
        });
      };
    }
});