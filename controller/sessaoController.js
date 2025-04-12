import Sessao from "../model/sessao.js";

class SessaoController{
    constructor() {
        this.listaSessoes = [];
        this.init();
    }

    init() {
        this.carregarSessoesLocalStorage();
    }

    carregarSessoesLocalStorage() {
        const sessoes = localStorage.getItem("sessoes");
        if (sessoes) {
            this.listaSessoes = JSON.parse(sessoes).map(s => new Sessao(
                s.id,
                s.filme,
                s.sala,
                s.dataHora,
                s.preco,
                s.idioma,
                s.formato
            ));
            this.atualizarTabela(this.listaSessoes);
        }
    }

    atualizarTabela(listaSessoes) {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Limpa a tabela antes de atualizar

        listaSessoes.forEach(sessao => {
            const tr = document.createElement("tr");
            const data = new Date(sessao.dataHora).toLocaleDateString("pt-BR");
            tr.innerHTML = `
                <td>${sessao.filme.titulo}</td>
                <td>${sessao.sala.nome}</td>
                <td>${data}</td>
                <td>R$${sessao.preco}</td>
                <td>
                    <a href="venda-ingressos.html?id=${sessao.id}">
                        <button class="btn btn-primary">Comprar Ingresso</button>
                    </a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const sessaoController = new SessaoController();
})