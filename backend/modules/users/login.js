const database = require('../../db.json')
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/helpers');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = database.users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' })
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ message: 'Usuário ou senha inválidos' })
  }    
  
  const token = generateToken(user)

  return res.json({ token })
}