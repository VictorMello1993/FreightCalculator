const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { generateHash, generateToken, verifyToken } = require('./utils/helpers')
const database = require('./db.json')
const { calcularPrecoPrazo } = require('correios-brasil')

const port = 3002
const app = express()

app.use(express.json())
app.use(cors())

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = database.users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' })
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Usuário ou senha inválidos' })
  }

  //Ocultando a propriedade password, pois essa informação não pode ser exposta no token
  delete user.password

  const token = generateToken(user)

  return res.json({ token })
})

app.get('/users', (req, res) => {
  const authHeader = req.headers.authorization

  // Regras para validação do token (OBS: isso deve ser feito numa função middleware)
  //1) Verificar se no header da requisição existe uma autorização preenchida 
  if (!authHeader) {
    return res.status(401).json('No token provided')
  }

  //2) Verificar se existe Bearer Token (string que possui 2 partes: ex: "Bearer fasdfgsgfasadfgsfaggfs")
  const parts = authHeader?.split(' ')
  if (parts?.length !== 2) {
    res.status(401).json('Token error')
  }

  //3)  Verificar se o token está formatado (se for Bearer Token)
  const [schema, token] = parts
  if (schema?.toLowerCase() !== 'bearer') {
    res.status(401).json('Token mal formatada')
  }

  //Se passar nas 3 etapas acima, validar se de fato o token é válido
  if (!verifyToken(token)) {
    res.status(401).json('Token inválido')
  }

  res.json([
    {
      id: 1,
      name: "Liniker",
    },
    {
      id: 2,
      name: "Elberth",
    },
  ]);
})

//Endpoint responsável por cálculo do frete e prazo utilizando a API dos Correios utilizando a lib correios-brasil
app.post('/', async (req, res) => {
  const {...values} = req.body
  const result = await calcularPrecoPrazo(values)
  
  return res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})