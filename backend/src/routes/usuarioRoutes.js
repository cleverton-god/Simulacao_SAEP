const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioController');

router.post('/', controller.criarUsuario);

router.get('/', controller.listarUsuarios);

module.exports = router;