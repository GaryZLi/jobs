const fs = require('fs');
const cors = require('cors');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;
let sIO;

app.use(cors());
app.use(express.json());

io.on("connection", socket => {
    console.log("socket connected");
    sIO = socket;

    const file = fs.readFileSync('records.txt', { encoding: 'utf8', flag: 'r' });

    for (let line of file.split('\n')) {
        sIO.emit('update', line);
    }
});

const checkDupe = data => {
    const file = fs.readFileSync('records.txt', {encoding:'utf8', flag:'r'});

    for (let line of file.split('\n')) {
        if (line === data) {
            return true;
        }
    }
    
    return false;
};

app.post('/', (req, res) => {
    const data = req.body.data.map(item => (item.trim(' '))).join(';');
    console.log('hehe')
    if (checkDupe(data)) {
        return res.send({
            dupe: true,
        })
    }
    
    fs.appendFile('records.txt', data + '\n', () => {});

    try {
        sIO.emit('update', data);
    }
    catch {
        console.log('cannot emit data');
    }

    res.status(200).send({
        dupe: false
    });
})

app.post('/checkData', (req, res) => {
    const data = req.body.data.map(item => (item.trim(' ')));
    
    if (checkDupe(data.join(';'))) {
        return res.send({
            dupe: true,
        })
    }

    return res.send({
        dupe: false,
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`));