var fiveboards_registrate = new Array();
var dashboard = null;

processa_il_messaggio = function(evento){
  nome_comando   = evento.data.split(":")[0]
  valore_comando = evento.data.substr(nome_comando.length + 1);
  switch (nome_comando){
    case 'registra_client':
      fiveboards_registrate[valore_comando]=evento.target;
      if(dashboard != null){
        dashboard.postMessage("nuova_fiveboard:" + valore_comando);
      }
      break;
    case 'registra_dashboard':
      dashboard = evento.target;
      for(fiveboard in fiveboards_registrate){
        evento.target.postMessage("nuova_fiveboard:" + fiveboard);
      }
      break;
    case 'maggiori_informazioni':
      var channel = new MessageChannel();
      dashboard.postMessage("attendi_testo",[channel.port1]);
      fiveboards_registrate[valore_comando].postMessage("richiedi_testo",[channel.port2]);
      break;
  }
}

onconnect = function(nuova_finestra){
  var port = nuova_finestra.ports[0];
  port.onmessage = processa_il_messaggio;
  port.postMessage("pronto");
}