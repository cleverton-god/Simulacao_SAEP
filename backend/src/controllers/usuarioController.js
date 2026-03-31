const usuarioModel = require('../models/usuarioModel');

exports.criarUsuario = async (req, res) => {
    const { nome, email } = req.body;

    try {
        const usuario = await usuarioModel.criar(nome, email);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.listar();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
};