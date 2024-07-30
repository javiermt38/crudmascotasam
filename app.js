const express = require('express')
const app = express()
const port = 3000

/* conexion a la base de datos */
  const mongoose = require('mongoose');
  const usuario = "fullstack_basico";
  const password = "3W2jxUMVV1y9UYKK";
  const dbName = "mascotas";

  const url = `mongodb+srv://${usuario}:${password}@cluster0.abyusfl.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.connect(url)
    .then(()=> console.log('conectado a MongoDB'))
    .catch(e=> console.log('error de conexion a MongoDB', e))

/* establecemos el motor de plantillas */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/* middleware para contenido estatico */ 
app.use(express.static(__dirname + '/public'));

/* enrutamiento del proyecto  */
app.use('/', require('./router/rutasweb'));
app.use('/mascotas', require('./router/mascotas'));


/* direccionar a vista 404 cuando se presente el error 404 */
app.use((req, res, next)=>{
  res.status(404).render('404', {
    titulo: "Error 404",
    descripcion: "Página No Encontrada"
  });
})

app.listen(port, () => {
  console.log(`Ejemplo aplicación Node con Express escuchando en puerto ${port}`);
})
