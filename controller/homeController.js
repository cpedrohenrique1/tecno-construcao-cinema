import Filme from "../model/filme";

class HomeController {
    constructor() {
        this.listaFilmes = [];
        this.init();
    }

    init(){
        this.carregarFilmesDoLocalStorage();
        this.atualizarSessoes();
    }

    carregarFilmesDoLocalStorage() {
        const filmes = localStorage.getItem("filmes");
        if (filmes) {
            this.listaFilmes = JSON.parse(filmes);
        }
    }

    atualizarSessoes() {
        const sessoes = document.getElementById("row");
        sessoes.innerHTML = "";
        this.listaFilmes.forEach(filme => {
            const sessao = document.createElement("div");
            sessao.innerHTML = `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card">
                    <img src="${filme.getImgPath()}" alt="" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${filme.getTitulo()}</h5>
                        <p class="cart-text">${filme.getDescricao()}</p>
                        <a href="" class="btn btn-primary">Comprar Ingressos</a>
                    </div>
                </div>
            </div>
            `;
            sessoes.appendChild(sessao);
        });
    }
}