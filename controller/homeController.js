import Filme from "../model/filme.js";

class HomeController {
    constructor() {
        this.listaFilmes = [];
        this.init();
    }

    init() {
        this.carregarFilmesDoLocalStorage();
        this.atualizarSessoes();
    }

    carregarFilmesDoLocalStorage() {
        const filmes = localStorage.getItem("filmes");
        if (filmes) {
            JSON.parse(filmes).forEach(filme => {
                let novoFilme = new Filme(
                    filme.titulo,
                    filme.descricao,
                    filme.genero,
                    filme.classificacao,
                    filme.duracao,
                    filme.dataEstreia,
                    filme.id
                );
                this.listaFilmes.push(novoFilme);
            });
        }
    }

    atualizarSessoes() {
        const sessoes = document.getElementById("listaFilmes");
        if (!this.listaFilmes.length) {
            sessoes.innerHTML = "<h1>Não há filmes cadastrados</h1>";
            return;
        }
        sessoes.innerHTML = "";
        let htmlCode = "";
        this.listaFilmes.forEach(filme => {
            htmlCode += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${filme.getTitulo()}</h5>
                        <p class="cart-text">${filme.getDescricao()}</p>
                        <p class="card-text"><strong>Gênero:</strong> ${filme.getGenero()}</p>
                        <p class="card-text"><strong>Classificação:</strong> ${filme.getClassificacao()}</p>
                        <p class="card-text"><strong>Duração:</strong> ${filme.getDuracao()}</p>
                        <p class="card-text"><strong>Data de Estreia:</strong> ${filme.getDataEstreia()}</p>
                        <a href="" class="btn btn-primary">Comprar Ingressos</a>
                    </div>
                </div>
            </div>
            `;
        });
        sessoes.innerHTML = htmlCode;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const homeController = new HomeController();
});