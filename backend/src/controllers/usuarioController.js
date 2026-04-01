const usuarioModel = require('../models/usuarioModel');

exports.criarUsuario = async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    try {
        const existente = await usuarioModel.buscarPorEmail(email);
        if (existente) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        const usuario = await usuarioModel.criar(nome, email);
        res.status(201).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
};

exports.buscarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioModel.buscarPorId(id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.listar();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
};

exports.atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
        const usuario = await usuarioModel.atualizar(id, nome, email);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
};

exports.deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const deletado = await usuarioModel.deletar(id);
        if (!deletado) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
};