CREATE DATABASE sistema_tarefas;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    descricao TEXT NOT NULL,
    setor VARCHAR(100) NOT NULL,
    prioridade VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'a fazer',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
