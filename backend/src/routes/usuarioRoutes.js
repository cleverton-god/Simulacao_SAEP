const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

// CRUD completo
router.post('/', controller.criarUsuario);       
router.get('/', controller.listarUsuarios);     
router.put('/:id', controller.atualizarUsuario); 
router.delete('/:id', controller.deletarUsuario);

module.exports = router;