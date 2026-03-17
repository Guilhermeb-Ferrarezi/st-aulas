import express from 'express'
import login from './routes/auth'
import cors from 'cors'
import {db} from './db'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=> {res.send("Funcionando")})

// Db connection

db()

async function startServer() {
  app.use("/api/auth", await login())
  
  app.listen(PORT, () => {
    console.log("API: http://localhost:3000/")
  });
}

startServer();
