const tarefaModel = require('../models/tarefaModel');

exports.criarTarefa = async (req, res) => {
    const { descricao, setor, prioridade, id_usuario } = req.body;

    if (!descricao || !setor || !prioridade || !id_usuario) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const tarefa = await tarefaModel.criar({ descricao, setor, prioridade, id_usuario });
        res.status(201).json(tarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar tarefa' });
    }
};

exports.buscarTarefa = async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await tarefaModel.buscarPorId(id);
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar tarefa' });
    }
};

exports.listarTarefas = async (req, res) => {
    try {
        const tarefas = await tarefaModel.listar();
        res.json(tarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao listar tarefas' });
    }
};

exports.atualizarTarefa = async (req, res) => {
    const { id } = req.params;
    const { descricao, setor, prioridade, status } = req.body;

    if (!descricao || !setor || !prioridade) {
        return res.status(400).json({ erro: 'Descrição, setor e prioridade são obrigatórios' });
    }

    try {
        const tarefa = await tarefaModel.atualizar(id, descricao, setor, prioridade, status);
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }
};

exports.atualizarStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ erro: 'Status é obrigatório' });

    try {
        await tarefaModel.atualizarStatus(id, status);
        res.json({ mensagem: 'Status atualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar status' });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await tarefaModel.deletar(id);
        res.json({ mensagem: 'Tarefa deletada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
};