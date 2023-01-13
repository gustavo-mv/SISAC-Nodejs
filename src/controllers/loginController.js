const professorModel = require("../models/professorModel");

const loginProfessor = async (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const confirmarDados = await professorModel.loginProfessor(usuario, senha);
  return res.status(200).json(confirmarDados);
};

module.exports = {
  loginProfessor,
};
