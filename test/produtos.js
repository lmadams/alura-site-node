var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function () {

    beforeEach(function (done) {
        var connection = express.infra.connectionFactory();
        connection.query("delete from livros", function (ex, result) {
            if (!ex) {
                done();
            }
        });
    });
    
    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({titulo: '', descricao: 'alguma coisa'})
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function (done) {
        request.post('/produtos')
            .send({
                titulo: 'Livro MOCHA',
                descricao: 'Descricao do livro Mocha',
                preco: 12.00
            })
            .expect(302, done);
    });
});