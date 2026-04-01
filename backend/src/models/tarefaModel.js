const db = require('../database/db');

exports.criar = async ({ id_usuario, descricao, setor, prioridade }) => {
    const result = await db.query(
        `INSERT INTO tarefas 
         (id_usuario, descricao, setor, prioridade, status) 
         VALUES ($1, $2, $3, $4, 'a fazer') RETURNING *`,
        [id_usuario, descricao, setor, prioridade]
    );
    return result.rows[0];
};

exports.buscarPorId = async (id) => {
    const result = await db.query(
        `SELECT t.*, u.nome 
         FROM tarefas t
         JOIN usuarios u ON t.id_usuario = u.id
         WHERE t.id = $1`,
        [id]
    );
    return result.rows[0];
};

exports.listar = async () => {
    const result = await db.query(
        `SELECT t.*, u.nome 
         FROM tarefas t
         JOIN usuarios u ON t.id_usuario = u.id`
    );
    return result.rows;
};

exports.atualizar = async (id, descricao, setor, prioridade, status, id_usuario) => {
    const result = await db.query(
        `UPDATE tarefas SET 
         descricao = $1, setor = $2, prioridade = $3, status = COALESCE($4, status), id_usuario = $6
         WHERE id = $5 RETURNING *`,
        [descricao, setor, prioridade, status, id, id_usuario]
    );
    return result.rows[0];
};

exports.atualizarStatus = async (id, status) => {
    await db.query(
        'UPDATE tarefas SET status = $1 WHERE id = $2',
        [status, id]
    );
};

exports.deletar = async (id) => {
    await db.query(
        'DELETE FROM tarefas WHERE id = $1',
        [id]
    );
};