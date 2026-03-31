const form = document.getElementById('formTarefa');
const mensagem = document.getElementById('mensagem');
const selectUsuario = document.getElementById('id_usuario');

async function carregarUsuarios() {
    const res = await fetch('/usuarios');
    const usuarios = await res.json();

    selectUsuario.innerHTML = '';

    usuarios.forEach(u => {
        const option = document.createElement('option');
        option.value = u.id;
        option.textContent = u.nome;
        selectUsuario.appendChild(option);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const prioridade = document.getElementById('prioridade').value;
    const id_usuario = selectUsuario.value;

    const res = await fetch('/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao, setor, prioridade, id_usuario })
    });

    if (res.ok) {
        mensagem.textContent = "Tarefa cadastrada com sucesso!";
        form.reset();
    } else {
        mensagem.textContent = "Erro ao cadastrar tarefa.";
    }
});

carregarUsuarios();