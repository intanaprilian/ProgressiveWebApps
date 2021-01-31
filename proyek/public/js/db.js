var dbPromised = idb.open("mengball-reader-lite", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", {
      unique: false
    });
  });
  
  function saveTeam(data) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        console.log(data);
        store.put(data);
        return tx.complete;
      })
      .then(()=>{
        M.toast({ html: `${data.name} Successfully Saved!`,classes: 'rounded'})
        console.log('Team Saved')
    })
}
  
  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(data) {
          resolve(data);
        });
    });
  }
  
  function getSavedById(idParam) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(parseInt(idParam));
        })
        .then(function(datat) {
          resolve(datat);
        });
    });
  }
  
  function delTeam(idpar) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(parseInt(idpar));
        return tx.complete;
    }).then(()=>{
        M.toast({ html: `Deleted success from Favorite!`,classes: 'rounded'})
        loadSavedTeams()
        console.log('delete completed')
    }).catch(err => console.log(err))
}