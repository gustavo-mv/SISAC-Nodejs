const app = require("./app");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const connection = require("./models/connection");
const servidorController = require("./controllers/servidorController");


const PORT = process.env.PORT || 3333;

app.listen(PORT,() =>
  console.log(`O servidor está sendo executado em ${PORT}`)
);

cron.schedule('*/5 * * * * 1-5', async () => {

const data = new Date;
const diaSemana = data.getDay();
const h = data.getHours();
const m = data.getMinutes();
const horarioAtual = h + ":" + m;
const horarioAtualInteiro = parseInt(h.toString() + m.toString());
const sqlBuscar = "SELECT * FROM `horarios` WHERE `dia` = ? && `hora_inicio` <= ? && `hora_fim` >= ?" 
const aulasAtuais = await connection.execute(sqlBuscar,[diaSemana,horarioAtual,horarioAtual]);
const aulasAbertas = [];
function converteInt(str){
  let resultado = (str.split(0,0)).toString()
 // const retorno = parseInt(resultado);
  return resultado;
}
console.log(converteInt("19:00"));
 for(let i = 0; i < aulasAtuais[0].length; i++){
  if(aulasAtuais[0][i].atual == "0"){
  console.log(aulasAtuais[0][i]);
  const idHorario = aulasAtuais[0][i].idhorario;
  const sql = "UPDATE `horarios` SET `atual` = 1 WHERE idhorario = ?" 
  await connection.execute(sql,[idHorario]);
  aulasAbertas.push(aulasAtuais[0][i]);
  for(let i = 0; i < aulasAbertas[0].length; i++){
  if(aulasAtuais[0][i].hora_fim > horarioAtual.toString()){
    return "Olá"
  }

  }}  

}})