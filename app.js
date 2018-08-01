const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const user = require('./models/user')
const books =  require('./routes/books');


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({entended: false}));
app.use(bodyParser.json());
app.use(methodOverride((req,res)=>{
  if(req.body && req.body=='object' && '_method' in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// criando a conexão com o mysql
// var sequelize = new Sequelize('mysql://root@localhost:3306/expressjm');

// // Criando tabela com sequelize
// var User = sequelize.define('usuarios',{
//   nome: {
//     type: Sequelize.STRING
//   },
//   sobrenome: {
//     type: Sequelize.STRING
//   }
// });

// Criando usuário
// User.sync()
//   .then( () => {
//     return User.create({
//       nome: 'Doido',
//       sobrenome: 'Bezerra'
//     });
//   });

// Adicionando usuário na tabela
app.get('/users/create', (req, res)=>{
  res.render('newUsers',{
    message: 'Criando um usuário'
  });
});

app.post('/users/create',(req,res)=>{
  user.create(req.body)
    .then(()=>{
      res.render('newUsers',{
        message: 'Criando um usuário'
      });
    })
    .catch((err)=>{
      console.log("ERRO: ", err);
    })
});

// Select com todos os dados da tabela
app.get('/users',(req, res)=>{
  user.findAll()
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
  user.findById(req.params.id)
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

//Uma forma de deletar
app.post('/users/:id', (req,res)=>{
  user.destroy({
    where:{
      id: req.params.id
    }
  })
    .then(()=>{
      console.log("DELETANDO ID: ",req.params.id);
      res.redirect('/users');
    })
    .catch((err)=>{
      console.log("ERROR: ", err);
    });
});

//Outra forma usando app.delete() do expressj
app.delete('/users/:id', (req,res)=>{
  user.destroy({
    where:{
      id: req.params.id
    }
  })
    .then(()=>{
      res.redirect('/users');
    })
    .catch((err)=>{
      console.log("ERROR: ", err);
    });
});

//update
app.get('/users/edit/:id', (req,res)=>{
  user.findById(req.params.id)
    .then((result)=>{
      res.render('edit_users',{
        message: 'Editando usuário',
        data: result
      })
    })
    .catch((err)=>{
      console.log("ERROR: ", err);
    });
});

app.post('/users/edit/:id',(req,res)=>{
  user.update(req.body,{
    where:{
      id: req.params.id
    }
  })
  .then((result)=>{
    res.redirect('/users');
  })
  .catch((err)=>{
    console.log("ERRO: ", err);
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
