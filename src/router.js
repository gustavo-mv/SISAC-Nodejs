const express = require("express");
const router = express.Router();
const professorController = require("./controllers/professorController");
const alunoController = require("./controllers/alunoController");
const coordenadorController = require("./controllers/coordenadorController");
const administradorController = require("./controllers/administradorController");
const loginController = require("./controllers/loginController");
const jwt = require("jsonwebtoken");
const JWTSecret = "spaiodjkfopasijdf"

router.post("/professor/login/", loginController.loginProfessor);
router.post("/aluno/login/", loginController.loginAluno);


function auth(req,res,next){
  const authToken = req.headers['authorization'];
  if(authToken != undefined){
  const bearer = authToken.split(' ');
  const token = bearer[1];
  jwt.verify(token,JWTSecret,(err,data)=> {
    if(err){
      res.status(401);
      res.json({err: "Token Inválido!"});
    }else{
      res.locals.idProfMid = data.id;
      next();
    }
  })
  }else{
    res.status(401);
    res.json("Token Inválido")
  }
}


router.get("/", (req, res) => {
  res.sendFile( __dirname + "/teste.html");
});



router.get(
  "/professor/disciplinas",auth,
  professorController.todasAsDisciplinas);

router.get(
  "/aluno/:idAluno?/horarios/",
 alunoController.verHorarios
);

router.get("/professor/:idProf?/alunos", professorController.verTodosAlunos);

router.get("/aluno/:idAluno?/horarios", alunoController.verHorarios);


router.get(
  "/professor/presencas",auth,
  professorController.todasAsPresencas
);

router.get(
  "/professor/:idProf?/:idMateria?/",
  professorController.alunosUmaDisciplina
);

router.post(
  "/aluno/:idAluno?/aulas/",
  alunoController.consultarAulasAbertas
);


router.post(
  "/aluno/:idAluno?/consultarPresencas/",
  alunoController.consultarPresencasEmUmaDisciplina
);


router.get("/aluno/:idAluno?/", alunoController.verTodasDisciplinas);

router.get("/aluno/:idAluno?/presenca", alunoController.consultarPresencas);

router.post(
  "/professor/:idProf?/consultarAula/",
  professorController.consultarAulaDisciplina
);

router.post(
  "/professor/:idProf?/criarAula",
  professorController.criarAula
);

router.put(
  "/professor/:idProf?/criarAula",
  professorController.updateQRAula
);

router.delete(
  "/professor/:idProf?/removerAluno",
  professorController.removerAluno
);

router.post(
  "/professor/:idProf?/alunosPresentes/",
  professorController.consultarAlunosPresentes,
);

router.get(
  "/professor/:idProf?/cursosPolo/:idPolo?/",
  professorController.consultarCursosPolo,
);

router.post(
  "/professor/:idProf?/presentesAula/",
  professorController.verificarAlunosAula,
);

router.get(
  "/professor/:idProf?/horarios/:idMateria?/",
  professorController.verHorariosMateria,
);

router.post(
  "/professor/:idProf?/adicionarNaMateria/",
  professorController.adicionarNaMateria
);

router.post(
  "/professor/:idProf?/adicionarNaMateria/",
  professorController.adicionarNaMateria
);

router.post(
  "/professor/:idProf?/horario/",
  professorController.inserirHorario
);

router.post(
  "/professor/:idProf?/inserirAlunosPresentes/",
  professorController.inserirAlunosPresentes
);

router.delete("/professor/:idProf?/horario/", professorController.deletarHorarios);

router.delete("/professor/:idProf?/deletarhorario/", professorController.deletarUmHorarioEspecifico);


router.post("/professor/:idProf?/adicionarAula/", professorController.addAula);

router.post("/professor/:idProf?/fecharAula", professorController.fecharAula);

router.post("/professor/:idProf?/faltas", professorController.adicionarFaltas);

router.post("/aluno/presenca", alunoController.adicionarPresenca);

router.post("/aluno/presencaQR", alunoController.adicionarPresencaQR);

router.post("/aluno/presencaMarcada", alunoController.verPresencaMarcada);
router.post(
  "/professor/parearDispositivo/",
  professorController.parearDispositivo
);


router.post("/coordenador/alunos/curso", coordenadorController.verAlunos);
router.post("/coordenador/aluno/faltas", coordenadorController.verFaltas);
router.post("/coordenador/alunos/", coordenadorController.criarAluno);
router.put("/coordenador/alunos/", coordenadorController.editarAluno);
router.delete("/coordenador/alunos/", coordenadorController.deletarAluno);
router.post("/administrador/coordenadores/", administradorController.criarCoordenador);
router.post("/administrador/professores/", administradorController.criarProfessor);
router.delete("/administrador/professores/", administradorController.deletarProfessor);
router.post("/administrador/polo/", administradorController.verCursosPolo);
router.get("/administrador/polos/", administradorController.verPolos);
router.post("/administrador/polos/", administradorController.criarPolo);
router.delete("/administrador/polos/", administradorController.deletarPolo);
router.put("/administrador/polos/", administradorController.editarPolo);

module.exports = router;
