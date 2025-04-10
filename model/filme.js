export default class Filme {
    constructor(titulo, descricao, genero, classificacao, duracao, dataEstreia, id) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.dataEstreia = dataEstreia;
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getTitulo() {
        return this.titulo;
    }
    getDescricao() {
        return this.descricao;
    }
    getGenero() {
        return this.genero;
    }
    getClassificacao() {
        return this.classificacao;
    }
    getDuracao() {
        return this.duracao;
    }
    getDataEstreia() {
        return this.dataEstreia;
    }
    setId(id) {
        this.id = id;
    }
    setTitulo(titulo) {
        this.titulo = titulo;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
    setGenero(genero) {
        this.genero = genero;
    }
    setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }
    setDuracao(duracao) {
        this.duracao = duracao;
    }
    setDataEstreia(dataEstreia) {
        this.dataEstreia = dataEstreia;
    }
    toString() {
        return `Filme: ${this.titulo}, Genero: ${this.genero}, Classificacao: ${this.classificacao}, Duracao: ${this.duracao}, Data de Estreia: ${this.dataEstreia}`;
    }
}