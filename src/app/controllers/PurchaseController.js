const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchases = await Purchase.find({})

    return res.json({ purchases })
  }

  async show (req, res) {
    const { id } = req.params

    const purchase = await Purchase.findById(id)

    return res.json(purchase)
  }

  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')

    if (purchaseAd.purchaseBy) { return res.status(400).json({ error: 'Ad already purchased' }) }

    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      ad_id: purchaseAd,
      user_id: user,
      content
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json({ purchase })
  }

  async update (req, res) {
    const { id } = req.params

    const { ad_id } = await Purchase.findById(id)

    await Ad.findByIdAndUpdate(ad_id, {
      purchaseBy: id
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
