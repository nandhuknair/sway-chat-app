const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const connectDB  = require('./config/connectDB')
const {app, server}  = require('./socket/index')
// const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],  // Explicitly allow 'Content-Type' and 'Authorization'
}));

app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(req,res)=> {
    res.json({
        message:"Server running at " + PORT
    })  
})

app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=> {
        console.log(`Server running at the port ${PORT}`)
    })
})

