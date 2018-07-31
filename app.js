const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({entended: false}));
app.use(bodyParser.json());

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

// Adicionando usuário na tabela
app.get('/users/create', (req, res)=>{
  res.render('newUsers',{
    message: 'Criando um usuário'
  });
});

app.post('/users/create',(req,res)=>{
  User.create(req.body)
    .then(()=>{
      res.render('newUsers',{
        message: 'Criando um usuário'
      });
    })
    .catch((err)=>{
      console.log("ERRO: ", err);
    })
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
