const express = require('express');
const app     = express();
const path    = require('path');

const flash   = require('connect-flash');
const connection = require('./connection');
const sessionOptions = require('./sessionOptions');

const helmet = require('helmet');
const csrf   = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const cors = require('cors');

//configurações do BD
connection.authenticate()
  .then(() => {
    // Adiciona a sincronização do banco de dados após a autenticação
    return connection.sync({ force: false });
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch((e) => {
    console.error('Erro ao conectar ao banco de dados:', e);
  });

//configurações para fazer POST dentro da aplicação
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurações da session
app.use(sessionOptions);
app.use(flash());

//configurações das views com caminho absoluto
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const routes = require('./routes');

app.use(helmet());
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"]}));

app.use(csrf());
//nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(cors());

app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    })
});

