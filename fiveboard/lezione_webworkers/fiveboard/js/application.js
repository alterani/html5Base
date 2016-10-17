salvaIlDato = function(info_da_salvare){
  localStorage.setItem("fb_" + titolo_fiveboard,info_da_salvare);
  alert("Memorizzazione effettuata");
};

recuperaIlDato = function(elemento){
  if(confirm("Sostituire il contenuto attuale con l'ultimo pensiero memorizzato?")){
    elemento.value = localStorage.getItem("fb_" + titolo_fiveboard); 
  }
};

var titolo_fiveboard = null;
window.onload = function(){
  var worker = new SharedWorker('js/hub.js');
  worker.port.onmessage = function(evento){
     nome_comando   = evento.data.split(":")[0]
     valore_comando = evento.data.substr(nome_comando.length + 1);
     switch (nome_comando){
       case 'pronto':
        titolo_fiveboard = prompt("Seleziona il titolo per questa FiveBoard");
        document.title = "FB: " + titolo_fiveboard;
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