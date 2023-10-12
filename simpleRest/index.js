const express = require("express");
const app = express();
const port = 3010;
const db = require('./db');
app.use(express.json());

const flavors = [
    {
        name: "Schokolade"
    },
    {
        name: "Vanille"
    },
    {
        name: "Zitrone"
    },
    ];

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/flavor/:id", async (req, res) => {
    try{
        const id = req.params.id;
        console.log(`id: ${id}`);
        res.send("flavor updated");        
    }
    catch{
        res.status(402).send("Invalid request");
    }
});

app.post('/ersetzeEis/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const neuesEis = req.body.neuesEis;

    if (flavors[index] !== undefined && neuesEis) {
        flavors[index].name = neuesEis;
        res.send("Erfolgreich ersetzt!");
    } else {
        res.status(400).send("Ungültige Anfrage");
    }
});

app.get('/flavors', (req, res) => {
    res.json(flavors);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/}`);
});