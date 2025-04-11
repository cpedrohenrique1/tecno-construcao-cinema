import Sala from "../model/sala.js";
import Filme from "../model/filme.js";
import Sessao from "../model/sessao";

class SessaoController{
    constructor() {
        this.listaSessoes = [];
        this.listaFilmes = [];
        this.listaSalas = [];
        this.init();
    }

    init() {
        this.carregarSessoesLocalStorage();
    }

    carregarSessoesLocalStorage() {
        const sessoesSalvas = localStorage.getItem("sessoes");
        if (sessoesSalvas) {
            this.listaSessoes = JSON.parse(sessoesSalvas).map(
                sessao => new Sala(sessao.getId(), sessao.getNome(), sessao.getCapacidade(), sessao.getTipo())
            );
            this.atualizarTabela(this.listaSessoes);
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    const sessaoController = new SessaoController();
})