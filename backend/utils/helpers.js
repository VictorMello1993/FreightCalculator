const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_EXPIRES_IN = 60 //1min
const SECRET_KEY = '0ff66555f7028c5da372fbf8628939b1'

exports.generateHash = async (password) => {
  const passEncode = await bcrypt.genSaltSync(10, 'a')
  return bcrypt.hashSync(password, passEncode)
}

exports.generateToken = (payload) => {
  return {
    type: 'Bearer',
    token: jwt.sign({...payload}, SECRET_KEY, {
      expiresIn: parseInt(JWT_EXPIRES_IN)
    })
  }
}

exports.verifyToken = (token) => 
  jwt.verify(token, SECRET_KEY, (err, data) => {        
    if(err){            
      return false
    }
    return true
  })