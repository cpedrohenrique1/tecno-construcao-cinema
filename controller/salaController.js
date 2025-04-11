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

    atualizarTabela(salas) {
        const tabela = document.querySelector("tbody");
        tabela.innerHTML = ""; // Limpa a tabela

        salas.forEach((sala) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${sala.id}</td>
                <td>${sala.nome}</td>
                <td>${sala.capacidade}</td>
                <td>${sala.tipo}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${sala.id}">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${sala.id}">
                        Excluir
                    </button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    const salaController = new SalaController();
})