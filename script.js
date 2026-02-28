// --- FUNÇÃO DE NAVEGAÇÃO ---
function mostrar(aba) {
    const setorVagas = document.getElementById('setor-vagas');
    const setorTalentos = document.getElementById('setor-talentos');
    const btnVagas = document.getElementById('tab-vagas');
    const btnTalentos = document.getElementById('tab-talentos');

    if (aba === 'vagas') {
        setorVagas.style.display = 'block';
        setorTalentos.style.display = 'none';
        btnVagas.classList.add('ativa');
        btnTalentos.classList.remove('ativa');
    } else {
        setorVagas.style.display = 'none';
        setorTalentos.style.display = 'block';
        btnTalentos.classList.add('ativa');
        btnVagas.classList.remove('ativa');
    }
}


function salvarNoBanco(chave, objeto) {
    let lista = JSON.parse(localStorage.getItem(chave)) || [];
    lista.unshift(objeto);
    localStorage.setItem(chave, JSON.stringify(lista));
}


document.getElementById('form-vaga').addEventListener('submit', function (event) {
    event.preventDefault();
    const novaVaga = {
        titulo: document.getElementById('v-titulo').value,
        empresa: document.getElementById('v-empresa').value,
        modalidade: document.getElementById('v-mod').value,
        link: document.getElementById('v-link').value
    };
    salvarNoBanco('vagas', novaVaga);
    this.reset();
    atualizarTelaVagas();
});

function atualizarTelaVagas() {
    const listaDestino = document.getElementById('lista-vagas');
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    listaDestino.innerHTML = "";
    for (let i = 0; i < vagas.length; i++) {
        let v = vagas[i];

        listaDestino.innerHTML += `
            <div class="card">
                <h4>${v.titulo}</h4>
                <p><strong>${v.empresa}</strong></p>
                <p>📍 ${v.modalidade}</p>
                <a href="${v.link}" target="_blank" class="btn-acao">Ver Vaga</a>
            </div>`;
    }
}


document.getElementById('form-talento').addEventListener('submit', function (event) {
    event.preventDefault();
    const novoTalento = {
        nome: document.getElementById('t-nome').value,
        cargo: document.getElementById('t-cargo').value,
        bio: document.getElementById('t-bio').value,
        link: document.getElementById('t-link').value
    };
    salvarNoBanco('talentos', novoTalento);
    this.reset();
    atualizarTelaTalentos(); // Certifique-se que o nome aqui está correto
});

function atualizarTelaTalentos() {
    const listaDestino = document.getElementById('lista-talentos');
    const talentos = JSON.parse(localStorage.getItem('talentos')) || [];
    listaDestino.innerHTML = "";
    for (let i = 0; i < talentos.length; i++) {
        let t = talentos[i];

        listaDestino.innerHTML += `
            <div class="card">
                <h4>${t.nome}</h4>
                <p><strong>🚀 ${t.cargo}</strong></p>
                <p>${t.bio}</p>
                <a href="${t.link}" target="_blank" class="btn-acao">Portfólio</a>
            </div>`;
    }
}


function importarVagasReais() {
    const vagasExemplo = [
        { titulo: "Dev FullStack", empresa: "Senior Sistemas", modalidade: "Híbrido", link: "https://www.senior.com.br" },
        { titulo: "Analista de Dados", empresa: "Softplan", modalidade: "Remoto", link: "https://www.softplan.com.br" },
        { titulo: "UX Designer", empresa: "RD Station", modalidade: "Híbrido", link: "https://www.rdstation.com" }
    ];
    vagasExemplo.forEach(v => salvarNoBanco('vagas', v));
    atualizarTelaVagas();
    alert("Vagas de SC importadas com sucesso!");
}

function importarTalentosReais() {
    const talentosExemplo = [
        { nome: "João Silva", cargo: "Desenvolvedor React", bio: "Especialista em interfaces modernas.", link: "#" },
        { nome: "Maria Oliveira", cargo: "Designer UI/UX", bio: "Focada em acessibilidade digital.", link: "#" }
    ];
    talentosExemplo.forEach(t => salvarNoBanco('talentos', t));
    atualizarTelaTalentos();
    alert("Talentos em destaque importados!");
}


document.addEventListener('DOMContentLoaded', function () {
    atualizarTelaVagas();
    atualizarTelaTalentos();
});