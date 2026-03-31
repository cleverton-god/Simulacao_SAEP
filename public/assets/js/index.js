const afazer = document.getElementById('afazer');
const fazendo = document.getElementById('fazendo');
const pronto = document.getElementById('pronto');

async function carregarTarefas() {
    const res = await fetch('/tarefas');
    const tarefas = await res.json();

    afazer.innerHTML = '';
    fazendo.innerHTML = '';
    pronto.innerHTML = '';

    tarefas.forEach(t => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
            <strong>Descrição:</strong> ${t.descricao}<br>
            <strong>Setor:</strong> ${t.setor}<br>
            <strong>Prioridade:</strong> ${t.prioridade}<br>
            <strong>Vinculado a:</strong> ${t.nome || t.id_usuario}<br><br>

            <button onclick="editar(${t.id})">Editar</button>
            <button onclick="deletar(${t.id})">Excluir</button>
            <br><br>

            <select id="status-${t.id}">
                <option value="a fazer" ${t.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                <option value="fazendo" ${t.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                <option value="pronto" ${t.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            </select>

            <button onclick="mudarStatus(${t.id})">Alterar Status</button>
        `;

        if (t.status === 'a fazer') afazer.appendChild(div);
        if (t.status === 'fazendo') fazendo.appendChild(div);
        if (t.status === 'pronto') pronto.appendChild(div);
    });
}

async function mudarStatus(id) {
    const select = document.getElementById(`status-${id}`);
    const status = select.value;

    await fetch(`/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });

    carregarTarefas();
}

async function deletar(id) {
    const confirmar = confirm("Tem certeza que deseja excluir?");
    if (!confirmar) return;

    await fetch(`/tarefas/${id}`, {
        method: 'DELETE'
    });

    carregarTarefas();
}

carregarTarefas();