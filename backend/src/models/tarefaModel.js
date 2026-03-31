const db = require('../database/db');

exports.criar = async (dados) => {
    const result = await db.query(
        `INSERT INTO tarefas 
        (id_usuario, descricao, setor, prioridade, status) 
        VALUES ($1, $2, $3, $4, 'a fazer') RETURNING *`,
        [dados.id_usuario, dados.descricao, dados.setor, dados.prioridade]
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