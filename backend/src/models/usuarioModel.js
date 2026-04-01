const db = require('../database/db');

exports.criar = async (nome, email) => {
    const result = await db.query(
        'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
        [nome, email]
    );
    return result.rows[0];
};

exports.buscarPorId = async (id) => {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
};

exports.listar = async () => {
    const result = await db.query('SELECT * FROM usuarios ORDER BY id ASC');
    return result.rows;
};

exports.buscarPorEmail = async (email) => {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
};

exports.atualizar = async (id, nome, email) => {
    const result = await db.query(
        'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
        [nome, email, id]
    );
    return result.rows[0];
};

exports.deletar = async (id) => {
    // Primeiro deletar tarefas vinculadas
    await db.query('DELETE FROM tarefas WHERE id_usuario = $1', [id]);
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
