postMessage('Perchè la terra è tonda?');
onmessage = function(event){
  if(event.data != null){
    localStorage.messaggio = event.data;
    postMessage('Perchè:' + event.data + ' ?');
  }
}
