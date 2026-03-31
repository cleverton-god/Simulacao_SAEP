const afazer = document.getElementById('afazer');
const fazendo = document.getElementById('fazendo');
const pronto = document.getElementById('pronto');
const listaUsuarios = document.getElementById('listaUsuarios');

// Carregar tarefas
async function carregarTarefas() {
    const res = await fetch('/tarefas');
    const tarefas = await res.json();

    afazer.innerHTML = '';
    fazendo.innerHTML = '';
    pronto.innerHTML = '';

    tarefas.forEach(t => {
        const div = document.createElement('div');
        div.classList.add('card', t.prioridade.toLowerCase());
        div.innerHTML = `
            <strong>Descrição:</strong> ${t.descricao}<br>
            <strong>Setor:</strong> ${t.setor}<br>
            <strong>Prioridade:</strong> ${t.prioridade}<br>
            <strong>Vinculado a:</strong> ${t.nome}<br><br>
            <button class="editar" onclick="editar(${t.id})">Editar</button>
            <button class="excluir" onclick="deletar(${t.id})">Excluir</button>
            <br><br>
            <select id="status-${t.id}">
                <option value="a fazer" ${t.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                <option value="fazendo" ${t.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                <option value="pronto" ${t.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            </select>
            <button class="status" onclick="mudarStatus(${t.id})">Alterar Status</button>
        `;

        if (t.status === 'a fazer') afazer.appendChild(div);
        if (t.status === 'fazendo') fazendo.appendChild(div);
        if (t.status === 'pronto') pronto.appendChild(div);
    });
}

// Carregar usuários
async function carregarUsuarios() {
    const res = await fetch('/usuarios');
    const usuarios = await res.json();

    listaUsuarios.innerHTML = '';
    usuarios.forEach(u => {
        const li = document.createElement('li');
        li.textContent = u.nome + " (" + u.email + ")";
        listaUsuarios.appendChild(li);
    });
}

carregarTarefas();
carregarUsuarios();