const express = require('express');
const item = require('./src/models/item');
const user = require('./src/models/user');
const database = require('./src/config/database');
const userRouter = require('./src/routes/user');//importa as rotas de usuário
const itemRouter = require('./src/routes/item');//importa as rotas de item
const app = express();
const cors = require('cors');
const port = 1313;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));


app.use(express.json());
app.use('/user', userRouter);
app.use('/item', itemRouter);



//Conexão ao banco de dados e inicializaçãso do servidor
database.db
    .sync({force: false})
    .then((_) =>{
        app.listen(port, () => {
            console.info(`Rodando na porta ${port}...`);
        });
    })
    .catch((e) => {
        console.error(`Erro ao conectar com o banco de dados: ${e} `);
    }); 
 




app.use(express.json());