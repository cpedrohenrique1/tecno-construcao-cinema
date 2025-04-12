import Ingresso from "../model/ingresso.js";
import Sessao from "../model/sessao.js";

class VendaIngressoController {
    constructor() {
        this.listaSessoes = [];
        this.listaIngressos = [];
        this.idEmEdicao = null;
        this.init();
    }

    init() {
        this.carregarSessoesLocalStorage();
        const btnSalvarIngresso = document.getElementById("btnSalvarIngresso");
        btnSalvarIngresso.addEventListener("click", this.salvar.bind(this));
        this.verificarParametros();
    }

    verificarParametros() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams) {
            const idSessao = urlParams.get("id");
            document.getElementById("sessao").value = idSessao;
        }
    }

    salvar() {
        const sessao = this.listaSessoes.find(s => s.id === parseInt(document.getElementById("sessao").value));
        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const assento = document.getElementById("assento").value;
        const formaPagamento = document.getElementById("pagamento").value;

        const ingresso = new Ingresso(
            Date.now(),
            sessao,
            nome,
            cpf,
            assento,
            formaPagamento
        );
        this.listaIngressos.push(ingresso);
        this.salvarLocalStorage();
        console.log("Compra realizada com sucesso!");
    }

    salvarLocalStorage() {
        localStorage.setItem("ingressos", JSON.stringify(this.listaIngressos));
    }

    carregarSessoesLocalStorage() {
        const sessoesSalvas = localStorage.getItem("sessoes");
        if (sessoesSalvas) {
            this.listaSessoes = JSON.parse(sessoesSalvas).map(
                sessao => new Sessao(sessao.id, sessao.filme, sessao.sala, sessao.dataHora, sessao.preco, sessao.idioma, sessao.formato)
            );
            this.atualizarSelectSessoes();
        }
    }

    atualizarSelectSessoes() {
        const selectSessoes = document.getElementById("sessao");
        selectSessoes.innerHTML = "";
        const opt = document.createElement("option");
        opt.innerHTML = `<option value="" disabled selected hidden>Selecione uma sessão</option>`
        selectSessoes.appendChild(opt);
        this.listaSessoes.forEach(sessao => {
            const option = document.createElement("option");
            option.value = sessao.id;
            option.innerHTML = `<option value="${sessao.id}" >${sessao.id}</option>`;
            selectSessoes.appendChild(option);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const vendaIngressoController = new VendaIngressoController();
})