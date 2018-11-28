const User = require('../models/User')
/* const redis = require('redis')
const client = redis.createClient() */
class UserController {
  async index (req, res) {
    /* return client.get('users', async (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro interno' })
      }
      if (result) {
        return res.json(result)
      } else {
        const users = await User.find()
        client.setex('users', 3600, JSON.stringify({ users: users }))
        return res.json({ users })
      }
    }) */
    const users = await User.find()
    // client.setex('users', 3600, JSON.stringify({ users: users }))
    return res.json({ users })
  }
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ erro: 'User already exist' })
    }

    const user = await User.create(req.body)

    /* client.hset('users', 'users', JSON.stringify(user)) */
    return res.json(user)
  }
}
module.exports = new UserController()
