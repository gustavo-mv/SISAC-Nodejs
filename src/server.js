const express = require("express");
const app = express();
const router = require("./router");
app.use(router);
const http = require('http').Server(app);
const io = require('socket.io')(http);
require("dotenv").config();
const cron = require("node-cron");
const connection = require("./models/connection");
const servidorController = require("./controllers/servidorController");


const PORT = process.env.PORT || 3333;

io.on('connection', (socket) => {

  socket.on('loginprof',async ()=>{
    await connection.query("INSERT INTO `loginprof` (`codigoLogin`) VALUES (?)",[socket.id])
    io.emit("valor",socket.id)
  })


  socket.on('disconnect',()=>{
    connection.query("DELETE FROM `loginprof` WHERE `codigoLogin` = ?",[socket.id]);
  })
});


http.listen(PORT,() =>
  console.log(`O servidor está sendo executado em ${PORT}`)
);

setTimeout(async function(){
  await connection.execute("UPDATE `horarios` SET `atual` = 0 WHERE `atual` = 1 ")
}, 1000) 


const aulasAbertas = [];
cron.schedule('*/5 * * * * *', async () => {
const data = new Date;
const diaSemana = data.getDay();

const horarioAtualCompleto = data.toLocaleTimeString("pt-BR", {
  timeStyle: "medium",      
  hour12: false,            
  numberingSystem: "latn"   
});

const sqlBuscar = "SELECT * FROM `horarios` WHERE `dia` = ? && `hora_inicio` <= ? && `hora_fim` >= ?" 
const aulasAtuais = await connection.execute(sqlBuscar,[diaSemana,horarioAtualCompleto,horarioAtualCompleto]);
for(let i = 0; i < aulasAtuais[0].length; i++){
if(aulasAtuais[0][i].atual == "0"){
  console.log(aulasAtuais[0][i]);
  const idHorario = aulasAtuais[0][i].idhorario;
  const sql = "UPDATE `horarios` SET `atual` = 1 WHERE idhorario = ?" 
  await connection.execute(sql,[idHorario]);
  aulasAtuais[0][i].atual = "1";
  aulasAbertas.push(aulasAtuais[0][i]);
  }}
  
for(let i = 0; i < aulasAbertas.length; i++){
  const horaReal = (horarioAtualCompleto);
  const horaArray = (aulasAbertas[i].hora_fim);
  const idHorarioLista = (aulasAbertas[i].idhorario)
if(horaArray < horaReal){
   const sqlFechar = "UPDATE `horarios` SET `atual` = 0 WHERE idhorario = ?" 
   await connection.execute(sqlFechar,[idHorarioLista])
   aulasAbertas.splice(aulasAbertas[i],1)
   }}
})
