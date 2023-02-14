const coordenadorModel = require("../models/coordenadorModel");


const criarAluno = async (req, res) => {
    const gra = req.body.gra;
    const nome = req.body.nome;
    const idCurso = req.body.idCurso;
    const nascimento = req.body.nascimento;
    const novoAluno = await coordenadorModel.criarAluno(gra,nome,idCurso,nascimento);
    return res.status(200).json(novoAluno);
  };


module.exports = {
    criarAluno
}