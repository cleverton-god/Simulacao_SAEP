const tarefaModel = require('../models/tarefaModel');

exports.criarTarefa = async (req, res) => {
    try {
        const tarefa = await tarefaModel.criar(req.body);
        res.json(tarefa);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar tarefa' });
    }
};

exports.listarTarefas = async (req, res) => {
    try {
        const tarefas = await tarefaModel.listar();
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar tarefas' });
    }
};

exports.atualizarStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await tarefaModel.atualizarStatus(id, status);
        res.json({ mensagem: 'Status atualizado' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar status' });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await tarefaModel.deletar(id);
        res.json({ mensagem: 'Tarefa deletada' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
};