export default class Sessao {
    constructor(id, filme, sala, dataHora, preco, idioma, formato) {
        this.id = id;
        this.filme = filme;
        this.sala = sala;
        this.dataHora = dataHora;
        this.preco = preco;
        this.idioma = idioma;
        this.formato = formato;
    }

    getId() {
        return this.id;
    }

    getFilme() {
        return this.filme;
    }

    getSala() {
        return this.sala;
    }

    getDataHora() {
        return this.dataHora;
    }

    getPreco() {
        return this.preco;
    }

    getIdioma() {
        return this.idioma;
    }

    getFormato() {
        return this.formato;
    }
}