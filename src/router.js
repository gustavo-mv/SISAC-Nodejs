const express = require("express");
const router = express.Router();
const professorController = require("./controllers/professorController");
const alunoController = require("./controllers/alunoController");
const coordenadorController = require("./controllers/coordenadorController");
const loginController = require("./controllers/loginController");
const app = require("./app");

router.post("/loginprofessor/", loginController.loginProfessor);

router.get("/", (req, res) => {
  res.send("Olá mundo");
});
//Consultar todas as disciplinas:
router.get(
  "/professor/:idprofessor?/disciplinas",
  professorController.todasAsDisciplinas
);

router.get(
  "/professor/:idprofessor?/alunos",
  professorController.verTodosAlunos
);

//Consultar todas as presenças:
router.get(
  "/professor/:idprofessor?/presencas",
  professorController.todasAsPresencas
);

//Consultar todas os Alunos de uma disciplinas:
router.get(
  "/professor/:idmateria?/alunos",
  professorController.alunosUmaDisciplina
);
router.post("/professor/:idProf?/adicionarAula/", professorController.addAula);
router.post("/professor/:idProf?/fecharAula", professorController.fecharAula);
router.post("/professor/:idProf?/faltas", professorController.adicionarFaltas);
router.get("/aluno/:idAluno?/", alunoController.verTodasDisciplinas);
router.get("/aluno/:idAluno?/presenca", alunoController.consultarPresencas);
router.post("/aluno/presenca", alunoController.adicionarPresenca);
router.post("/aluno/presencaMarcada", alunoController.verPresencaMarcada);

module.exports = router;
