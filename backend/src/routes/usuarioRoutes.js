const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.post('/', controller.criarUsuario);       
router.get('/', controller.listarUsuarios);     
router.get('/:id', controller.buscarUsuario);
router.put('/:id', controller.atualizarUsuario); 
router.delete('/:id', controller.deletarUsuario);

module.exports = router;