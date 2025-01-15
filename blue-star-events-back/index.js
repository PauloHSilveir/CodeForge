require('./src/database'); // ADICIONAR esta linha no início
const express = require('express');
//const database = require('./src/config/database');
const routes = require('./src/routes/index');
const app = express();
const cors = require('cors');
const port = 1313;
//require('./database');

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));


app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});