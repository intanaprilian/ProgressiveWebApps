const base_url = "https://api.football-data.org/v2/";
const API = '66e50b4f9ab0466593bd4f17f2d551be';
const id_liga = 2021;
const match = `${base_url}competitions/${id_liga}/matches`;
const teams = `${base_url}competitions/${id_liga}/teams`;
const myteam = `${base_url}teams/`;
// Block of code that will be called if fetch is successful
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // reject () method will make the catch block invoke
    return Promise.reject(new Error(response.statusText));
  } else {
    // Turn an object into Promise so that it can be " -> then"
    return Promise.resolve(response);
  }
}
// Block of code to parse json into a JavaScript array
function json(response) {
  return response.json();
}
// Code block to handle errors in the catch block
function error(error) {
  // Error parameter is from Promise.reject ()
  console.log("Error : " + error);
}
// Code block for making json data requests
function getMatches() {
  if ("caches" in window){
    caches.match(match).then(function(response){
      if (response){
        response.json().then(function(data){
          let matchDetail = '<div class="card-panel center grey white"><h4>Macth Schedule</h4> <img src="images/premier.png" alt="premier" class="responsive-img materialboxed center"></div>';
      data.matches.forEach(function(play){
        matchDetail += `
        <div class="width: 100% "col s6">
          <div class="col s6">
            <div class="card grey lighten-3">
              <div class="card-content">
                <p><b>Matchday ${play.matchday} of 38</b></p>
                <table class="responsive-table light-blue darken-4">
                  <tbody>
                    <tr>
                      <td class="grey-text text-lighten-5">${play.homeTeam.name}</td>  
                      <td class="grey-text text-lighten-5">${play.score.fullTime.homeTeam}</td>
                    </tr>
                    <tr>
                      <td class="grey-text text-lighten-5">${play.awayTeam.name}</td>
                      <td class="grey-text text-lighten-5">${play.score.fullTime.awayTeam}</td>
                    </tr>
                    <tr>
                    <td rowspan="2" class="center light-blue darken-4 grey-text text-lighten-5">${dmy(new Date(play.utcDate))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      matchHTML = `
        <div class="row">
                ` + matchDetail + `
        </div>
      `;
      document.getElementById("body-content").innerHTML = matchHTML;

        var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems);
        })
      }
    })
  }

  fetch(match,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      let matchDetail = '<div class="card-panel center white"><h4>Macth Schedule</h4><img src="images/premier.png" alt="premier" class="responsive-img materialboxed center"></div>';
      data.matches.forEach(function(play){
        matchDetail += `
        <div class="width: 100% "col s6">
          <div class="col s6">
            <div class="card grey lighten-3">
              <div class="card-content">
                <p><b>Matchday ${play.matchday} of 38</b></p>
                <table class="responsive-table light-blue darken-4">
                  <tbody>
                    <tr>
                      <td class="grey-text text-lighten-5">${play.homeTeam.name}</td>  
                      <td class="grey-text text-lighten-5">${play.score.fullTime.homeTeam}</td>
                    </tr>
                    <tr>
                      <td class="grey-text text-lighten-5">${play.awayTeam.name}</td>
                      <td class="grey-text text-lighten-5">${play.score.fullTime.awayTeam}</td>
                    </tr>
                    <tr>
                      <td rowspan="2" class="center light-blue darken-4 grey-text text-lighten-5">${dmy(new Date(play.utcDate))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      matchHTML = `
        <div class="row">
                ` + matchDetail + `
        </div>
      `;
      document.getElementById("body-content").innerHTML = matchHTML;

        var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems);
    })
    .catch(error);
}
function dmy (date){
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function getTeams() {
  if ("caches" in window){
    caches.match(teams).then(function(response){
      if (response){
        response.json().then(function(data){
          let detailTeams = '<div class="card-panel center grey lighten-5"><h4>Choose Your Teams Detail</h4><img src="images/jerseys.jpeg" alt="premier" class="responsive-img materialboxed center"></div>';
          data.teams.forEach(function(team){
            detailTeams += `
            <div class="width: 100%>
              <div class="col s6">
                <div class="card grey lighten-3">
                  <div class="card-image waves-effect waves-block waves-light card-image-a">
                    <a href="./detailteams.html?id=${team.id}">
                      <img src="${team.crestUrl}" class="responsive-img">
                    </a>
                  </div>
                  <div class="card-content center grey lighten-4">
                    <span class="card-title grey-text text-darken-4 truncate">${team.name}</span>
                    <p>${team.venue}</p>
                  </div>
                  <div class="card-action center light-blue darken-4">
                    <a href="./detailteams.html?id=${team.id}">Detail Teams</a>
                  </div>
                </div>
              </div>
            </div>
            `;
          });
          
          teamsHTML = `
          <ul class="collection">
                  ` + detailTeams + `
          </ul>
        `;
          document.getElementById("body-content").innerHTML = teamsHTML;

          var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems);
        })
      }
    })
  }
  fetch(teams,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      
      let detailTeams = '<div class="card-panel center grey lighten-5"><h4>Choose Your Teams Detail</h4><img src="images/jerseys.jpeg" alt="premier" class="responsive-img materialboxed center"></div>';
      data.teams.forEach(function(team){
        detailTeams += `
          <div class="width: 100%>
            <div class="col s6">
              <div class="card grey lighten-3">
                  <div class="card-image waves-effect waves-block waves-light card-image-a">
                    <a href="./detailteams.html?id=${team.id}">
                      <img src="${team.crestUrl}" class="responsive-img">
                    </a>
                    </div>
                      <div class="card-content center grey lighten-4">
                        <span class="card-title grey-text text-darken-4 truncate">${team.name}</span>
                        <p>${team.venue}</p>
                      </div>
                      <div class="card-action center light-blue darken-4">
                        <a href="./detailteams.html?id=${team.id}">Detail Teams</a>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        `;
      });
      teamsHTML = `
        <ul class="collection">
                ` + detailTeams + `
        </ul>
      `;
      document.getElementById("body-content").innerHTML = teamsHTML;

      var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems);
    })
    .catch(error);
}

function getteamById() {
  return new Promise(function(resolve, reject) {
    // Retrieve the parameter query value (? Id =)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    if ("caches" in window) {
      caches.match(myteam + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let detailTeams = `
            <div class="card mt-2 p2">
        <div class="row">
          <div class="col s12 m4 center">
            <img src="${data.crestUrl}" class="responsive-img"/>
                </div>
                <div class="col s12 m8">
                  <table>
                    <tbody>
                      <tr>
                  <th>Team Name</th>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <th>Short Name</th>
                  <td>${data.shortName}</td>
                </tr>
                <tr>
                  <th>Colors</th>
                  <td>${data.clubColors}</td>
                </tr>
                <tr>
                  <th>Stadium</th>
                  <td>${data.venue}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>${data.area.name}</td>
                </tr>
                <tr>
                  <th>Founded</th>
                  <td>${data.founded}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>${data.address}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>${data.phone}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>${data.website}</td>
                </tr>
              </tbody>
            </table>
          </div>
            `;
            detailTeams += `
            <h5>Squads</h5>
            <div>
                <table class="striped highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Shirt Number</th>
                            <th>Nationality</th>
                        </tr>
                    </thead>
                    <tbody id="squadContainer">            
            `;

            data.squad.forEach(player => {
                if (player.role !== "COACH") {
                  detailTeams += `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.position}</td>
                        <td>${player.shirtNumber !== null ? player.shirtNumber : "-"}</td>
                        <td>${player.nationality}</td>
                    </tr>
                    `;
                }
            })

            detailTeams += `
                </tbody>
                </table>
            </div>    
            `;

            document.getElementById("content").innerHTML = detailTeams;
            resolve(data);
          });
        }
      });
    }
    
    fetch(myteam + idParam, {headers : {'X-Auth-Token' : API}})
      .then(status)
      .then(json)
      .then(function(data) {
        // JavaScript objects from response.json () enter through variable data
        console.log(data);
        // Arrange article card components dynamically
        
        let detailTeams = `
        <div class="collection center black-text grey lighten-4">
        <h5>Team Details</h5>
        </div>
        <div class="card mt-2 p2">
        <div class="row">
          <div class="col s12 m4 center">
            <img src="${data.crestUrl}" class="responsive-img"/>
                </div>
                <div class="col s12 m8">
                  <table>
                  <tbody>
                  <tr>
              <th>Team Name</th>
              <td>${data.name}</td>
            </tr>
            <tr>
              <th>Short Name</th>
              <td>${data.shortName}</td>
            </tr>
            <tr>
              <th>Colors</th>
              <td>${data.clubColors}</td>
            </tr>
            <tr>
              <th>Stadium</th>
              <td>${data.venue}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>${data.email}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>${data.area.name}</td>
            </tr>
            <tr>
              <th>Founded</th>
              <td>${data.founded}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>${data.address}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>${data.phone}</td>
            </tr>
            <tr>
              <th>Website</th>
              <td>${data.website}</td>
            </tr>
          </tbody>
        </table>
      </div>
        `;

        detailTeams += `
        <div class="collection center black-text grey lighten-4">
        <h5>Squads</h5>
        </div>
        <div>
            <table class="striped highlight responsive-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Shirt Number</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody id="squadContainer">            
        `;

        data.squad.forEach(player => {
            if (player.role !== "COACH") {
              detailTeams += `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.position}</td>
                    <td>${player.shirtNumber !== null ? player.shirtNumber : "-"}</td>
                    <td>${player.nationality}</td>
                </tr>
                `;
            }
        })

        detailTeams += `
            </tbody>
            </table>
        </div>    
        `;
        
        document.getElementById("content").innerHTML = detailTeams;
        
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(data) {
    console.log(data);
    // Arrange article card components dynamically
    let detailTeams = '<div class="card-panel center grey lighten-5"><img src="images/favorit.jpg" alt="premier" class="responsive-img materialboxed center"></div>';
      data.forEach(function(team){
        detailTeams += `
        <div class="width: 100%>
          <li class="collection-item avatar">
            <a href="./detailteams.html?id=${team.id}&saved=true">
            <img src="${team.crestUrl}" class="teamimg center" alt="Universe">
            <span class="title center"><h6><b>${team.name}</b></h6></span>
            <span class="title center"><p>${team.venue}</p></span>
            </a>
          </li>
        </div>
        `;
      });
      teamsHTML = `
        <ul class="collection">
                ` + detailTeams + `
        </ul>
      `;
      document.getElementById("body-content").innerHTML = teamsHTML;

      var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems);
  });
}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
}