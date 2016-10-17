lanciaEvento = function(nome_evento){
  var evento = document.createEvent("CustomEvent");
  evento.initCustomEvent(nome_evento, true, true, titolo_fiveboard);
  document.dispatchEvent(evento);
}

consentiIlDrop = function(evento){
  evento.dataTransfer.dropEffect = 'copy';
  evento.preventDefault();
}

caricaIlContenutoTestuale = function(evento,element){
  var files = evento.dataTransfer.files;
  var reader = new FileReader();
  reader.onload = function(evento){
    element.value = element.value + evento.target.result;
  }
  for(file in files){
    reader.readAsBinaryString(files[file]);
  }
}

salvaAppunti = function(evento){
  localStorage.setItem("fb_" + evento.detail,  
    document.forms['form_da_ricordare'].elements['testo_da_ricordare'].value
  );
  alert("Appunti salvati");
}

recuperaAppunti = function(evento){
  document.forms['form_da_ricordare'].elements['testo_da_ricordare'].value = localStorage.getItem("fb_" + evento.detail); 
  alert("Appunti recuperati");
}

document.addEventListener('salvadato', salvaAppunti);
document.addEventListener('recuperadato', recuperaAppunti);


var titolo_fiveboard = null;
var websocket = null

window.onload = function(){
  
  titolo_fiveboard = prompt("Seleziona il titolo per questa FiveBoard");
  document.title = "FB: " + titolo_fiveboard;
  
  websocket = new WebSocket('ws://0.0.0.0:8080');
  websocket.onopen = function(){
    websocket.send("registra:" + titolo_fiveboard);
  }
  
  document.forms['form_da_ricordare'].elements['testo_da_ricordare'].oninput = function(event){
    websocket.send("aggiorna:" + event.target.value);
  }

  var worker = new SharedWorker('js/hub.js');
  worker.port.onmessage = function(evento){
     nome_comando   = evento.data.split(":")[0]
     valore_comando = evento.data.substr(nome_comando.length + 1);
     console.log("Ricevuto comando: " + nome_comando);
     switch (nome_comando){
       case 'pronto':
        worker.port.postMessage("registra_client:" + titolo_fiveboard);
       break;
       case 'richiedi_testo':
        evento.ports[0].postMessage(
          "testo corrente:"    + document.forms['form_da_ricordare'].elements['testo_da_ricordare'].value + "\n" +
          "testo memorizzato:" + localStorage.getItem("fb_" + titolo_fiveboard)
        );
       break;
     }
  }
}