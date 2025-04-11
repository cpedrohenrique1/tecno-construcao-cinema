export default class Sala {
    constructor(id, nome, capacidade, tipo) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getCapacidade() {
        return this.capacidade;
    }
    getTipo() {
        return this.tipo;
    }
    setId(id) {
        this.id = id;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setCapacidade(capacidade) {
        this.capacidade = capacidade;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }

    toString() {
        return `Sala [id=${this.id}, nome=${this.nome}, capacidade=${this.capacidade}, tipo=${this.tipo}]`;
    }
}