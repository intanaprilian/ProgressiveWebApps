var dbPromised = idb.open('football',1,(upgradeDb)=>{
    switch(upgradeDb.oldVersion){
        case 0:
            upgradeDb.createObjectStore('teams',{keyPath: 'id'})
    }
  })
function saveTeam(team){
    dbPromised.then(function(db){
        var tx = db.transaction('teams','readwrite')
        var store = tx.objectStore('teams')
        store.put(team)
        return tx.complete
    })
    .then(()=>{
        M.toast({ html: `${team.name} Succasfully Saved!`,classes: 'rounded'})
        console.log('Team Saved')
    })
}
function getSavedTeams() {
    return dbPromised.then(db=>{
        var tx = db.transaction('teams','readonly')
        var store = tx.objectStore('teams')
        return store.getAll()
    })
}

function deleteSavedTeam(teamId){
    dbPromised.then(db=>{
        var tx = db.transaction('teams','readwrite')
        var store = tx.objectStore('teams')
        store.delete(teamId)
        return tx.complete
    }).then(()=>{
        M.toast({ html: `Team has deleted from Favorite!`,classes: 'rounded'})
        loadSavedTeams()
        console.log('delete completed')
    }).catch(err => console.log(err))
}
const clickedDelete = (teamId)=>{
    const dialog = confirm('Are You Sure want to remove?')
    if(dialog == true){
        deleteSavedTeam(teamId)
    }
}
const loadSavedTeams = ()=>{
    loadingIndicator()
    const teams = getSavedTeams()
    const teamElements = document.getElementById('body-content')

    teams.then(data=>{
        teamData =data
        data == 0 ? teamElements.innerHTML = `<h6 class="center-align">No favorite team found!</6>`:data.forEach(team => {
            teamElements.innerHTML+=`
            <div class="col s12 m7">
              <h2 class="header">${team.name}</h2>
              <div class="card horizontal">
                <div class="card-image">
                  <img src="${team.crestUrl}"onError="this.onerror=null;this.src='https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p><i class="material-icons">info_outline</i>\t${team.shortName}</p>
                    <p><i class="material-icons">place</i>\t${team.address}</p>
                    <p><i class="material-icons">email</i>\t${team.email}</p>
                    <p><i class="material-icons">phone</i>\t${team.phone}</p>
                    <a class="btn-floating halfway-fab waves-effect waves-light red" onClick="clickedDelete(${team.id})" id="saved">
                    <i class="material-icons">delete_forever</i></a>
                  </div>
                  <div class="card-action">
                    <a href="${team.website}">${team.website}</a>
                  </div>
                </div>
              </div>
            </div>`
          })
          
          hideLoadingIndicator()
    })
}