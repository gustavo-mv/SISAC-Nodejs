# SISAC (Sistema Acadêmico de Chamadas)
Visto que atualmente durante as aulas acadêmicas convencionais os professores levam cerca de 10-15 minutos para fazer uma chamada de uma turma com por volta de 50 pessoas, o *SISAC* é uma aplicação feita com o intuito de auxiliar professores e alunos em sala de aula utilizando de QRCode para a marcação de presenças. 

## Tecnologias
Node.js /   Flutter   /  MySql  /   Postman  <br>
 <img src="https://skillicons.dev/icons?i=nodejs" /> <img src="https://skillicons.dev/icons?i=flutter" /> <img src="https://skillicons.dev/icons?i=mysql" /> <img src="https://skillicons.dev/icons?i=postman" />

## Abordagem técnica
O projeto segue o Padrão de Arquitetura MVC, que facilita bruscamente correção de erros e reúso de funcionalidades já criadas para determinada rota. Foram utilizados alguns pacotes como 'JWT' para gerar tokens em logins, 'bcrypt' para criptografia de senhas dos usuários, e foram utilizados WebSockets para o recebimento da lista de alunos presentem em tempo real. Todas as funcionalidades foram testadas durante a elaboração dos EndPoints, apesar do sistema ter sido descontinuado por prioridades acadêmicas pessoais. Inclusive esse projeto foi apresentados em disciplinas de Laborátorio de Software, podendo ser melhor visto a prática com vídeos pelo post do Instagram: https://www.instagram.com/p/CtfeiZIJ_xk/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA== 

## Segurança
Alguns professores já faziam QRCodes que levavam a links de formulários para alunos marcarem a presença, porém, por vezes algum aluno pode encaminhar o QR Code para grupos de amigos para marcarem. O *SISAC* conta com um refresh de QR Code, sendo necessário o aluno estar presente na sala de aula para poder marcar presença via QR.
Entretanto a opção de marcar a chamada manualmente seria disponível para o professor, assim como remover qualquer aluno que não esteja presente e que marcou a presença tentando burlar a chamada.
## ScreenShots

<div align="center">
<img src="https://github.com/gustavo-mv/SISAC-Nodejs/assets/47462562/9aae17bf-c4bd-4a23-9862-66db256b23d0">
<img src="https://github.com/gustavo-mv/SISAC-Nodejs/assets/47462562/0dfbdbfa-459c-4f57-9d45-f0927dd854a5">
</div>

