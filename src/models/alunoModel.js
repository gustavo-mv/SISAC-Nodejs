const { json } = require("express");
const connection = require("./connection");


const adicionarPresenca = async (idAluno, idAula) => {
  const [result] = await connection.execute(
    "INSERT INTO `alunospresentes`(`aulas_idAulas`,`idalunos`) VALUES (?,?)",
    [idAula, idAluno]
  );
  return "Presença adicionada com sucesso!";
};

const consultarPresencas = async (idAluno) => {
  if (idAluno) {
    const result = await connection.execute(
      `SELECT materia.nome as Disciplina, aulas.data as Dia FROM aulas INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria INNER JOIN alunospresentes ON alunospresentes.aulas_idAulas = aulas.idAulas WHERE alunospresentes.idalunos = ${idAluno}`
    );
    return result[0];
  } else {
    return "O id está incorreto.";
  }
};

const consultarAulasAbertas = async (idAluno) => {
  if (idAluno) {
    const result = await connection.execute(
     `SELECT materia.nome as Disciplina, aulas.data AS Dia, aulas.validacao_qrcode AS Validacao ,aulas.idaulas, professores.nome AS Professor, aulas.carga AS Carga
     FROM aulas 
     INNER JOIN materia 
     ON aulas.materia_idmateria = materia.idmateria 
     INNER JOIN presencas 
     ON presencas.materia_idmateria = materia.idmateria 
     INNER JOIN alunos
     ON presencas.alunos_idalunos = alunos.idalunos
     INNER JOIN professores
     ON professores.idprofessor = materia.professores_idprofessor
     WHERE NOT aulas.finalizada AND alunos.idalunos = ${idAluno}`);
    return result[0];
  } else {
    return "O id é inválido.";
  }
};

const verPresencaJaMarcada = async (idAluno, idAula) => {
  const result = await connection.execute(
    `SELECT alunospresentes.idalunos FROM aulas INNER JOIN alunospresentes ON aulas.idAulas = alunospresentes.aulas_idAulas WHERE aulas.idAulas = ${idAula} AND alunospresentes.idalunos = ${idAluno}`
  );
  if (Object.keys(result[0]).length === 0) {
    return "Não há presença por aqui.";
  } else return result[0];
};

const verTodasDisciplinas = async (idAluno) => {
  const result =
    await connection.execute(`SELECT materia.idmateria as Id, materia.nome as Disciplina, presencas.faltas as Faltas
  FROM materia INNER JOIN presencas ON presencas.materia_idmateria = materia.idmateria WHERE presencas.alunos_idalunos = ${idAluno}`);

  if (Object.keys(result[0]).length === 0) {
    return "Não há presença por aqui.";
  } else return result[0];
};


const loginAluno = async (gra, ano) => {
  const sql = "SELECT alunos.idalunos, alunos.gra, alunos.nome, cursos.nome AS curso FROM alunos INNER JOIN cursos ON alunos.idcurso = cursos.idcurso WHERE gra = ? AND nascimento = ?";
  result = await connection.query(sql,[gra, ano])
  if(result[0].length < 1){
    const erro = {
      "status": false,
      "resultado": "Credenciais inválidas."
    }
     return erro;
  }

  const mapaUsuario = {
    "status": true,
    "idaluno": result[0][0]["idalunos"],
    "nome": result[0][0]["nome"],
    "gra": result[0][0]["gra"],
    "curso": result[0][0]["curso"]
}
    return mapaUsuario
};


  const consultarPresencasEmUmaDisciplina = async (idAluno, idMateria) => {
  const sql = `SELECT materia.nome as Disciplina, aulas.data as Dia, aulas.carga as Carga,
  IF (alunospresentes.idalunos = alunos.idalunos, "Presente", "Faltou") as Estado 
  FROM aulas CROSS JOIN alunos INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria 
  LEFT OUTER JOIN alunospresentes ON alunospresentes.aulas_idAulas = aulas.idAulas 
  AND alunospresentes.idalunos = alunos.idalunos WHERE alunos.idalunos = ? AND materia.idmateria = ? 
  ORDER BY materia.nome, aulas.data, alunos.nome`;
  const result = await connection.query(sql,[idAluno, idMateria])
  let presencas = 0;
  let faltas = 0;
  for(let i = 0; i < result[0].length; i++){
    if(result[0][i].Estado == "Faltou"){
    faltas += result[0][i]["Carga"];
  }else{
    presencas += result[0][i]["Carga"]
  }
 }
 totalCarga = faltas + presencas;
 faltas = (faltas/totalCarga) * 100;
 presencas = (presencas/totalCarga) * 100;
 
 const corpoFaltas = {
  "Presencas": `${presencas.toFixed(1)}`,
  "Faltas": `${faltas.toFixed(1)}`,
  "Aulas": result[0]
 }
 return corpoFaltas;
}


const horariosMateria = async (idMateria) => {
  const result = await connection.execute
  ("SELECT `hora_inicio`, `hora_fim`, `dia` FROM `horarios` WHERE idmateria = " + idMateria);
   if(result[0].length < 1){
    return "Não há horários nesse ID"
   }else{
    return result[0];
   }
};


const verHorarios = async (idAluno) => {
const corpoDiasHorarios = [[],[],[],[], [], [],[]]
const objetoCorpo = {
  "Domingo": corpoDiasHorarios[0],
  "Segunda": corpoDiasHorarios[1],
  "Terça": corpoDiasHorarios[2],
  "Quarta": corpoDiasHorarios[3],
  "Quinta": corpoDiasHorarios[4],
  "Sexta": corpoDiasHorarios[5],
  "Sábado": corpoDiasHorarios[6]
}
  const sql = (
    "SELECT materia.nome AS Disciplina, horarios.hora_inicio AS Inicio, horarios.hora_fim AS Fim, horarios.dia AS Dia FROM horarios INNER JOIN materia ON materia.idmateria = horarios.idmateria INNER JOIN presencas ON presencas.materia_idmateria = materia.idmateria INNER JOIN alunos ON presencas.alunos_idalunos = alunos.idalunos WHERE alunos.idalunos = ? GROUP BY materia.nome, horarios.hora_inicio, horarios.hora_fim, horarios.dia ORDER BY horarios.dia ");
  const result = await connection.execute(sql,[idAluno])
   if(result[0].length < 1){
    return "Não há horários nesse ID"
   }else{

    for(let i = 0; i < result[0].length; i++){  
    corpoDiasHorarios[result[0][i].Dia].push(result[0][i]);
  }
  return objetoCorpo;
}}
module.exports = {
  adicionarPresenca,
  consultarPresencas,
  verPresencaJaMarcada,
  verTodasDisciplinas,
  consultarAulasAbertas,
  loginAluno,
  consultarPresencasEmUmaDisciplina,
  horariosMateria,
  verHorarios
};
