import Filme from "../model/filme";

class FilmeController {
    constructor() {
        this.listaFilmes = [];
        this.idEmEdicao = null;
        this.init();
    }

    init() {
        const btnNovo = document.getElementById("btnNovo");
        const btnSalvarFilme = document.getElementById("btnSalvarFilme");
        const btnCancelar = document.querySelector(".btn-secondary[data-bs-dismiss='modal']");
        const btnExcluirFilme = document.getElementById("btnExcluirFilme");

        btnNovo.addEventListener("click", this.abrirModalCadastro.bind(this));
        btnSalvarFilme.addEventListener("click", this.salvar.bind(this));
        btnCancelar.addEventListener("click", () => {
            this.limparFormulario();
            this.fecharModal("idModalFilme");
        });
        btnExcluirFilme.addEventListener("click", () => this.excluir(this.idParaExcluir));

        this.carregarFilmesDoLocalStorage();
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
        this.atualizarTabela();

        // Fecha o modal
        this.fecharModal("idModalFilme");
    }

    criarFilmeDoFormulario() {
        const duracao = document.getElementById("duracao").value;
        console.log("Duração capturada:", duracao); // Verifica o valor capturado
        return new Filme(
            this.idEmEdicao || Date.now(),
            document.getElementById("titulo").value,
            document.getElementById("genero").value,
            parseInt(document.getElementById("classificacao").value),
            duracao,
            document.getElementById("dataEstreia").value
        );
    }

    salvarNoLocalStorage() {
        localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
    }

    carregarFilmesDoLocalStorage() {
        const filmesSalvos = localStorage.getItem("filmes");
        if (filmesSalvos) {
            this.listaFilmes = JSON.parse(filmesSalvos);
            this.atualizarTabela();
        }
    }

    atualizarTabela() {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        this.listaFilmes.forEach(filme => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${filme.id}</td>
                <td><strong>${filme.titulo}</strong></td>
                <td>${filme.genero}</td>
                <td>${filme.classificacao}</td>
                <td>${filme.duracao}</td> <!-- Exibe a duração -->
                <td>${this.formatarData(filme.dataEstreia)}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${filme.id}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    &nbsp;
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${filme.id}">
                        <i class="bi bi-trash-fill"></i>
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
        this.atualizarTabela();
    }

    abrirModalCadastro() {
        // Limpa os campos do formulário
        this.limparFormulario();

        // Reseta o ID de edição
        this.idEmEdicao = null;

        // Atualiza o título do modal
        document.getElementById("idModalFilmeTitulo").textContent = "Cadastrar Filme";

        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById("idModalFilme"));
        modal.show();
    }

    abrirModalEdicao(filme) {
        this.idEmEdicao = filme.id;
        document.getElementById("titulo").value = filme.titulo;
        document.getElementById("genero").value = filme.genero;
        document.getElementById("classificacao").value = filme.classificacao;
        document.getElementById("duracao").value = filme.duracao;
        document.getElementById("dataEstreia").value = filme.dataEstreia;

        document.getElementById("idModalFilmeTitulo").textContent = "Editar Filme";
        const modal = new bootstrap.Modal(document.getElementById("idModalFilme"));
        modal.show();
    }

    abrirModalExcluir(id) {
        // Armazena o ID do filme a ser excluído
        this.idParaExcluir = id;

        // Exibe o modal de exclusão
        const modal = new bootstrap.Modal(document.getElementById("modalExcluirFilme"));
        modal.show();
    }

    limparFormulario() {
        document.getElementById("formFilme").reset();
        this.idEmEdicao = null; // Reseta o ID de edição
    }

    fecharModal(modalId) {
        const modalElement = document.getElementById(modalId);
        const modalInstance = bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
            modalInstance.hide();
        }

        // Fallback para garantir que a classe modal-open seja removida
        document.body.classList.remove("modal-open");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
            backdrop.remove();
        }
    }

    formatarData(data) {
        const d = new Date(data);
        return d.toLocaleDateString("pt-BR");
    }
}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const filmeController = new FilmeController();
    window.filmeController = filmeController; // Exposição global, se necessário
});