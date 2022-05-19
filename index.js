const express = require("express");
const app = express();
const productosRouter = require("./productRouter");
app.use(express.json());
app.use(express.urlencoded({ express: true }));

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP corriendo en puerto ${PORT}`);
});
server.on("error", (error) => console.log(` Se produjo un error ${error}`));

//dispongo publicamente la carpeta publicamente, no hace falta especificarle el index.html, lo va a buscar por defecto
app.use("/", express.static(__dirname + "/public"));

// me traigo la ruta
app.use("/", productosRouter);
