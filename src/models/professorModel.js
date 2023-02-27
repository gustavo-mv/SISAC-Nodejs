const connection = require("./connection");
const bcrypt = require('bcrypt')

const pegarDisciplinas = async (idProfessor) => {
  if (idProfessor != null) {
    const [result] = await connection.execute(
      `SELECT materia.idmateria, materia.nome as Disciplina, materia.periodo, professores.nome as professores FROM materia INNER JOIN professores ON professores_idprofessor = professores.idprofessor WHERE ${idProfessor} = professores_idprofessor`
    );
    return result;
  } else {
    return "Erro no ID do Professor";
  }
};

const consultarPresencas = async (idProfessor) => {
  if (idProfessor != null) {
    const [result] = await connection.execute(
      `SELECT materia.nome as Disciplina, aulas.data as Dia, IF(aulas.finalizada, \"Finalizada\", \"Aberta\") AS Status FROM aulas INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria WHERE materia.professores_idprofessor = ${idProfessor}`
    );
    return result;
  }
};

const consultarAlunosPresentes = async (idAula) => {
  if (idAula != null) {
    const [result] = await connection.execute(
      `SELECT alunos.nome as Aluno, alunos.idalunos FROM alunospresentes INNER JOIN alunos ON alunospresentes.idalunos = alunos.idalunos WHERE alunospresentes.aulas_idAulas =  ${idAula}`
    );
    return result;
  }
};

const consultarAlunosDisciplina = async (idMateria) => {
  if (idMateria != null) {
    const [result] = await connection.execute(
      `SELECT alunos.nome as Aluno, presencas.faltas as Faltas, alunos.idalunos FROM alunos INNER JOIN presencas on presencas.alunos_idalunos = alunos.idalunos where presencas.materia_idmateria = ${idMateria}`
    );
    return result;
  }
};

const adicionarFaltas = async (carga, id, materia) => {
  const [result] = await connection.execute(
    "UPDATE presencas SET faltas = faltas + ? WHERE presencas.alunos_idalunos = ? AND presencas.materia_idmateria = ?",
    [carga, id, materia]
  );
  return result;
};

const verTodosAlunos = async (idProf) => {
  const [result] = await connection.execute(
    `SELECT * FROM alunos ORDER BY nome`
  );
  return result;
};

const fecharAula = async (idAula) => {
  await connection.execute(
    "UPDATE `aulas` SET `finalizada` = 1 WHERE idAulas = ?",
    [idAula]
  );
  return "Aula encerrada com sucesso.";
};

const addAula = async (idMateria, carga, data) => {
  await connection.execute(
    "INSERT INTO `aulas`( `data`, `carga`, `materia_idmateria`) VALUES (?,?,?)",
    [data, carga, idMateria]
  );
  return "Aula adicionada com sucesso.";
};

const consultarAulaDisciplina = async (idMateria) => {
  const result = await connection.execute(
    `SELECT * FROM aulas WHERE materia_idmateria = ${idMateria} && !finalizada`
  );
  if (Object.keys(result[0]).length === 0) {
    return "Não há aulas finalizadas com o ID dessa matéria";
  } else return result[0];
};

const adicionarNaMateria = async (idAluno, idMateria) => {
  if (idAluno !== undefined && idMateria !== undefined) {
    await connection.execute(
      "INSERT INTO `presencas`(`alunos_idalunos`,`materia_idmateria`) VALUES (?,?)",
      [idAluno, idMateria]
    );
    return "Adicionado com sucesso na aula";
  } else {
    return "O ID do aluno ou ID da Matéria são inválidos";
  }
};

const loginProfessor = async (usuario, senha) => {
    const sql = "SELECT * FROM professores WHERE usuario = ?";
    result = await connection.query(sql,[usuario])
    if(result[0].length < 1){
      return "Credenciais Incorretas."
    }else{
      const validarSenha = await bcrypt.compare(senha,result[0][0]["senha"]);
      if(validarSenha) {
        const mapaUsuario = {
          "idprofessor": result[0][0]["idprofessor"],
          "nome": result[0][0]["nome"]
     }
           return mapaUsuario
      }else{
        return "Credenciais Incorretas."
      }
    }

};
const inserirAula = async (token,carga,idMateria,validaQR) => {
  if(validaQR == 1){
  let sql = "INSERT INTO `aulas`(`data`,`carga`, `materia_idmateria`,`validacao_qrcode`, `token`) VALUES (NOW(),?,?,?,?)"
  await connection.query(sql,[carga,idMateria,validaQR,token]);
  }else{
    let sql = "INSERT INTO `aulas`(`data`,`carga`, `materia_idmateria`) VALUES (NOW(),?,?)"
   await connection.query(sql,[carga,idMateria]);
  }
}

const inserirHorario = async (corpoHorario) => {
  if(corpoHorario.length < 4){
    return "Alguma das informações está nula."
  }else{
    let sql = "INSERT INTO `horarios`( `hora_inicio`, `hora_fim`, `idmateria`, `dia`) VALUES (?)"
    await connection.query(sql,[corpoHorario]);
    return "Horário Criado com Sucesso!"
  }
}

module.exports = {
  pegarDisciplinas,
  consultarPresencas,
  loginProfessor,
  consultarAlunosDisciplina,
  adicionarFaltas,
  verTodosAlunos,
  fecharAula,
  addAula,
  consultarAulaDisciplina,
  adicionarNaMateria,
  consultarAlunosPresentes,
  inserirAula,
  inserirHorario
};