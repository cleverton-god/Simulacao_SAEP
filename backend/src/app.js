const express = require('express');
const path = require('path');
const app = express();

const usuarioRoutes = require('./routes/usuarioRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/usuarios', usuarioRoutes);
app.use('/tarefas', tarefaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});