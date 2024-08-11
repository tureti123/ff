import dotenv from 'dotenv'
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
import path from 'path'
import { readdir } from 'fs';
import { promisify } from 'util';
const { MongoClient } = mongodb;

dotenv.config()
let count=0
let user = {};

let identityup=['imposteur','serpentin','superhero','doubleface','roméo','droide']

global.T1 = []
global.T0 = []

 

let mace = '';
let lunch = false;


// Obtenir le répertoire du fichier courant
const __dirname = dirname(fileURLToPath(import.meta.url));

// Créer une instance de l'application Express
const app = express();

// Créer un serveur HTTP basé sur l'application Express
const server = createServer(app);

// Initialiser Socket.io pour le serveur HTTP
const io = new Server(server);

// Servir les fichiers statiques de l'application (y compris index.html)
app.use(express.static(path.join(__dirname, 'version2')));
//app.use('/ordre', express.static(path.join(__dirname, 'version2/ordre')));

// Définir une route pour servir la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/fin.html");  
});

let collec = '';
const url = 'mongodb+srv://tureti:db7dm8mf@cluster0.tvkiecu.mongodb.net/votreBaseDeDonnées?retryWrites=true&w=majority';

async function connectWithMongoClient() {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db('votreBaseDeDonnées');
    collec = database.collection('user');
}

io.on('connection', (socket) => {
    connectWithMongoClient();
    socket.point=0
    socket.imparti=0
    socket.IDroide=''

    socket.on('disconnect', () => {});

    socket.on("disconnecting", () => {
        if (collec !== null && collec !== undefined) {
            disconnecting(socket);
        }
    });
})
const port =process.env.PORT || 9000