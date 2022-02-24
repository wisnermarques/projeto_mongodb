const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Func = mongoose.model(
  'funcionario',
  new Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    email: { type: String, required: true },
    data_nascimento: { type: Date, required: true },
    salario: { type: Number, required: true },
  })
);

module.exports = Func;
