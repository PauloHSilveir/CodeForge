require('./src/database');
const express = require('express');
const routes = require('./src/routes/index');
const app = express();
const cors = require('cors');
const port = 1313;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});