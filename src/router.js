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

router.post("/professor/faltas", professorController.adicionarFaltas);

router.post("/aluno/presenca", alunoController.adicionarPresenca);

module.exports = router;
