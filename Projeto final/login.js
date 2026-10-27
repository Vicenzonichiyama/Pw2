const form = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('botaoEntrar');
 
form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
 
    mensagem.textContent = '';
    mensagem.className = '';
 
    botao.disabled = true;
    botao.textContent = 'Verificando...';
 
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;
 
    try {
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({ login, senha })
        });
 
        const dados = await resposta.json();
 
        if (!resposta.ok) {
            mensagem.textContent =
                dados.mensagem || 'Login ou senha incorretos.';
 
            mensagem.className = 'erro';
            return;
        }
 
        window.location.replace(dados.redirecionar);
    } catch (erro) {
        mensagem.textContent =
            'Não foi possível conectar ao servidor.';
 
        mensagem.className = 'erro';
    } finally {
        botao.disabled = false;
        botao.textContent = 'Entrar';
    }
});
