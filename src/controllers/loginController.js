const professorModel = require("../models/professorModel");
const alunoModel = require("../models/alunoModel");


const loginProfessor = async (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const confirmarDados = await professorModel.loginProfessor(usuario, senha);
  return res.status(200).json(confirmarDados);
};

const loginAluno = async (req, res) => {
  const gra = req.body.gra;
  const ano = req.body.ano;
  const confirmarDados = await alunoModel.loginAluno(gra, ano);
  if(confirmarDados["status"] == false){
    return res.status(401).json(confirmarDados);
  } else {
    return res.status(200).json(confirmarDados);
  }

};

module.exports = {
  loginProfessor,
  loginAluno,
};
