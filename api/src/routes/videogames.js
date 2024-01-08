const { Router } = require("express");
const getVideogameById = require("../controllers/getVideogameById");
const getVideogameByName = require("../controllers/getVideogameByName");
const postVideogame = require("../controllers/postVideogame");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/:idVideogame", getVideogameById);
router.get("/", getVideogameByName);
router.post("/", postVideogame);

module.exports = router;
