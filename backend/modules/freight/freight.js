const { calcularPrecoPrazo } = require('correios-brasil')

exports.calcularPrecoFretePrazo = async (req, res) => {
  const {...values} = req.body
  const result = await calcularPrecoPrazo(values)
  
  return res.json(result)
}