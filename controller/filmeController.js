import Filme from "../model/filme.js";

class FilmeController {
    constructor() {
        this.listaFilmes = [];
        this.idEmEdicao = null;
        this.init();
    }

    init() {
        // const btnNovo = document.getElementById("btnNovo");
        const btnSalvarFilme = document.getElementById("btnSalvarFilme");
        const btnBuscarFilme = document.getElementById("btnBuscarFilme");
        const btnNovo = document.getElementById("btnNovo");
        
        btnNovo.addEventListener("click", this.cadastrarFilme.bind(this));
        btnSalvarFilme.addEventListener("click", this.salvar.bind(this));
        btnBuscarFilme.addEventListener("click", this.buscarFilme.bind(this));

        this.carregarFilmesDoLocalStorage();
    }

    cadastrarFilme() {
        document.getElementById("titulo").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("classificacao").value = "";
        document.getElementById("duracao").value = "";
        document.getElementById("dataEstreia").value = null;
        this.idEmEdicao = null;
    }

    buscarFilme() {
        const nomeFilme = document.getElementById("buscaNomeFilme").value;
        if (nomeFilme === "") {
            this.atualizarTabela(this.listaFilmes);
            return;
        }
        const resultado = this.listaFilmes.filter(filme => filme.getTitulo().toLowerCase().includes(nomeFilme.toLowerCase()));
        this.atualizarTabela(resultado);
    }

    salvar() {
        const filme = this.criarFilmeDoFormulario();

        if (this.idEmEdicao) {
            // Atualiza filme existente
            const index = this.listaFilmes.findIndex(f => f.id === this.idEmEdicao);
            this.listaFilmes[index] = filme;
        } else {
            // Adiciona novo filme
            this.listaFilmes.push(filme);
        }

        // Salva no localStorage e atualiza a tabela
        this.salvarNoLocalStorage();
        this.atualizarTabela(this.listaFilmes);

        // Fecha o modal
        // this.fecharModal("idModalFilme");
    }

    criarFilmeDoFormulario() {
        return new Filme(
            document.getElementById("titulo").value,
            document.getElementById("descricao").value,
            document.getElementById("genero").value,
            document.getElementById("classificacao").value,
            document.getElementById("duracao").value,
            document.getElementById("dataEstreia").value,
            this.idEmEdicao || Date.now(),
        );
    }

    salvarNoLocalStorage() {
        localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
    }

    excluir(id) {
        this.listaFilmes = this.listaFilmes.filter(filme => filme.id !== id);
        this.salvarNoLocalStorage();
        this.atualizarTabela();
    }

    abrirModalExcluir(id) {
        // Exibe o modal de exclusão
        const modal = new bootstrap.Modal(document.getElementById("modalExcluirFilme"));
        modal.show();
        const btnExcluirFilme = document.getElementById("btnExcluirFilme");
        btnExcluirFilme.addEventListener("click", this.excluir.bind(this, id));
    }

    limparFormulario() {
        document.getElementById("formFilme").reset();
        this.idEmEdicao = null; // Reseta o ID de edição
    }

    carregarFilmesDoLocalStorage() {
        const filmesSalvos = localStorage.getItem("filmes");
        if (filmesSalvos) {
            this.listaFilmes = JSON.parse(filmesSalvos).map(filme => new Filme(
                filme.titulo,
                filme.descricao,
                filme.genero,
                filme.classificacao,
                filme.duracao,
                filme.dataEstreia,
                filme.id
            ));
            this.atualizarTabela(this.listaFilmes);
        }
    }

    atualizarTabela(listaFilmes) {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        listaFilmes.forEach(filme => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${filme.id}</td>
                <td><strong>${filme.titulo}</strong></td>
                <td>${filme.genero}</td>
                <td>${filme.classificacao}</td>
                <td>${filme.duracao}</td>
                <td>${this.formatarData(filme.dataEstreia)}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar align-top" data-id="${filme.id}">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm btn-excluir align-top" data-id="${filme.id}">
                        Excluir
                    </button>
                </td>
            `;
            tbody.appendChild(tr);

            // Adiciona evento para o botão de editar
            tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(filme));
            tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(filme.id));
        });
    }

    excluir(id) {
        this.listaFilmes = this.listaFilmes.filter(filme => filme.id !== id);
        this.salvarNoLocalStorage();
        this.atualizarTabela(this.listaFilmes);
    }

    abrirModalCadastro() {
        // Limpa os campos do formulário
        this.limparFormulario();

        // Reseta o ID de edição
        this.idEmEdicao = null;

        // Atualiza o título do modal
        document.getElementById("idModalFilmeTitulo").textContent = "Cadastrar Filme";

    }

    abrirModalEdicao(filme) {
        this.idEmEdicao = filme.id;
        document.getElementById("titulo").value = filme.titulo;
        document.getElementById("genero").value = filme.genero;
        document.getElementById("classificacao").value = filme.classificacao;
        document.getElementById("duracao").value = filme.duracao;
        document.getElementById("dataEstreia").value = filme.dataEstreia;
        document.getElementById("descricao").value = filme.descricao;

        document.getElementById("idModalFilmeTitulo").textContent = "Editar Filme";
        const modal = new bootstrap.Modal(document.getElementById("idModalFilme"));
        modal.show();
    }

    formatarData(data) {
        const d = new Date(data);
        return d.toLocaleDateString("pt-BR");
    }
}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const filmeController = new FilmeController();
});