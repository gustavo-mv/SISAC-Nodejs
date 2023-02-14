const professorModel = require("../models/professorModel");
const alunoModel = require("../models/alunoModel");

const loginProfessor = async (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const confirmarDados = await professorModel.loginProfessor(usuario, senha);
  return res.status(200).json(confirmarDados);
};

const loginAluno = async (req, res) => {
  const usuario = req.body.gra;
  const ano = req.body.ano;
  const confirmarDados = await alunoModel.loginAluno(usuario, ano);
  return res.status(200).json(confirmarDados);
};

module.exports = {
  loginProfessor,
  loginAluno,
};
