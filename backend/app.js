const express = require('express')
const cors = require('cors')
const { ensureAuthenticated } = require('./middlewares/ensureAuthenticated')
const { calcularPrecoFretePrazo } = require('./modules/freight/freight')
const { getUsers } = require('./modules/users/users')
const { login } = require('./modules/users/login')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/login', login)
app.get('/users', ensureAuthenticated, getUsers)
app.post('/', calcularPrecoFretePrazo)

module.exports = app