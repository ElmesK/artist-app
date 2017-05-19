'use strict';
console.log('logic.js fetched from server and loaded by client machine.');


document.getElementById('getAllArtists').addEventListener('click', function() {
  console.log('getAllArtists button clicked ..');

});

function displayAllArtists(){

 console.log('All artists displayed on page load');

  var xhr = new XMLHttpRequest();

  // listen for state changes in xhr
  xhr.onreadystatechange = function() {
    // if state is complete and ok
    if (this.readyState === 4 && this.status === 200) {
      var artistsReturnedByServer = xhr.responseText;
      console.log('Artists: ' + artistsReturnedByServer);
      document.getElementById('displayArtists').innerHTML = artistsReturnedByServer;
    }
  };

  // Set xhr to perform a HTTP GET request back to server
  // If we don't specify IP or hostname in url,
  // the request is made to server that returned this file (origin)
  // xhr.open(httpMethod, url, asynchronous)
  xhr.open('GET', '/artist', true);

  // fire the request
  xhr.send();
}



function deleteArtist(){
console.log('delete artist button clicked');

document.getElementByid("displayArtists").innerHMTL = "All artist have been deleted";

xhr.onreadystatechange = function() {
    // if state is complete and ok
    if (this.readyState === 4 && this.status === 200) {
     
      console.log('Artists file deleted');
   }
 };

xhr.open('POST', '/artist', true);

xhr.send();

}





