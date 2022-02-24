const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');

const router = express.Router();

router.get('/funcionarios/cadastro', funcionarioController.exibirFormCadastroFunc);
router.post('/funcionarios/edit', funcionarioController.salvarFuncionario);
router.post('/funcionarios/cadastro', funcionarioController.cadastroFuncionario);
router.post('/funcionarios/:id', funcionarioController.excluirFuncionario);
router.get('/funcionarios/relatorio', funcionarioController.relatorio);
router.get('/funcionarios/aniversariantes', funcionarioController.aniversariantes);
router.get('/funcionarios/:id', funcionarioController.formEdicaoFunc);
router.get('/', funcionarioController.mostrarFuncionarios);

module.exports = router;