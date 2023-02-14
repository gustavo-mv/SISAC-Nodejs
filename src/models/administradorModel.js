const connection = require("./connection");
const bcrypt = require('bcrypt')

const criarProfessor = async (nome,usuario,senha) => {
    if (nome == null || usuario == null || senha == null ) {
    return "O alguma informação não está presente."
}else{
    const hash = await bcrypt.hash(senha,10);
    await connection.execute(`INSERT INTO professores (nome, usuario, senha) VALUES ( ?,?,?)`,[nome,usuario,hash])
    return "Cadastrado com sucesso."
}

};

const verPolos = async () => {
    const [result] =  await connection.execute(
       `SELECT * FROM polos`
       );
      return result;
  };

const deletarProfessor = async (idProf) => {
    if (idProf != null) {
       await connection.execute(
       `DELETE FROM professores WHERE idprofessor = ${idProf}`
      );
      return `O professor com o ID ${idProf} foi deletado com sucesso.`;
    }
  };

  const criarPolo = async (nomePolo, cidadePolo) => {
    if (nomePolo != null && cidadePolo != null) {
       await connection.execute(
       `INSERT INTO polos (nome, cidade) VALUES (?,?)`,[nomePolo,cidadePolo]
      );
      return `O polo ${nomePolo} foi adicionado com sucesso.`;
    }else{
        return "Alguns dados estão vazios"
    }
  };

  const editarPolo = async (nomePolo, cidadePolo, idPolo) => {
    if (nomePolo != null && cidadePolo != null && idPolo != null) {
       await connection.execute(
        `UPDATE polos SET nome = ?, cidade = ? WHERE idpolo = ?`,[nomePolo, cidadePolo, idPolo]);
      return `O polo ${nomePolo} com o ID ${idPolo} foi atualizado com sucesso.`;
       }else{
        return "Algo deu errado"
      }
  };

  const deletarPolo = async (idPolo) => {
    if (idPolo != null) {
       await connection.execute(
       `DELETE FROM polos WHERE idpolo = ` + idPolo);
      return `O polo foi excluído com sucesso.`;
    }else{
        return "Alguns dados estão vazios"
    }
  };

module.exports = {
    criarProfessor,
    deletarProfessor,
    criarPolo,
    deletarPolo,
    editarPolo,
    verPolos
};

// `INSERT INTO professores (nome, usuario, senha) VALUES (${nome},${usuario},${senha})`);