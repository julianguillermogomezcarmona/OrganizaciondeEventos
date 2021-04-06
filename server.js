const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs')

 
//definir puerto que me entrega la nube o uno que definamos
const port =process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Bienvenidos, este es mi primer servidor')
})
 
app.listen(port, ()=>{
  console.log(`servidor corriendo en puerto: ${port}`);
});

app.use(bodyparser.urlencoded({extended:false}));
app.post('/recoger_datos',(req,res)=>{ 
  let n=req.body.numeros;
  n=parseInt(n);
  let textoarchivo=`tabla de multiplicar del numero ${n}\n`;
  for(let i=1; i<=10;i++){
    textoarchivo+=`${n} * ${i}=${n*i}\n`;
  }

  fs.writeFile('./resultado.txt',textoarchivo,(error)=>{
    if(error){
      console.log('error al entrar al archivo');
    }
    else{
      console.log('archivo creado correctamente');
    }
  })

  let textoweb=`<h2>tabla de multiplicar del numero ${n}</h2>\n`;
  for(let i=1; i<=10;i++){
    textoweb+=`<p>${n} * ${i}=${n*i}</p>\n`;  
  }

  res.send(`<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/Normalize.css">
    <link rel="stylesheet" href="assets/css/estilos.css">
    <title>JC eventos</title>
  </head>
  
  <body>
    <header class="fondo">
      <div class="contenedor centrartexto">
        <div class="barra">
          <a href="/">
            <img src="assets/imagenes/flojo.png" alt="logo de la empresa">
          </a>
          <nav class="navegacion letrablanca">
            <a href="Contactanos.html">Contactanos</a>
            <a href="Otros servicios.html">Otros servicios</a>
            <a href="Eventos realizados.html">Eventos realizados</a>
          </nav>
        </div>
        <div class="bajartexto letrablanca">
          <h1>Tabla de multiplicar</h1>
          <p>Somos una empresa prestadora de servicios de decoración, alguiler de elementos para fiesta y demas
            elementos para facilitar tus planes de celebración </p>
        </div>
      </div>
    </header>
<div class="centrarcontenido centrartexto abajo"> 
${textoweb}
</div>


  
<footer>
<div class="barra_footer contenedor">
  <div class="Nombre_de_empresa">
    <h3>JC<span>Eventos</span></h3>
  </div>
  <div class="datos_contacto">
    <h4>Datos para contactarnos</h4>
    <p>Jose carlos cuadrado mendoza</p>
    <p>Email: correo@gmail.com</p>
    <p>telefono: 314869498</p>
    <p>whatsapp: 3218298207</p>
  </div>
</div>
<p class="copy">&copy;2021 derechos reservados</p>
</footer>

  
  </body>
  
  </html>`)
});