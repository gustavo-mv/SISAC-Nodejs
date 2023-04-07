const connection = require("./connection");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const { connect } = require("http2");
const JWTSecret = "spaiodjkfopasijdf"


const pegarDisciplinas = async (idProfessor) => {
    const [result] = await connection.execute(
      `SELECT materia.idmateria, materia.nome 
      as Disciplina, materia.periodo, professores.nome as professores 
      FROM materia INNER JOIN professores ON professores_idprofessor = 
      professores.idprofessor WHERE ${idProfessor} = professores_idprofessor`
    );
    return result;
};

const consultarPresencas = async (idProfessor) => {
    const [result] = await connection.execute(
      `SELECT materia.nome as Disciplina, aulas.data as Dia, 
      IF(aulas.finalizada, \"Finalizada\", \"Aberta\") AS Status FROM aulas 
      INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria WHERE materia.professores_idprofessor = ${idProfessor}`
    );
    return result;
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
  const result = await connection.execute("SELECT validacao_qrcode FROM aulas WHERE idAulas = ?",[idAula])
  if(result[0].length > 0){
  await connection.execute("UPDATE `aulas` SET `finalizada` = 1 , token = NULL WHERE idAulas = ?",[idAula]);
  return "Aula encerrada com sucesso.";
  }else{
    await connection.execute("UPDATE `aulas` SET `finalizada` = 1 WHERE idAulas = ?",[idAula]);
    return "Aula encerrada com sucesso.";
  }
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
    `SELECT * FROM aulas WHERE materia_idmateria = ${idMateria}`
  );
  if (Object.keys(result[0]).length === 0) {
    return result[0];
  } else return result[0];
};

const updateQRAula = async (idAulas) => {
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
    await connection.execute(`UPDATE aulas SET token = ? WHERE idAulas = ?`,[token,idAulas]);
    return token;
  };

const adicionarNaMateria = async (idAluno, idMateria) => {
  if (idAluno !== undefined && idMateria !== undefined) {
    await connection.query(
      "INSERT INTO `presencas`(`alunos_idalunos`,`materia_idmateria`) VALUES (?,?)",
      [idAluno, idMateria]
    );
    return "Adicionado com sucesso na aula";
  } else {
    return "O ID do aluno ou ID da Matéria são inválidos";
  }
};

const verHorariosMateria = async (idMateria) => {
  const corpoDiasHorarios = [[],[],[],[],[],[],[]]
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
    "SELECT horarios.hora_inicio AS Inicio, horarios.hora_fim AS Fim, horarios.dia AS Dia FROM horarios WHERE idmateria = ?");
    const result = await connection.execute(sql,[idMateria])
     if(result[0].length < 1){
      return "Não há horários nesse ID"
     }else{
      for(let i = 0; i < result[0].length; i++){  
      corpoDiasHorarios[result[0][i].Dia].push({Inicio: result[0][i].Inicio, Fim: result[0][i].Fim});
    }
    return objetoCorpo;
  }}

const loginProfessor = async (usuario, senha) => {
    const sql = "SELECT * FROM professores WHERE usuario = ?";
    result = await connection.query(sql,[usuario])
    if(result[0].length < 1){
      return {
        result: false
       }
    }else{
      const validarSenha = await bcrypt.compare(senha,result[0][0]["senha"]);
      if(validarSenha) {
      const token = jwt.sign({id: result[0][0].idprofessor , nome: result[0][0].nome },JWTSecret,{expiresIn:'6h'});
           return {
            id: result[0][0].idprofessor ,
            nome: result[0][0].nome,
            token: token,
            result: true
           };
      }else{
        return {
          result: false
         }
      }
    }
};

const inserirAula = async (token,carga,idMateria,validaQR) => {
  if(validaQR == 1){
    let sql = "INSERT INTO `aulas`(`data`,`carga`, `materia_idmateria`,`validacao_qrcode`, `token`) VALUES (NOW(),?,?,?,?);"
    await connection.query(sql,[carga,idMateria,validaQR,token]);
    const result = await connection.query("SELECT MAX(`idAulas`) FROM `aulas`");
    return result;
  } else {
    let sql = "INSERT INTO `aulas`(`data`,`carga`, `materia_idmateria`) VALUES (NOW(),?,?)"
    await connection.query(sql,[carga,idMateria]);
    const result = await connection.query("SELECT MAX(`idAulas`) FROM `aulas`");
    return result;
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

const removerAluno = async (idAluno,idAula) => {
    if(idAluno.length == 0){
      return 'ok';
    }
    let sql = "DELETE FROM alunospresentes WHERE aulas_idAulas = ? AND idalunos IN (?)"
    await connection.query(sql,[idAula,idAluno]);
    return "ok"
}

const deletarHorarios = async (idMateria) => {
  if(idMateria == undefined){
    return "Alguma informação está nula."
  }else{
    let sql = "DELETE FROM horarios WHERE idmateria = `idMateria`"
    await connection.query(sql);
    return "Todos os horários com esse ID foram deletados"
  }
}

const parearDispositivo = async (token,valorEscaneado) => {
  let sql = "SELECT * FROM `loginprof` WHERE `codigoLogin` = ?"
  const result = await connection.query(sql,[valorEscaneado]);
  if(result[0].length > 0){
  const corpoValidado = {
  token: token,
  id: result[0][0]["id"]
  }
  return corpoValidado;
}else{
  return "ID não consta."
}
}

const verificarAlunosAula = async (idAula) => {
  const sqlMateria = `SELECT materia_idmateria, carga FROM aulas WHERE idAulas = ?`;
  const sqlPresentes = `SELECT alunos.nome as Aluno, alunos.idalunos FROM alunospresentes INNER JOIN alunos ON alunospresentes.idalunos = alunos.idalunos WHERE alunospresentes.aulas_idAulas = ?`;
  const sqlFaltantes = `SELECT alunos.nome as Aluno, alunos.idalunos FROM alunos INNER JOIN presencas on presencas.alunos_idalunos = alunos.idalunos WHERE presencas.materia_idmateria = ? AND alunos.idalunos NOT IN (SELECT alunospresentes.idalunos FROM alunospresentes WHERE alunospresentes.aulas_idAulas = ?)`;

  const [[{ materia_idmateria, carga }]] = await connection.query(sqlMateria, [idAula]);
  const [resultadoPresentes] = await connection.query(sqlPresentes, [idAula]);
  const [resultadoFaltantes] = await connection.query(sqlFaltantes, [materia_idmateria, idAula]);
  const resultadoTotal = {
    Carga: carga,
    Presentes: resultadoPresentes,
    Faltantes: resultadoFaltantes,
  };
  return resultadoTotal;
};
  const inserirAlunosPresentes = async (corpoPresencas) => {
  const listaPresentes = corpoPresencas["presentes"];  
  const listaPresentesQuery = [];
  const listaIDsPresentes = [];
  for(let i = 0; i < listaPresentes.length ; i++){
  listaPresentesQuery.push([listaPresentes[i]["idalunos"],corpoPresencas["idAula"],listaPresentes[i]["Carga"]])
  listaIDsPresentes.push(listaPresentes[i]["idalunos"])
}
   await connection.query("DELETE FROM alunospresentes WHERE aulas_idAulas = ?", [corpoPresencas["idAula"]])
   await connection.query("INSERT INTO alunospresentes (idalunos,aulas_idAulas,carga) VALUES ? ",[listaPresentesQuery]);
  return "ok";
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
  inserirHorario,
  deletarHorarios,
  parearDispositivo,
  updateQRAula,
  removerAluno,
  verificarAlunosAula,
  inserirAlunosPresentes,
  verHorariosMateria
}