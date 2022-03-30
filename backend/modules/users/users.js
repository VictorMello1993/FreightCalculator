const database = require('../../db.json')

exports.getUsers = (req, res) => {
  res.json(database.users)
}