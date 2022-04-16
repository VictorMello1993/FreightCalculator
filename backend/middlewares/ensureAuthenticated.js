const { verifyToken } = require('../utils/helpers')

exports.ensureAuthenticated = async(req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json('Usuário não está autorizado')    
  }

  const parts = authHeader?.split(' ')
  if (parts?.length !== 2) {
    return res.status(401).json('Tipo de autorização inválida')    
  }

  const [schema, token] = parts
  if (schema?.toLowerCase() !== 'bearer') {
    return res.status(401).json('Token mal formatado')
  }
  
  if (!verifyToken(token)) {
    return res.status(401).json('Token inválido')    
  }

  next()
}