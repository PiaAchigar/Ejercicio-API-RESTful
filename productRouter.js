const express = require("express");
const { Router } = express;
const Contenedor = require("./files");
const cont = new Contenedor();

// const arrayProductos = [
//   { title: "Goma", price: 120, thumbnail: "www.google.com" },
// ];
const productosRouter = Router();

productosRouter.get("/api/productos", async (req, res) => {
  try {
    const arrayData = await cont.getAll();
    res.json(arrayData);
  } catch (e) {
    console.log("Error en getAll: ", e);
  }
});

//get segun su id
productosRouter.get("/api/productos/:id", async (req, res) => {
  try {
    const obj = await cont.getById(req.params.id);
    obj ? res.json(obj) : res.json({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error en getById: ", e);
  }
});

productosRouter.post("/api/productos", async (req, res) => {
  try {
    const producto = req.body;
    const newId = await cont.save(producto);
    //res.json(newId);
    return res.status(201).json(newId);
  } catch (e) {
    console.log("Error de IIFE-save", e);
  }

  //producto.id = producto.length + 1;
  //arrayProductos.push(producto);
});

productosRouter.put("/api/productos/:id", async (req, res) => {
  try {
    let obj = await cont.getById(req.params.id);
    if (obj) {
      obj.title = req.body.title;
      obj.price = req.body.price;
      obj.thumbnail = req.body.thumbnail;

      res.json(obj);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (e) {
    console.log("Error de IIFE", e);
  }
});

productosRouter.delete("/api/productos/:id", async (req, res) => {
  try {
    const producto = await cont.deleteById(req.params.id);
    console.log({ producto });
    producto
      ? res.send({ Productos: productosDelete })
      : res.send({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error de IIFE-delete", e);
  }
});
module.exports = productosRouter;
