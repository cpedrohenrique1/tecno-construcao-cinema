import Sala from "../model/sala.js";
import Sessao from "../model/sessao.js";
import Filme from "../model/filme.js";

class CadastroSessaoController{
    constructor() {
        this.listaSessoes = [];
        this.listaFilmes = [];
        this.listaSalas = [];
        this.idEmEdicao = null;
        this.init();
    }
    
    init() {
        this.carregarFilmesLocalStorage();
        this.carregarSalasLocalStorage();
        this.carregarSessoesLocalStorage();
        const btnSalvarSessao = document.getElementById("btnSalvarSessao");
        btnSalvarSessao.addEventListener("click", this.salvar.bind(this));
    }

    salvar() {
        const sessao = this.criarSessaoFormulario();
        if (this.idEmEdicao) {
            const index = this.listaSessoes.findIndex(s => s.id === this.idEmEdicao);
            if (index !== -1) {
                this.listaSessoes[index] = sessao;
                this.idEmEdicao = null;
            }
        } else {
            this.listaSessoes.push(sessao);
            this.salvarLocalStorage();
        }
        this.atualizarTabela();
    }

    salvarLocalStorage() {
        localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes));
    }

    carregarFilmesLocalStorage() {
        const filmesSalvos = localStorage.getItem("filmes");
        if (filmesSalvos) {
            this.listaFilmes = JSON.parse(filmesSalvos).map(
                filme => new Filme(filme.titulo, filme.descricao, filme.genero, filme.classificacao, filme.duracao, filme.dataEstreia, filme.id)
            );
            const selectFilme = document.getElementById("filme");
            selectFilme.innerHTML = `<option value="" disabled selected hidden>Selecione um filme</option>`;
            this.listaFilmes.forEach(filme => {
                const option = document.createElement("option");
                option.value = filme.id;
                option.innerHTML = `
                    <option value="${filme.id}">${filme.getTitulo()}</option>
                `;
                selectFilme.appendChild(option);
            });
        }
    }

    carregarSessoesLocalStorage() {
        const sessoesSalvas = localStorage.getItem("sessoes");
        if (sessoesSalvas) {
            this.listaSessoes = JSON.parse(sessoesSalvas).map(
                sessao => new Sessao(sessao.id, sessao.filme, sessao.sala, sessao.dataHora, sessao.preco, sessao.idioma, sessao.formato)
            );
            this.atualizarTabela();
        }
    }

    atualizarTabela() {
        const tabela = document.querySelector("tbody");
        tabela.innerHTML = "";
        this.listaSessoes.forEach(sessao => {
            const tr = document.createElement("tr");
            const data = new Date(sessao.dataHora).toLocaleDateString("pt-BR");
            tr.innerHTML = `
                <td>${sessao.id}</td>
                <td>${sessao.filme.titulo}</td>
                <td>${sessao.sala.nome}</td>
                <td>${data}</td>
                <td>${sessao.preco}</td>
                <td>${sessao.idioma}</td>
                <td>${sessao.formato}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarSessao('${sessao.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deletarSessao('${sessao.id}')">Deletar</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    }

    criarSessaoFormulario() {
        const idFilme = parseInt(document.getElementById("filme").value);
        const idSala = parseInt(document.getElementById("sala").value);
        const filme = this.listaFilmes.find(f => f.id === idFilme);
        const sala = this.listaSalas.find(s => s.id === idSala);
        const id = this.idEmEdicao || Date.now();
        const dataHora = document.getElementById("dataHora").value;
        const preco = document.getElementById("preco").value;
        const idioma = document.getElementById("idioma").value;
        const formato = sala.tipo;
        const novaSessao = new Sessao(
            id,
            filme,
            sala,
            dataHora,
            preco,
            idioma,
            formato
        );
        return novaSessao;
    }

    carregarSalasLocalStorage() {
        const salasSalvas = localStorage.getItem("salas");
        if (salasSalvas) {
            this.listaSalas = JSON.parse(salasSalvas).map(
                sala => new Sala(sala.id, sala.nome, sala.capacidade, sala.tipo)
            );
            const selectSala = document.getElementById("sala");
            selectSala.innerHTML = `<option value="" disabled selected hidden>Selecione uma sala</option>`;
            this.listaSalas.forEach(sala => {
                const option = document.createElement("option");
                option.value = sala.getId();
                option.innerHTML = `
                    <option value="${sala.getId()}">${sala.getNome()}</option>
                `;
                selectSala.appendChild(option);
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    const cadastroSessaoController = new CadastroSessaoController();
})