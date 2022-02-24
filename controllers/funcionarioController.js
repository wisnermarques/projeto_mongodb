const Func = require('../models/Funcionarios');

function formataDados(item, i, arr) {
  const data = item.data_nascimento;
  const dataFormatada = ((data.getDate()) + 1) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
  arr[i].data_nascimento = dataFormatada;
  arr[i].salario = item.salario.toFixed(2);
}

module.exports = class funcionarioController {
  static async mostrarFuncionarios(req, res) {
    const funcionarios = await Func.find().lean();

    funcionarios.forEach(formataDados);
    //console.log(funcionarios);
    res.render('home', { funcionarios });

  }

  static async exibirFormCadastroFunc(req, res) {
    res.render('cadastro');
  }

  static async cadastroFuncionario(req, res) {
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const email = req.body.email;
    const data_nascimento = req.body.data_nascimento;
    const salario = req.body.salario;

    const funcionarios = new Func({ nome, endereco, cidade, estado, email, data_nascimento, salario });

    await funcionarios.save();

    res.redirect('/');

  }

  static async excluirFuncionario(req, res) {

    const id = req.params.id;

    await Func.deleteOne({ _id: id });

    res.redirect('/');

  }

  static async formEdicaoFunc(req, res) {
    const id = req.params.id;
    const funcionario = await Func.findOne({ _id: id }).lean();
    const data = new Date(funcionario.data_nascimento);
    const dataFormatada = ((data.getDate()) + 1) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    funcionario.data_nascimento = dataFormatada;
    funcionario.salario = funcionario.salario.toFixed(2);
    res.render('edit', { funcionario });
  }

  static async salvarFuncionario(req, res) {
    const id = req.body.id;
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const email = req.body.email;
    const data = req.body.data_nascimento; //2022-10-11
    //20/09/2020
    const dia = data.split("/")[0]; //["20", "09", "2020"]
    const mes = data.split("/")[1];
    const ano = data.split("/")[2];

    const data_formatada = ano + "-" + mes + "-" + dia;

    const data_nascimento = new Date(data_formatada);

    const salario = req.body.salario;

    await Func.updateOne(
      { _id: id },
      {
        $set: {
          nome: nome,
          endereco: endereco,
          cidade: cidade,
          estado: estado,
          email: email,
          data_nascimento: data_nascimento,
          salario: salario
        }
      }
    );

    res.redirect('/');
  }

  static async relatorio(req, res) {

    const relatorio = await Func.aggregate([
      {
        "$group":
        {
          "_id": "$estado",
          "qtde": { "$sum": 1 },
          "total": { "$sum": "$salario" },
          "media": { "$avg": "$salario" }
        }
      }
    ]);

    relatorio.forEach((_, i, arr) => {
      arr[i].total = arr[i].total.toFixed(2);
      arr[i].media = arr[i].media.toFixed(2);
    });

    res.render('relatorio', { relatorio });
  }

  static async aniversariantes(req, res) {
    const aniversariantes = await Func.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$data_nascimento" }, { $month: new Date() }],
          },
        }
      }
    ]);

    aniversariantes.forEach(formataDados);

    res.render('aniversariantes', { aniversariantes });
  }

}