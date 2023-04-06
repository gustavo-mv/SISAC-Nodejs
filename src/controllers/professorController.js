const professorModel = require("../models/professorModel");

const todasAsDisciplinas = async (req, res) => {
  const idProfessor = res.locals.idProfMid;
  const professores = await professorModel.pegarDisciplinas(idProfessor);
  return res.status(200).json(professores);
};
const todasAsPresencas = async (req, res) => {
  const idProfessor = res.locals.idProfMid;
  const presencas = await professorModel.consultarPresencas(idProfessor);
  return res.status(200).json(presencas);
};
const alunosUmaDisciplina = async (req, res) => {
  const idMateria = req.params.idMateria;
  const alunos = await professorModel.consultarAlunosDisciplina(idMateria);
  return res.status(200).json(alunos);
};
const consultarAlunosPresentes = async (req, res) => {
  const idAula = req.body.idAula;
  const alunos = await professorModel.consultarAlunosPresentes(idAula);
  return res.status(200).json(alunos);
};
const verificarAlunosAula = async (req, res) => {
  const idAula = req.body.idAula;
  const alunos = await professorModel.verificarAlunosAula(idAula);
  return res.status(200).json(alunos);
};

const adicionarFaltas = async (req, res) => {
  const id = req.body.id;
  const materia = req.body.materia;
  const carga = req.body.carga;
  await professorModel.adicionarFaltas(carga, id, materia);
  return res.status(201).json("Faltas aplicadas com sucesso!");
};
const verTodosAlunos = async (req, res) => {
  const idProf = req.body.idProf;
  const result = await professorModel.verTodosAlunos(idProf);
  return res.status(201).json(result);
};


const updateQRAula = async (req, res) => {
  const idAula = req.body.idAula;
  const result = await professorModel.updateQRAula(idAula);
  return res.status(200).json({token:result});
};

const criarAula = async (req,res) =>{
   function gerarToken(length) {
      const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      const caracteresLength = caracteres.length;
        for ( let i = 0; i < length; i++ ) {
        token += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
      }
      return token;
  }
  const token = gerarToken(15);
  const carga = req.body.cargaHoraria;
  const idMateria = req.body.idMateria;
  const validaQR = req.body.validaQR;
  const result = await professorModel.inserirAula(token,carga,idMateria,validaQR);
  if(carga == null || idMateria == null){
    return "Alguma informação está inválida."
  }
  if(validaQR == 1){
    return res.status(201).json({
      token: token,
      idAula: result[0][0]['MAX(`idAulas`)']
    })
  }else{
    return res.status(201).json({
      idAula: result[0][0]['MAX(`idAulas`)']
    })
  }
}

const fecharAula = async (req, res) => {
  const idAula = req.body.idAula;
    if (idAula) {
       const result = await professorModel.fecharAula(idAula);
       return res.status(201).json(result);
    } else {
       return "O id dessa aula não é válido.";
    }
};

const removerAluno = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idAula = req.body.idAula;
  const result = await professorModel.removerAluno(idAluno, idAula);
  return res.status(200).json(result);
};

const consultarAulaDisciplina = async (req, res) => {
  const idMateria = req.body.idMateria;
  const result = await professorModel.consultarAulaDisciplina(idMateria);
  return res.status(200).json(result);
};

const addAula = async (req, res) => {
  const data = req.body.data;
  const idMateria = req.body.idMateria;
  const carga = req.body.carga;
  const result = await professorModel.addAula(idMateria, carga, data);
  return res.status(201).json(result);
};

const adicionarNaMateria = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idMateria = req.body.idMateria;
  const result = await professorModel.adicionarNaMateria(idAluno,idMateria);
  return res.status(201).json(result);
};

const inserirHorario = async (req, res) => {
  const corpoHorario = [
   req.body.horaInicio,
   req.body.horaFim,
   req.body.diaSemana,
   req.body.idMateria
  ]
  const result = await professorModel.inserirHorario(corpoHorario.filter(e => e));
  return res.status(201).json(result);
};


const deletarHorarios = async (req, res) => {
  const idMateria = req.body.idMateria;
  const result = await professorModel.deletarHorarios(idMateria);
  return res.status(200).json(result);
};


const parearDispositivo = async (req, res) => {
  const authToken = req.headers['authorization'];
  if(authToken != undefined){
    const bearer = authToken.split(' ');
    const token = bearer[1];
    const valorEscaneado = req.body.valorEscaneado;
    const result = await professorModel.parearDispositivo(token,valorEscaneado);
    return res.status(201).json(result);
  }else{
    return res.status(401).json("Não autorizado.")
  }

};


const inserirAlunosPresentes = async (req, res) => {
  const corpoPresencas = req.body.corpoPresencas;
  const result = await professorModel.inserirAlunosPresentes(corpoPresencas);
  return res.status(200).json(result);
};



module.exports = {
  todasAsDisciplinas,
  todasAsPresencas,
  alunosUmaDisciplina,
  adicionarFaltas,
  verTodosAlunos,
  fecharAula,
  addAula,
  consultarAulaDisciplina,
  adicionarNaMateria,
  consultarAlunosPresentes,
  criarAula,
  inserirHorario,
  deletarHorarios,
  parearDispositivo,
  updateQRAula,
  removerAluno,
  verificarAlunosAula,
  inserirAlunosPresentes
};
