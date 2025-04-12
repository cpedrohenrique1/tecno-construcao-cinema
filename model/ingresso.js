export default class Ingresso {
    constructor(id, sessao, nomeCliente, cpf, assento, tipoPagamento) {
        this.id = id;
        this.sessao = sessao;
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.assento = assento;
        this.tipoPagamento = tipoPagamento;
    }

    getId() {
        return this.id;
    }

    getSessao() {
        return this.sessao;
    }

    getNomeCliente() {
        return this.nomeCliente;
    }

    getCpf() {
        return this.cpf;
    }

    getAssento() {
        return this.assento;
    }

    getTipoPagamento() {
        return this.tipoPagamento;
    }
}