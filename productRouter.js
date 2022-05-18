const { Router } = require("express");
const Contenedor = require("./files");
const cont = new Contenedor();
// const arrayProductos = [
//   { title: "Goma", price: 120, thumbnail: "www.google.com" },
// ];
const productosRouter = Router();

productosRouter.get("", (req, res) => {
  (async () => {
    try {
      const arrayData = await cont.getAll();
      res.json(arrayData);
    } catch (e) {
      console.log("Error en getAll: ", e);
    }
  })();
});

//get segun su id
productosRouter.get("/:id", (req, res) => {
  (async () => {
    try {
      const obj = await cont.getById(req.params.id);
      obj.length == 0
        ? res.json({ error: "Producto no encontrado" })
        : res.json(obj);
      res.json(obj);
    } catch (e) {
      console.log("Error en getById: ", e);
    }
  })();
});

productosRouter.post("", (req, res) => {
  (async () => {
    try {
      const producto = req.body;
      const newId = cont.save(producto);
      //res.json(newId);
      return res.status(201).json(newId);
    } catch (e) {
      console.log("Error de IIFE-save", e);
    }
  })();
  //producto.id = producto.length + 1;
  //arrayProductos.push(producto);
});

productosRouter.put("", (req, res) => {
  (async () => {
    try {
      let obj = await cont.getById(req.param.id);
      return res.json(obj);
    } catch (e) {
      console.log("Error de IIFE", e);
    }
  })();
});

productosRouter.delete("", (req, res) => {
  (async () => {
    try {
      await cont.deleteById(req.param.id);
    } catch (e) {
      console.log("Error de IIFE-delete", e);
    }
  })();
});
module.exports = productosRouter;
