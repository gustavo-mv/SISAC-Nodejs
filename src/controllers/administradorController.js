const administradorModel = require("../models/administradorModel");

const criarProfessor = async (req, res) => {
    const nome = req.body.nome;
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    const resultado = await administradorModel.criarProfessor(nome,usuario,senha);
    return res.status(200).json(resultado);
  };

  const criarCoordenador = async (req, res) => {
    const nome = req.body.nome;
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    const polo = req.body.polo;
    const resultado = await administradorModel.criarCoordenador(nome,usuario,senha,polo);
    return res.status(200).json(resultado);
  };

  const deletarProfessor = async (req, res) => {
    const idProf = req.body.idProf;
    const resultado = await administradorModel.deletarProfessor(idProf);
    return res.status(200).json(resultado);
  };

  const verPolos = async (req, res) => {
    const resultado = await administradorModel.verPolos();
    return res.status(200).json(resultado);
  };

  const verCursosPolo= async (req, res) => {
    const idPolo = req.body.idPolo;
    const resultado = await administradorModel.verCursosPolo(idPolo);
    return res.status(200).json(resultado);
  };

  const criarPolo = async (req, res) => {
    const nomePolo = req.body.nomePolo
    const cidadePolo = req.body.cidadePolo;
    const resultado = await administradorModel.criarPolo(nomePolo, cidadePolo);
    return res.status(200).json(resultado);
  };

  const editarPolo = async (req, res) => {
    const nomePolo = req.body.nomePolo
    const cidadePolo = req.body.cidadePolo;
    const idPolo = req.body.idPolo;
    const resultado = await administradorModel.editarPolo(nomePolo, cidadePolo, idPolo);
    return res.status(200).json(resultado);
  };

  const deletarPolo = async (req, res) => {
    const idPolo = req.body.idPolo
    const resultado = await administradorModel.deletarPolo(idPolo);
    return res.status(200).json(resultado);
  };

module.exports = {
    criarProfessor,
    deletarProfessor,
    criarPolo,
    deletarPolo,
    editarPolo,
    verPolos,
    verCursosPolo,
    criarCoordenador
};