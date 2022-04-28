//llamado de las dependencias
const express = require("express");
const bodyParser = require("body-parser");
//nueva instancia de express
const app = express();

//puerto de escucha
app.listen(3000, console.log("Server on 3000 port"));

//midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar la funciones desde consultas.js
const {
  nuevoCurso,
  getCursos,
  editarCurso,
  deleteCursos,
} = require("./consultas");

app.post("/curso", async (req, res) => {
  const { nombre, nivel, fecha, duracion } = req.body;
  const respuesta = await nuevoCurso(nombre, nivel, fecha, duracion);
  //devolvemos la respuesta al cliente de la función nuevo canal
  res.send(respuesta);
});

//ruta raiz
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//creamos ruta get de cursos
app.get("/cursos", async (req, res) => {
  const respuesta = await getCursos();
  res.send(respuesta);
});

//creamos ruta put de canales
app.put("/curso/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, nivel, fecha, duracion } = req.body;
  const respuesta = await editarCurso(id, nombre, nivel, fecha, duracion);
  res.send(respuesta);
});

//Ruta Delete
app.delete("/curso/:id", async (req, res) => {
  const { id } = req.params;
  //cursos = cursos.filter((c) => c.id !== id)// !== descarta el canal que no queremos mostrar
  const respuesta = await deleteCursos(id);
  respuesta > 0
    ? res.send(`El curso con id ${id} fue elimado con éxito`)
    : res.send("No existe el curso registrado con ese id");
});
