const form = document.getElementById('formUsuario');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    try {
        const res = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email })
        });

        if (res.ok) {
            mensagem.textContent = "Usuário cadastrado com sucesso!";
            mensagem.style.color = "green";
            form.reset();
        } else {
            mensagem.textContent = "Erro ao cadastrar usuário.";
            mensagem.style.color = "red";
        }

    } catch (error) {
        mensagem.textContent = "Erro na conexão com o servidor.";
        mensagem.style.color = "red";
    }
});