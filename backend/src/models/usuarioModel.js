const db = require('../database/db');

exports.criar = async (nome, email) => {
    const result = await db.query(
        'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
        [nome, email]
    );
    return result.rows[0];
};

exports.listar = async () => {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
};