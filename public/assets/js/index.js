const afazer = document.getElementById('afazer');
const fazendo = document.getElementById('fazendo');
const pronto = document.getElementById('pronto');
const listaUsuarios = document.getElementById('listaUsuarios');

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');
let modalAction = null;

function abrirModal(titulo, conteudoHTML, actionConfirm) {
    modalTitle.textContent = titulo;
    modalBody.innerHTML = conteudoHTML;
    modal.style.display = 'flex';
    modalAction = actionConfirm;
}

modalCancel.addEventListener('click', () => {
    modal.style.display = 'none';
    modalAction = null;
});

modalConfirm.addEventListener('click', async () => {
    if (modalAction) await modalAction();
    modal.style.display = 'none';
    modalAction = null;
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalAction = null;
    }
});

async function carregarTarefas() {
    try {
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
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
                <br><br>
                <select id="status-${t.id}">
                    <option value="a fazer" ${t.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                    <option value="fazendo" ${t.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                    <option value="pronto" ${t.status === 'pronto' ? 'selected' : ''}>Pronto</option>
                </select>
                <button class="status">Alterar Status</button>
            `;

            div.querySelector('.editar').addEventListener('click', () => editarTarefa(t));
            div.querySelector('.excluir').addEventListener('click', () => confirmarExclusao('Tarefa', t.id));
            div.querySelector('.status').addEventListener('click', () => mudarStatus(t.id));

            if (t.status === 'a fazer') afazer.appendChild(div);
            if (t.status === 'fazendo') fazendo.appendChild(div);
            if (t.status === 'pronto') pronto.appendChild(div);
        });
    } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
    }
}

async function editarTarefa(tarefa) {
    const resUsuarios = await fetch('/usuarios');
    const usuarios = await resUsuarios.json();

    const conteudo = `
        <input type="text" id="modal-descricao" value="${tarefa.descricao}" placeholder="Descrição" required />
        <input type="text" id="modal-setor" value="${tarefa.setor}" placeholder="Setor" required />
        <select id="modal-prioridade" required>
            <option value="baixa" ${tarefa.prioridade.toLowerCase() === 'baixa' ? 'selected' : ''}>Baixa</option>
            <option value="media" ${tarefa.prioridade.toLowerCase() === 'media' ? 'selected' : ''}>Média</option>
            <option value="alta" ${tarefa.prioridade.toLowerCase() === 'alta' ? 'selected' : ''}>Alta</option>
        </select>
        <select id="modal-id_usuario" required>
            <option value="">Selecione Responsável</option>
            ${usuarios.map(u => `<option value="${u.id}" ${tarefa.id_usuario == u.id ? 'selected' : ''}>${u.nome}</option>`).join('')}
        </select>
    `;
    abrirModal('Editar Tarefa', conteudo, async () => {
        const updated = {
            descricao: document.getElementById('modal-descricao').value,
            setor: document.getElementById('modal-setor').value,
            prioridade: document.getElementById('modal-prioridade').value,
            id_usuario: parseInt(document.getElementById('modal-id_usuario').value)
        };

        const res = await fetch(`/tarefas/${tarefa.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });

        if (res.ok) {
            carregarTarefas();
        } else {
            console.error('Erro:', res.status);
        }
    });
}

async function deletarTarefa(id) {
    await fetch(`/tarefas/${id}`, { method: 'DELETE' });
    carregarTarefas();
}

async function mudarStatus(id) {
    const select = document.getElementById(`status-${id}`);
    const novoStatus = select.value;

    const res = await fetch(`/tarefas/${id}`);
    const tarefa = await res.json();

    const updated = { ...tarefa, status: novoStatus };

    await fetch(`/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
    });

    carregarTarefas();
}

async function carregarUsuarios() {
    try {
        const res = await fetch('/usuarios');
        const usuarios = await res.json();

        listaUsuarios.innerHTML = '';

        usuarios.forEach(u => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${u.nome} (${u.email})
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
            `;

            li.querySelector('.editar').addEventListener('click', () => editarUsuario(u));
            li.querySelector('.excluir').addEventListener('click', () => confirmarExclusao('Usuário', u.id));

            listaUsuarios.appendChild(li);
        });
    } catch (err) {
        console.error('Erro ao carregar usuários:', err);
    }
}

async function editarUsuario(usuario) {
    const conteudo = `
        <input type="text" id="modal-nome" value="${usuario.nome}" placeholder="Nome" />
        <input type="email" id="modal-email" value="${usuario.email}" placeholder="Email" />
    `;
    abrirModal('Editar Usuário', conteudo, async () => {
        const updated = {
            nome: document.getElementById('modal-nome').value,
            email: document.getElementById('modal-email').value
        };

        await fetch(`/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });

        carregarUsuarios();
        carregarTarefas(); 
    });
}

async function deletarUsuario(id) {
    await fetch(`/usuarios/${id}`, { method: 'DELETE' });
    carregarUsuarios();
}

function confirmarExclusao(tipo, id) {
    abrirModal(`Excluir ${tipo}`, `<p>Tem certeza que deseja excluir este ${tipo}?</p>`, async () => {
        if (tipo === 'Tarefa') await deletarTarefa(id);
        if (tipo === 'Usuário') await deletarUsuario(id);
    });
}

carregarTarefas();
carregarUsuarios();
