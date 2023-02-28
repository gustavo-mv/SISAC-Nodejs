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

cron.schedule('*/10 * * * * 1-5', async () => {

const data = new Date;
const diaSemana = data.getDay();
const h = data.getHours();
const m = data.getMinutes();
const horarioAtual = h + ":" + m;
const sqlBuscar = "SELECT * FROM `horarios` WHERE `dia` = ? && `hora_inicio` <= ? && `hora_fim` >= ?" 
const sqlFechar = "UPDATE FROM `horarios` SET `atual` = 0 WHERE `dia` = ? && `hora_inicio` < ? && `hora_fim` < ?" 
const aulasAtuais = await connection.execute(sqlBuscar,[diaSemana,horarioAtual,horarioAtual]);
await connection.execute(sqlFechar,[diaSemana,horarioAtual,horarioAtual])

for(let i = 0; i < aulasAtuais[0].length; i++){
  if(aulasAtuais[0][i].atual == "0"){
  let idHorario = aulasAtuais[0][i].idhorario;
  const sql = "UPDATE `horarios` SET `atual` = 1 WHERE idhorario = ?" 
  await connection.execute(sql,[idHorario]);
}
}


console.log("Show");


})