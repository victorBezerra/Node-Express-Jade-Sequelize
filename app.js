const express = require('express');
const app = express();
const Sequelize = require('sequelize');

app.set('view engine', 'pug');
// criando a conexão com o mysql
var sequelize = new Sequelize('mysql://root@localhost:3306/expressjm');

// Criando tabela com sequelize
var User = sequelize.define('usuarios',{
  nome: {
    type: Sequelize.STRING
  },
  sobrenome: {
    type: Sequelize.STRING
  }
});

// Criando usuário
// User.sync()
//   .then( () => {
//     return User.create({
//       nome: 'Doido',
//       sobrenome: 'Bezerra'
//     });
//   });

// Select com um único usuário através do id
app.get('/users/:id', (req,res)=>{
  // User.findOne({
  //   where:{
  //     id: req.params.id
  //   }
  // })
  //OU função BYID()
  User.findById(req.params.id)
    .then((result)=>{
      res.render('user',{
        data: result,
        message: 'Usuário '+result.nome
      });
    })
    .catch((err)=>{
      console.log("ERROR: ", err);
    });
});

// Select com todos os dados da tabela
app.get('/users',(req, res)=>{
  User.findAll()
    .then((result)=>{
      res.render('users',{
        message: 'Lista de usuários',
        data: result
      });
    })
    .catch((err)=>{
      console.log("Error: ", err);
    });
});

app.get('/', (req, res)=>{
  res.render('index',{
    message: "Hello!!",
    count: 6
  });
});

app.listen(3000, ()=>{
  console.log("Server funcionando");
});
