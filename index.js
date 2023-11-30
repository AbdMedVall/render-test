const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(morgan('tiny'));
morgan.token('host', function(req, res) {
    return req.hostname;
    });
    app.use(morgan(' :method :host :status :res[content-length] - :response-time ms :res[body] '))
    

 let notes =[
    { 
      "id": 1,
      "content": "Arto Hellas lgdnngjd", 
      "important": true
    },
    { 
      "id": 2,
      "content": "Arto  polib gfztk lgdnngjd", 
      "important": false
    },
    { 
      "id": 3,
      "content": "river mopgds nbdshlll", 
      "important": true
    },
    { 
      "id": 4,
      "content": "ni lpmdsg las bfsjk", 
      "important": false
    }
]

app.get("/api/notes", (request, response) =>{
    response.json(notes)
})

app.get("/info", (request, response) =>{
    const dateRequest = Date()
    response.send(`<div>Phonebook has info for ${notes.length} people </div>
                   </br>
                   <div>${dateRequest}</div>
    `)
})

app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note) {
        response.json(note)
    }
    else {
        response.status(404).end('4O4, note not found')
    }
    
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    console.log(notes)
    notes = notes.filter(note => note.id !== id)  
    response.json(notes)
})


function generateId(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
app.post("/api/notes", (request, response) => {
 
   console.log(request.body)
    let note = request.body
    if(note.name && note.number){
        nt = notes.find(not => not.name === note.name)
        if(nt){
            return response.status(400).json({error: "name must be unique"})
        }
        note.id = generateId(1, 10000)
        notes=notes.concat(note)
        response.json(note)
    }
    else {
        response.status(400).json({error: "name and number are obligatoire"})
    }
   

})

const PORT = 3001
app.listen(PORT, () => console.log("Server is running on port", PORT))