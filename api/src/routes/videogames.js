const { Router } = require("express");
const getVideogameById = require("../controllers/getVideogameById");
const postVideogame = require("../controllers/postVideogame");
const getVideogames = require("../controllers/getVideogames");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/:idVideogame", getVideogameById);
router.get("/", getVideogames);
router.post("/", postVideogame);

module.exports = router;
