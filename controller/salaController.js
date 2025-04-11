import Sala from "../model/sala.js";

class SalaController {
    constructor() {
        this.listaSalas = [];
        this.idEmEdicao = null;
        this.init();
    }

    init() {
        const btnNovo = document.getElementById("btnNovo");
        const btnSalvarSala = document.getElementById("btnSalvarSala");
        const btnBuscarSala = document.getElementById("btnBuscarSala");

        btnNovo.addEventListener("click", this.cadastrarSala.bind(this));
        btnSalvarSala.addEventListener("click", this.salvar.bind(this));
        btnBuscarSala.addEventListener("click", this.buscarSala.bind(this));

        this.carregarSalasDoLocalStorage();
    }

    cadastrarSala() {
        document.getElementById("nomeSala").value = "";
        document.getElementById("capacidade").value = "";
        document.getElementById("tipo").value = "";
        this.idEmEdicao = null;
    }

    salvar() {
        const sala = this.criarSalaDoFormulario();

        if (this.idEmEdicao) {
            // Atualiza sala existente
            const index = this.listaSalas.findIndex(s => s.id === this.idEmEdicao);
            this.listaSalas[index] = sala;
        } else {
            // Adiciona nova sala
            this.listaSalas.push(sala);
        }
        this.salvarNoLocalStorage();
        this.atualizarTabela(this.listaSalas);
    }

    criarSalaDoFormulario() {
        return new Sala(
            this.idEmEdicao || Date.now(),
            document.getElementById("nomeSala").value,
            document.getElementById("capacidade").value,
            document.getElementById("tipo").value
        );
    }

    salvarNoLocalStorage() {
        localStorage.setItem("salas", JSON.stringify(this.listaSalas));
    }

    carregarSalasDoLocalStorage() {
        const salasSalvas = localStorage.getItem("salas");
        if (salasSalvas) {
            this.listaSalas = JSON.parse(salasSalvas).map(
                (sala) => new Sala(sala.id, sala.nome, sala.capacidade, sala.tipo)
            );
            this.atualizarTabela(this.listaSalas);
        }
    }

    buscarSala() {
        const nomeSala = document.getElementById("buscaNomeSala").value;
        if (nomeSala === "") {
            this.atualizarTabela(this.listaSalas);
            return;
        }
        const resultado = this.listaSalas.filter(sala => sala.nome.toLowerCase().includes(nomeSala.toLowerCase()));
        this.atualizarTabela(resultado);
    }

    abrirModalEdicao(sala) {
        this.idEmEdicao = sala.getId();
        document.getElementById("nomeSala").value = sala.getNome();
        document.getElementById("capacidade").value = sala.getCapacidade();
        document.getElementById("tipo").value = sala.getTipo();
        document.getElementById("idModalSalaTitulo").textContent = "Editar Sala";
        const modal = new bootstrap.Modal(document.getElementById("idModalSala"));
        modal.show();
    }

    abrirModalExcluir(salaId)  {
        const modal = new bootstrap.Modal(document.getElementById("modalExcluirSala"));
        modal.show();
        const btnExcluirSala= document.getElementById("btnExcluirSala");
        btnExcluirSala.addEventListener("click", this.excluir.bind(this, salaId));
    }

    excluir(id) {
        this.listaSalas = this.listaSalas.filter(element => element.getId() !== id);
        this.salvarNoLocalStorage();
        this.atualizarTabela(this.listaSalas);
    }

    atualizarTabela(salas) {
        const tabela = document.querySelector("tbody");
        tabela.innerHTML = ""; // Limpa a tabela

        salas.forEach((sala) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${sala.getId()}</td>
                <td>${sala.getNome()}</td>
                <td>${sala.getCapacidade()}</td>
                <td>${sala.getTipo()}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar align-top" data-id="${sala.id}">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm btn-excluir align-top" data-id="${sala.id}">
                        Excluir
                    </button>
                </td>
            `;
            tabela.appendChild(linha);

            linha.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(sala));
            linha.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(sala.getId()));
        });
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    const salaController = new SalaController();
})