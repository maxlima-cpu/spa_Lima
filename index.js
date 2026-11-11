const express = require('express');

const mysql=require("mysql");
const app = express()
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));

let conexion=mysql.createConnection({
    host:"localhost",
    database:"spapallini",
    user:"root",
    password:""
})
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/validar", function(req, res){
  const datos =req.body;
  console.log(datos);
  let nombres=datos.nombres;
  let celular=datos.celular;
  let correo=datos.correo;
  let comentarios=datos.comentarios;

  let registrar="INSERT INTO info (nombres, celular, correo, comentarios) VALUES ('"+nombres+"','"+celular+"','"+correo+"','"+comentarios+"')";
  conexion.query(registrar, function(error){
    if (error) {
      throw error;
    }else{
      //console.log("Datos enviados corectamente");
      res.send(`
        <script>
          alert("Datos enviados correctamente");
          window.location.href="/";
        </script>
        `);
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor creado en Localhost");
})