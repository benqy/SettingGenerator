function openDB (name,version) {
  var version=version || 1;
  var request=window.indexedDB.open(name,version);
  request.onerror=function(e){
    console.log(e.currentTarget.error.message);
  };
  request.onsuccess=function(e){
    myDB.db=e.target.result;
  };
  request.onupgradeneeded=function(e){
    console.log('DB version changed to '+version);
  };
}

var myDB={
  name:'test',
  version:3,
  db:null
};
openDB(myDB.name,myDB.version);