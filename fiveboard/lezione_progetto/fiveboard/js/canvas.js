var ctx              = null;
var started          = false;
var svg_path         = ""; 

iniziaDisegno = function(evento){
  ctx.beginPath();
  ctx.moveTo(evento.offsetX,evento.offsetY);
  svg_path += "M " + evento.offsetX + " " + evento.offsetY + " ";
  started = true;
}

disegna = function(evento){
  if(started){
    ctx.lineTo(evento.offsetX,evento.offsetY);
    svg_path += "L " + evento.offsetX + " " + evento.offsetY + " ";
    ctx.stroke();
  }
}

EsportaInSVG = function(){
  var bb = new BlobBuilder();
  bb.append( "" +
    "<?xml version='1.0' standalone='no'?>"                   +
    "<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN'"          +
    "  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>"   +
    "<svg width='300px' height='300px' viewbox='0 0 300 300'" +
    "    xmlns='http://www.w3.org/2000/svg' version='1.1'>"   +
    "    <title>SVG: " + titolo_fiveboard + "</title>"                 +
    "    <desc>Un esportazione in SVG del canvas disegnato</desc>" +
    "    <path d='" + svg_path + " z' fill='transparent'" +
    "        stroke='black' stroke-width='1'/>"  +
    "</svg>"
  );
  window.open(window.createObjectURL(bb.getBlob('image/svg+xml')));
}

fermaDisegno = function(evento){
  ctx.closePath();
  started = false;
}

salvaCanvas = function(evento){
  localStorage.setItem("canvas_fb_" + evento.detail, ctx.canvas.toDataURL('image/png'));
  alert("Canvas salvato");
}

recuperaCanvas = function(evento){
  var immagine_salvata = localStorage.getItem("canvas_fb_" + evento.detail);
  if(immagine_salvata == null) return;
  var img = new Image();
  img.src = immagine_salvata;
  ctx.canvas.width = ctx.canvas.width;
  ctx.drawImage(img, 0, 0);
  alert("Canvas recuperato");
}

attivaIlCanvas = function(evento){
  ctx = document.querySelector('canvas').getContext('2d');
  ctx.canvas.addEventListener('mousedown' ,     iniziaDisegno,false );
  ctx.canvas.addEventListener('mousemove' ,     disegna      ,false );
  ctx.canvas.addEventListener('mouseup'   ,     fermaDisegno ,false );
  ctx.canvas.addEventListener('mouseleave',     fermaDisegno ,false );
  document.addEventListener('salvadato',    salvaCanvas         );
  document.addEventListener('recuperadato', recuperaCanvas      );
}

window.addEventListener('load' ,attivaIlCanvas,false);
