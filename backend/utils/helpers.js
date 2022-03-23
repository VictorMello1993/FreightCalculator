const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const JWT_EXPIRES_IN = 60 //1min
const {SECRET_KEY: secret} = process.env;

exports.generateHash = async (password) => {
  const passEncode = await bcrypt.genSaltSync(10, 'a')
  return bcrypt.hashSync(password, passEncode)
}

exports.generateToken = (payload) => {
  return {
    type: 'Bearer',
    token: jwt.sign({...payload}, secret, {
      expiresIn: parseInt(JWT_EXPIRES_IN)
    })
  }
}

exports.verifyToken = (token) => 
  jwt.verify(token, secret, (err, data) => {        
    if(err){            
      return false
    }
    return true
  })