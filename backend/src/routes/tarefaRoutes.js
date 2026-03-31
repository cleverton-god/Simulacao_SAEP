const express = require('express');
const router = express.Router();

const controller = require('../controllers/tarefaController');

router.post('/', controller.criarTarefa);

router.get('/', controller.listarTarefas);

router.put('/:id', controller.atualizarStatus);

router.delete('/:id', controller.deletar);

module.exports = router;