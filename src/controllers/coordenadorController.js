const coordenadorModel = require("../models/coordenadorModel");


const criarAluno = async (req, res) => {
    const gra = req.body.gra;
    const nome = req.body.nome;
    const idCurso = req.body.idCurso;
    const nascimento = req.body.nascimento;
    const novoAluno = await coordenadorModel.criarAluno(gra,nome,idCurso,nascimento);
    return res.status(200).json(novoAluno);
  };

  const editarAluno = async (req, res) => {
    const idAluno = req.body.idAluno;
    const gra = req.body.gra;
    const nome = req.body.nome;
    const idCurso = req.body.idCurso;
    const nascimento = req.body.nascimento;
    const editarAluno = await coordenadorModel.editarAluno(idAluno,gra,nome,idCurso,nascimento);
    return res.status(200).json(editarAluno);
  };

  const verAlunos = async (req, res) => {
    const idCurso = req.body.idCurso;
    const verAlunos = await coordenadorModel.verAlunos(idCurso);
    return res.status(200).json(verAlunos);
  };

  const deletarAluno = async (req, res) => {
    const idAluno = req.body.idAluno;
    const deletarAluno = await coordenadorModel.deletarAluno(idAluno);
    return res.status(200).json(deletarAluno);
  };

    const verFaltas = async (req, res) => {
    const idAluno = req.body.idAluno;
    const verFaltas = await coordenadorModel.verFaltas(idAluno);
    return res.status(200).json(verFaltas);
  };


module.exports = {
    criarAluno,
    editarAluno,
    deletarAluno,
    verAlunos,
    verFaltas
}