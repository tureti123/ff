import express from "express"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongodb from 'mongodb';
import path from 'path'
const { MongoClient } = mongodb;
const app=express()
import dotenv from 'dotenv'
dotenv.config()
const PORT=process.env.PORT || 9000
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname)));

app.use('/mordre', express.static(path.join(__dirname, '/mordre')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/fin.html");  
})

const url = 'mongodb+srv://tureti:db7dm8mf@cluster0.tvkiecu.mongodb.net/votreBaseDeDonnées?retryWrites=true&w=majority';

async function connectWithMongoClient() {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db('votreBaseDeDonnées');
    collec = database.collection('user');
}
app.listen(PORT,()=>{
    console.log('running')
})
io.on('connection', (socket) => {
    connectWithMongoClient()
})