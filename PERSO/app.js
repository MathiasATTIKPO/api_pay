const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const payementRoute = require('./routes/payementRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 



dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api', payementRoute);

app.use((req, res, next) => {
    req.io = io;
    next();
  });
  

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Configurer Socket.IO
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Documentation Swagger disponible à http://localhost:${PORT}/api-docs`);

});
